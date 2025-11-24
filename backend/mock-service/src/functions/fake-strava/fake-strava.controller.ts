import { BadRequestException, Controller, Get, Query, Res } from "@nestjs/common";
import type { Response } from 'express';

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

    if (!redirectUri) {
      throw new BadRequestException('redirect_uri is required');
    }
    if (responseType !== 'code') {
      return res.status(400).send('response_type must be "code"');
    }

    const fakeCode = 'mock_code_1234';
    const url = `${redirectUri}?code=${fakeCode}&scope=${scope}`;

    return res.redirect(url);
  }
}