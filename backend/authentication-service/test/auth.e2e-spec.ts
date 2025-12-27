import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AuthModule } from '../src/functions/auth/auth.module';
import { PrismaService } from '../src/prisma.service';
import { App } from 'supertest/types';
import { Account, User } from '@prisma/client';

describe('OAuth Social Login – E2E', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(PrismaService)
      .useValue({
        user: {
          findUnique: jest.fn(),
          create: jest.fn(),
        },
        account: {
          findUnique: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
        },
        refreshToken: {
          create: jest.fn(),
        },
      })
      .compile();

    app = moduleRef.createNestApplication();
    prisma = moduleRef.get(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('Strava', () => {
    it('should perform Strava OAuth create account complete flow', async () => {
      //Given
      prisma.account.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.findUnique = jest.fn().mockResolvedValue(null);
      prisma.user.create = jest
        .fn()
        .mockImplementation(
          ({
            data,
          }: {
            data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
          }) => {
            return {
              id: 'mock-user-id',
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
            };
          },
        );
      prisma.account.create = jest
        .fn()
        .mockImplementation(
          ({
            data,
          }: {
            data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
          }) => {
            return {
              id: 'mock-account-id',
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
              user: {
                id: 'mock-user-id',
                email: 'john.doe@test.dev',
              },
            };
          },
        );

      //When
      const res = await request(app.getHttpServer() as App)
        .get('/auth/strava/callback')
        .query({ code: 'mock-code' })
        .redirects(1);

      //Then
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
      expect(prisma.account.findUnique).toHaveBeenCalled();
      expect(prisma.user.create).toHaveBeenCalled();
      expect(prisma.account.create).toHaveBeenCalled();
    });

    it('should perform Strava OAuth log in complete flow', async () => {
      //Given
      prisma.account.findUnique = jest.fn().mockResolvedValue({
        id: 'mock-account-id',
        createdAt: '2025-12-14T23:04:35.708Z',
        updatedAt: '2025-12-14T23:04:35.708Z',
        provider: 'strava',
        providerId: '116651093',
        accessToken: '43844e53bd9f3f7e4c18543b9d899e84a3a79269',
        refreshToken: 'f7f3a69f8846fb2c0b1756f66G8650ffd6b976f2',
        expiresAt: '+021600-01-01T00:00:00.000Z',
        profile: {
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
          weight: 92,
          profile_medium: 'https://picsum.photos/60',
          profile: 'https://picsum.photos/124',
          friend: null,
          follower: null,
        },
        userId: 'mock-user-id',
        user: {
          id: 'mock-user-id',
          email: 'john.doe@test.dev',
        },
      });
      prisma.account.update = jest
        .fn()
        .mockImplementation(
          ({
            data,
          }: {
            data: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>;
          }) => {
            return {
              id: 'mock-account-id',
              createdAt: new Date(),
              updatedAt: new Date(),
              ...data,
              user: {
                id: 'mock-user-id',
                email: 'john.doe@test.dev',
              },
            };
          },
        );

      //When
      const res = await request(app.getHttpServer() as App)
        .get('/auth/strava/callback')
        .query({ code: 'mock-code' })
        .redirects(1);

      //Then
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('accessToken');
      expect(res.body).toHaveProperty('refreshToken');
      expect(prisma.account.findUnique).toHaveBeenCalled();
      expect(prisma.account.update).toHaveBeenCalled();
    });
  });
});
