import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../libs/guards/jwt/jwt.strategy';
import { PrismaService } from '../../prisma.service';
import { StravaStrategy } from '../../libs/guards/strava/strava.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'gfsd454F34EZRd',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, StravaStrategy, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
