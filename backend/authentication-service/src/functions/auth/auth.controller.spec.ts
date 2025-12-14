import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../libs/guards/jwt/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { AccountProvider } from '../../libs/account-provider.enum';
import { DynamicAuthGuard } from '../../libs/guards/dynamic/dynamic-auth.guard';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    refreshToken: jest.fn(),
    getTokens: jest.fn(),
  };

  const mockJwtAuthGuard = {
    canActivate: jest.fn((context: ExecutionContext) => {
      const req: { user: { email: string; password: string } } = context
        .switchToHttp()
        .getRequest();
      req.user = { email: 'test@example.com', password: 'hashedpassword' };
      return true;
    }),
  };

  const mockDynamicAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .overrideGuard(DynamicAuthGuard)
      .useValue(mockDynamicAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('email login', () => {
    it('should call authService.login with email and password', async () => {
      //Given
      const result = { accessToken: 'token', refreshToken: 'refresh' };
      mockAuthService.login.mockResolvedValue(result);
      const body = { email: 'test@example.com', password: '1234' };

      //When
      const login = await controller.login(body);

      //Then
      expect(login).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(
        body.email,
        body.password,
      );
    });

    it('should call authService.register with email and password', async () => {
      //Given
      const result = { id: 1, email: 'test@example.com' };
      mockAuthService.register.mockResolvedValue(result);
      const body = { email: 'test@example.com', password: '1234' };

      //When
      const register = await controller.register(body);

      //Then
      expect(register).toEqual(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(
        body.email,
        body.password,
      );
    });

    it('should return user from request', () => {
      //Given
      const req = {
        user: { email: 'test@example.com', password: 'hashedpassword' },
      };

      //When
      const me = controller.me(req);

      //Then
      expect(me).toEqual(req.user);
    });
  });

  describe('tokens', () => {
    it('should refresh tokens', async () => {
      //Given
      const payload = { sub: 1, email: 'test@example.com' };
      const tokens = { accessToken: 'new-token', refreshToken: 'new-refresh' };
      mockAuthService.refreshToken.mockResolvedValue(payload);
      mockAuthService.getTokens.mockResolvedValue(tokens);
      const body = { refreshToken: 'old-refresh' };

      //When
      const refresh = await controller.refresh(body);

      //Then
      expect(refresh).toEqual(tokens);
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(
        body.refreshToken,
      );
      expect(mockAuthService.getTokens).toHaveBeenCalledWith(
        payload.sub,
        payload.email,
      );
    });
  });

  describe('oauth login', () => {
    it('should be defined and callable', async () => {
      // The method has no logic, but must not throw
      expect(await controller.socialRedirect()).toBeUndefined();
    });

    it('should call authService.oauthLogin with provider data', async () => {
      //Given
      const provider = AccountProvider.Strava;

      const req = {
        user: {
          providerId: 'STRAVA123',
          profile: { email: 'john@example.com', foo: 'bar' },
          accessToken: 'ACCESS123',
          refreshToken: 'REFRESH123',
          expiresAt: 999999,
        },
      };

      const expectedResult = {
        accessToken: 'local-jwt-access',
        refreshToken: 'local-jwt-refresh',
      };

      const oauthLogin = (authService.oauthLogin = jest
        .fn()
        .mockResolvedValue(expectedResult));

      //When
      const response = await controller.socialCallback(req, provider);

      //Then
      expect(oauthLogin).toHaveBeenCalledWith({
        provider,
        providerId: 'STRAVA123',
        profile: { email: 'john@example.com', foo: 'bar' },
        tokens: {
          accessToken: 'ACCESS123',
          refreshToken: 'REFRESH123',
          expiresAt: 999999,
        },
      });

      expect(response).toEqual(expectedResult);
    });
  });
});
