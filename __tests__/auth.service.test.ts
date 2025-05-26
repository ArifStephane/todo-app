import { AuthService } from '../src/auth/auth.service';
import { LoginDto } from '../src/auth/dto/login.dto';
import * as fs from 'fs';
import * as path from 'path';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('register', () => {
    it('should register a new user', () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };

      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation(() => JSON.stringify([]));
      jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

      const result = authService.register(loginDto);

      expect(result).toEqual({
        userId: expect.any(String),
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        tasks: [],
        role: 'user',
        isActive: true,
        lastLogin: expect.any(String),
        profilePicture: '',
      });
    });
  });

  describe('login', () => {
    it('should return a user if login is successful', () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };

      const mockUser = {
        userId: '1',
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
        role: 'user',
        isActive: true,
        lastLogin: new Date().toISOString(),
        profilePicture: '',
      };

      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation(() => JSON.stringify([mockUser]));

      const result = authService.login(loginDto);

      expect(result).toEqual(mockUser);
    });

    it('should return null if login fails', () => {
      const loginDto: LoginDto = {
        username: 'testuser',
        password: 'wrongpassword',
        email: 'test@example.com',
      };

      const mockUser = {
        userId: '1',
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tasks: [],
        role: 'user',
        isActive: true,
        lastLogin: new Date().toISOString(),
        profilePicture: '',
      };

      jest
        .spyOn(fs, 'readFileSync')
        .mockImplementation(() => JSON.stringify([mockUser]));

      const result = authService.login(loginDto);

      expect(result).toBeNull();
    });
  });
});
