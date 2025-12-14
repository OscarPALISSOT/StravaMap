import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import axios from 'axios';
import { Strategy } from 'passport-oauth2';
import { OAuthProfile } from 'src/libs/types/oauth-profile';

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

  userProfile(accessToken: string, done: Function) {
    axios
      .get(process.env.STRAVA_BASE_URL + '/api/v3/athlete', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(res => done(null, res.data))
      .catch(err => done(err));
  }


  async validate(
    accessToken: string,
    refreshToken: string,
    athlete: OAuthProfile,
  ): Promise<{
    providerId: string;
    profile: OAuthProfile;
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
  }> {
    
    const expiresAt = '21600';
    return {
      providerId: (athlete.id as number).toString(),
      profile: athlete,
      accessToken,
      refreshToken,
      expiresAt,
    };
  }
}
