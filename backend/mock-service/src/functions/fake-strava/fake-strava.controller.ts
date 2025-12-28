import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { DateTime } from 'luxon';

@Controller('fake-strava')
export class FakeStravaController {
  @Get('oauth/authorize')
  authorize(
    @Query('redirect_uri') redirectUri: string,
    @Query('scope') scope: string,
    @Query('client_id') clientId: string,
    @Query('response_type') responseType: string,
    @Res() res: Response,
  ) {
    if (!redirectUri || !scope || !clientId) {
      throw new BadRequestException('missing parameter');
    }
    if (responseType !== 'code') {
      throw new BadRequestException('response_type must be "code"');
    }

    const fakeCode = 'mock_code_1234';
    const url = `${redirectUri}?code=${fakeCode}&scope=${scope}`;

    return res.redirect(url);
  }

  @Post('oauth/token')
  token(
    @Body()
    body: {
      client_id: string;
      client_secret: string;
      code: string;
      grant_type: string;
    },
    @Res() res: Response,
  ) {
    const { client_id, client_secret, code, grant_type } = body;

    if (!client_id || !client_secret || !code || !grant_type) {
      throw new BadRequestException('missing parameter');
    }
    if (grant_type !== 'authorization_code') {
      throw new BadRequestException('grant_type must be "authorization_code"');
    }
    return res
      .json({
        token_type: 'Bearer',
        expires_at: DateTime.now().plus({ hours: 6 }).toUnixInteger(),
        expires_in: 21600,
        refresh_token: 'f7f3a69f8846fb2c0b1756f66G8650ffd6b976f2',
        access_token: '43844e53bd9f3f7e4c18543b9d899e84a3a79269',
        athlete: {
          id: 116651093,
          username: null,
          resource_state: 2,
          firstname: 'John',
          lastname: 'Doe',
          bio: 'Some bio',
          city: 'Grenoble',
          state: 'Isère',
          country: 'France',
          sex: 'M',
          premium: false,
          summit: false,
          created_at: '2023-04-18T13:34:42Z',
          updated_at: '2025-11-23T23:12:06Z',
          badge_type_id: 0,
          weight: 92.0,
          profile_medium: 'https://picsum.photos/60',
          profile: 'https://picsum.photos/124',
          friend: null,
          follower: null,
        },
      })
      .status(200);
  }

  @Get('/api/v3/athlete')
  athlete(@Headers('Authorization') token: string, @Res() res: Response) {
    if (!token) {
      throw new BadRequestException('missing token');
    }
    if (token.split(' ')[0] !== 'Bearer') {
      throw new BadRequestException('token must be a bearer');
    }
    return res
      .json({
        id: 116651093,
        username: null,
        resource_state: 2,
        firstname: 'John',
        lastname: 'Doe',
        bio: 'Some bio',
        city: 'Grenoble',
        state: 'Isère',
        country: 'France',
        sex: 'M',
        premium: false,
        summit: false,
        created_at: '2023-04-18T13:34:42Z',
        updated_at: '2025-11-23T23:12:06Z',
        badge_type_id: 0,
        weight: 92.0,
        profile_medium: 'https://picsum.photos/60',
        profile: 'https://picsum.photos/124',
        friend: null,
        follower: null,
      })
      .status(200);
  }
}
