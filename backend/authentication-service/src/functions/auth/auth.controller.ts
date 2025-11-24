import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from "../../libs/jwt/jwt-auth.guard";
import { StravaAuthGuard } from '../../libs/strava/strava-auth.guard';
import { AccountProvider } from 'src/libs/account-provider.enum';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.login(body.email, body.password);
  };

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return await this.authService.register(body.email, body.password);
  }


  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    const payload = await this.authService.refreshToken(body.refreshToken);
    return await this.authService.getTokens(payload.sub, payload.email);
  };

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async me(@Req() req: {
    user: { email: string; password: string }
  }) {
    return req.user;
  };

  @Get('strava')
  @UseGuards(StravaAuthGuard)
  async stravaLogin() {
    return;
  }

  // Callback URL
  @Get('strava/callback')
  @UseGuards(StravaAuthGuard)
  async stravaCallback(@Req() req) {
    const strava = req.user;

    const email = `${strava.athlete.id}@strava.local`;

    const tokens = await this.authService.socialLogin(
      email,
      strava.athlete,
      AccountProvider.Strava,
      strava.accessToken,
      strava.refreshToken
    );

    return tokens;
  }
}
