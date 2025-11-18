import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import axios from 'axios';

@Injectable()
export class StravaStrategy extends PassportStrategy(Strategy, 'strava') {
  constructor() {
    super({
      authorizationURL: process.env.STRAVA_BASE_URL + '/oauth/authorize',
      tokenURL: process.env.STRAVA_BASE_URL + '/oauth/token',
      clientID: process.env.STRAVA_CLIENT_ID ?? 'id',
      clientSecret: process.env.STRAVA_CLIENT_SECRET ?? 'secret',
      callbackURL: process.env.STRAVA_REDIRECT_URI,
      scope: 'read_all,activity:read_all',
    });
  }

  async validate(accessToken: string, refreshToken: string): Promise<any> {
    const { data: athlete } = await axios.get(
      process.env.STRAVA_API_BASE_URL + '/athlete',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return {
      accessToken,
      refreshToken,
      athlete,
    };
  }
}
