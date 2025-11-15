import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../../libs/jwt/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

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
      const req = context.switchToHttp().getRequest();
      req.user = { email: 'test@example.com', password: 'hashedpassword' };
      return true;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
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

  describe('login', () => {
    it('should call authService.login with email and password', async () => {
      //Given
      const result = { accessToken: 'token', refreshToken: 'refresh' };
      mockAuthService.login.mockResolvedValue(result);
      const body = { email: 'test@example.com', password: '1234' };

      //When
      const login = await controller.login(body);
      
      //Then
      expect(login).toEqual(result);
      expect(mockAuthService.login).toHaveBeenCalledWith(body.email, body.password);
    });
  });

  describe('register', () => {
    it('should call authService.register with email and password', async () => {
      //Given
      const result = { id: 1, email: 'test@example.com' };
      mockAuthService.register.mockResolvedValue(result);
      const body = { email: 'test@example.com', password: '1234' };

      //When
      const register = await controller.register(body);

      //Then
      expect(register).toEqual(result);
      expect(mockAuthService.register).toHaveBeenCalledWith(body.email, body.password);
    });
  });

  describe('refresh', () => {
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
      expect(mockAuthService.refreshToken).toHaveBeenCalledWith(body.refreshToken);
      expect(mockAuthService.getTokens).toHaveBeenCalledWith(payload.sub, payload.email);
    });
  });

  describe('me', () => {
    it('should return user from request', async () => {
      //Given
      const req = { user: { email: 'test@example.com', password: 'hashedpassword' } };

      //When
      const me = await controller.me(req);

      //Then
      expect(me).toEqual(req.user);
    });
  });
});
