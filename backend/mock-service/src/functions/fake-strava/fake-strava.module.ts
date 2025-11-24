import { Module } from '@nestjs/common';
import { FakeStravaController } from './fake-strava.controller';

@Module({
  controllers: [FakeStravaController],
})
export class FakeStravaModule {}
