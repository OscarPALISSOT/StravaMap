import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../libs/guards/jwt/jwt-auth.guard';
import { AccountProvider } from '../../libs/account-provider.enum';
import { ProviderUser } from '../../libs/types/provider-user';
import { DynamicAuthGuard } from '../../libs/guards/dynamic/dynamic-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return await this.authService.register(body.email, body.password);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const payload = await this.authService.refreshToken(body.refreshToken);
    return await this.authService.getTokens(payload.sub, payload.email);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  me(@Req() req: { user: { email: string; password: string } }) {
    return req.user;
  }

  /** Redirect to the right guard depending on the provider */
  @Get(':provider')
  @UseGuards(DynamicAuthGuard)
  async socialRedirect() {}

  @Get(':provider/callback')
  @UseGuards(DynamicAuthGuard)
  async socialCallback(
    @Req() req: { user: ProviderUser },
    @Param('provider') provider: AccountProvider,
  ) {
    const payload = req.user;
    
    const result = await this.authService.oauthLogin({
      provider,
      providerId: payload.providerId,
      profile: payload.profile,
      tokens: {
        accessToken: payload.accessToken,
        refreshToken: payload.refreshToken,
        expiresAt: payload.expiresAt,
      },
    });

    return result;
  }
}
