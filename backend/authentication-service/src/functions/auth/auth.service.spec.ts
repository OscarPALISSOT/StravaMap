import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AccountProvider } from '../../libs/account-provider.enum';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            refreshToken: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
            account: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('jwt-token'),
            verifyAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get<PrismaService>(PrismaService);
    jwt = module.get<JwtService>(JwtService);

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
  });

  describe('email Login', () => {
    it('should login successfully with correct credentials', async () => {
      //Given
      prisma.user.findUnique = jest.fn().mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: 'hashed-password',
      });

      //When
      const res = await service.login('test@test.com', 'password');

      //Then
      expect(res).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
      });
      const createRefreshToken = prisma.refreshToken.create;
      expect(createRefreshToken).toHaveBeenCalled();
    });

    it('should throw if user not found', async () => {
      //Given
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      //When
      const login = service.login('no@test.com', 'pwd');

      await expect(login).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password invalid', async () => {
      //Given
      prisma.user.findUnique = jest.fn().mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: 'hash',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      //When
      const login = service.login('test@test.com', 'wrong');

      //Then
      await expect(login).rejects.toThrow(UnauthorizedException);
    });

    it('should register and create a new user', async () => {
      //Given
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest.fn().mockResolvedValue({
        id: '1',
        email: 'test@test.com',
        password: 'hashed-password',
      });

      //When
      const result = await service.register('test@test.com', 'pwd');

      //Then
      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
      });
      const createUser = prisma.user.create;
      expect(createUser).toHaveBeenCalled();
    });

    it('should throw if email already registered', async () => {
      //Given
      prisma.user.findUnique = jest.fn().mockResolvedValue({ id: '1' });

      //When
      const register = service.register('test@test.com', 'pwd');

      await expect(register).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('tokens', () => {
    it('should generate tokens', async () => {
      //Given
      const userId = '1';
      const email = 'email@test.com';

      //When
      const res = await service.getTokens(userId, email);

      //Then
      expect(res.accessToken).toBe('jwt-token');
      expect(res.refreshToken).toBe('jwt-token');
      expect(jwt.signAsync).toHaveBeenCalledTimes(2);
    });

    it('should refresh token if valid', async () => {
      //Given
      prisma.refreshToken.findUnique = jest.fn().mockResolvedValue({
        token: 'refresh',
        expiresAt: new Date(Date.now() + 10000),
      });

      jwt.verifyAsync = jest.fn().mockResolvedValue({
        sub: '1',
        email: 'test@test.com',
      });

      //When
      const payload = await service.refreshToken('refresh');

      //Then
      expect(payload).toEqual({
        sub: '1',
        email: 'test@test.com',
      });
    });

    it('should reject expired refresh token', async () => {
      //Given
      prisma.refreshToken.findUnique = jest.fn().mockResolvedValue({
        token: 'refresh',
        expiresAt: new Date(Date.now() - 10000),
      });

      //When
      const refresh = service.refreshToken('refresh');

      //Then
      await expect(refresh).rejects.toThrow(UnauthorizedException);
    });

    it('should reject missing token', async () => {
      //Given
      prisma.refreshToken.findUnique = jest.fn().mockResolvedValue(null);

      //When
      const refresh = service.refreshToken('nope');

      //Then
      await expect(refresh).rejects.toThrow(UnauthorizedException);
    });

    it('should reject invalid JWT in refresh', async () => {
      //Given
      prisma.refreshToken.findUnique = jest.fn().mockResolvedValue({
        token: 'refresh',
        expiresAt: new Date(Date.now() + 10000),
      });
      jwt.verifyAsync = jest.fn().mockRejectedValue(new Error());

      //When
      const refresh = service.refreshToken('refresh');

      //Then
      await expect(refresh).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('oauthLogin', () => {
    beforeEach(() => {
      service.issueTokensForUser = jest.fn().mockResolvedValue({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
      });
    });

    const baseInput = {
      provider: AccountProvider.Strava,
      providerId: 'STRAVA123',
      profile: { email: 'john@example.com', name: 'John' },
      tokens: {
        accessToken: 'prov-access',
        refreshToken: 'prov-refresh',
        expiresAt: 999999,
      },
    };

    it('should create user + account if no existing provider record', async () => {
      prisma.account.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      prisma.user.create = jest.fn().mockResolvedValue({
        id: 'USER1',
        email: 'john@example.com',
      });

      prisma.account.create = jest.fn().mockResolvedValue({
        id: 'ACC1',
        provider: 'strava',
        providerId: 'STRAVA123',
        userId: 'USER1',
        user: {
          id: 'USER1',
          email: 'john@example.com',
        },
        profile: baseInput.profile,
      });

      const result = await service.oauthLogin(baseInput);

      expect(prisma.account.findUnique).toHaveBeenCalledWith({
        where: {
          provider_providerId: { provider: 'strava', providerId: 'STRAVA123' },
        },
        include: { user: true },
      });

      expect(prisma.user.create).toHaveBeenCalledTimes(1);
      expect(prisma.account.create).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
        provider: 'strava',
        providerId: 'STRAVA123',
        profile: baseInput.profile,
      });
    });

    it('should update account when provider exists', async () => {
      prisma.account.findUnique = jest.fn().mockResolvedValue({
        id: 'ACC_EXIST',
        provider: 'strava',
        providerId: 'STRAVA123',
        user: { id: 'USERX', email: 'john@example.com' },
        accessToken: 'old-access',
        refreshToken: 'old-refresh',
        expiresAt: new Date(111111),
        profile: baseInput.profile,
      });

      const result = await service.oauthLogin(baseInput);

      expect(prisma.account.update).toHaveBeenCalledWith({
        where: { id: 'ACC_EXIST' },
        data: {
          accessToken: 'prov-access',
          refreshToken: 'prov-refresh',
          expiresAt: new Date(999999),
          profile: baseInput.profile,
        },
      });

      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
        provider: 'strava',
        providerId: 'STRAVA123',
        profile: baseInput.profile,
      });
    });

    it('should create user with fallback email when no email is provided', async () => {
      const input = {
        ...baseInput,
        profile: {}, //no email
      };

      prisma.account.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);

      prisma.user.create = jest.fn().mockResolvedValue({
        id: 'USER_NO_EMAIL',
        email: 'strava-STRAVA123@social.local',
      });

      prisma.account.create = jest.fn().mockResolvedValue({
        id: 'ACC_NEW',
        provider: 'strava',
        providerId: 'STRAVA123',
        userId: 'USER_NO_EMAIL',
        user: {
          id: 'USER_NO_EMAIL',
          email: 'strava-STRAVA123@social.local',
        },
        profile: {},
      });

      const result = await service.oauthLogin(input);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'strava-STRAVA123@social.local',
          password: null,
        },
      });

      expect(result).toEqual({
        accessToken: 'jwt-token',
        refreshToken: 'jwt-token',
        provider: 'strava',
        providerId: 'STRAVA123',
        profile: {},
      });
    });
  });
});
