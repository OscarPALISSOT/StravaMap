import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma.service';
import { AccountProvider } from 'src/libs/account-provider.enum';
import { OAuthProfile } from 'src/libs/types/oauth-profile';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (user.password && !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.issueTokensForUser(user.id, user.email);

    return tokens;
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashed = await this.hashPassword(password);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });
    const tokens = await this.issueTokensForUser(user.id, user.email);

    return tokens;
  }

  async getTokens(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: userId, email };
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '3d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return { accessToken, refreshToken };
  }

  async storeRefreshToken(userId: string, token: string) {
    await this.prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      },
    });
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ sub: string; email: string }> {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    try {
      return await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch (err) {
      throw new UnauthorizedException(err, 'Invalid refresh token');
    }
  }

  async issueTokensForUser(userId: string, email: string) {
    const tokens = await this.getTokens(userId, email);
    await this.storeRefreshToken(userId, tokens.refreshToken);
    return tokens;
  }

  /**
   * provider: "strava", "google", ...
   * providerId: string (unique id from provider)
   * profile: raw profile object from provider
   * tokens: { accessToken?, refreshToken?, expiresAt? }
   */
  async oauthLogin({
    provider,
    providerId,
    profile,
    tokens,
  }: {
    provider: AccountProvider;
    providerId: string;
    profile: OAuthProfile;
    tokens?: {
      accessToken?: string;
      refreshToken?: string;
      expiresAt?: number;
    };
  }) {
    let social = await this.prisma.account.findUnique({
      where: { provider_providerId: { provider, providerId } },
      include: { user: true },
    });

    if (!social) {
      const email = profile?.email;
      let user = email
        ? await this.prisma.user.findUnique({ where: { email } })
        : null;

      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: email ?? `${provider}-${providerId}@social.local`,
            password: null,
          },
        });
      }

      social = await this.prisma.account.create({
        data: {
          provider,
          providerId,
          accessToken: tokens?.accessToken,
          refreshToken: tokens?.refreshToken,
          expiresAt: tokens?.expiresAt ? new Date(tokens.expiresAt) : null,
          profile: profile as Prisma.JsonObject,
          userId: user.id,
        },
        include: { user: true },
      });
    } else {
      const expiresAt = tokens?.expiresAt ?? social.expiresAt;
      const expiresAtDate = expiresAt ? new Date(expiresAt) : null;

      await this.prisma.account.update({
        where: { id: social.id },
        data: {
          accessToken: tokens?.accessToken ?? social.accessToken,
          refreshToken: tokens?.refreshToken ?? social.refreshToken,
          expiresAt: expiresAtDate,
          profile: (profile as Prisma.JsonObject) ?? social.profile,
        },
      });
    }

    return {
      ...(await this.issueTokensForUser(social.user.id, social.user.email)),
      provider,
      providerId,
      profile,
    };
  }
}
