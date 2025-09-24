import { AuthService, CandidateAuthService, CompanyAuthService, AdminAuthService } from '../../../services/AuthService.js';
import * as LoginModel from '../../../controller/login/login.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

jest.mock('../../../controller/login/login.js');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

const mockLoginModel = LoginModel as jest.Mocked<typeof LoginModel>;
const mockJWT = jwt as jest.Mocked<typeof jwt>;
const mockBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
    jest.clearAllMocks();
  });

  describe('validateToken', () => {
    test('should return true for valid token', async () => {
      mockJWT.verify.mockReturnValue({ id: 'test-id' } as any);
      
      const result = await authService.validateToken('valid-token');
      
      expect(result).toBe(true);
      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', 'default-secret');
    });

    test('should return false for invalid token', async () => {
      mockJWT.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });
      
      const result = await authService.validateToken('invalid-token');
      
      expect(result).toBe(false);
    });

    test('should use environment JWT_SECRET when available', async () => {
      process.env.JWT_SECRET = 'env-secret';
      mockJWT.verify.mockReturnValue({ id: 'test-id' } as any);
      
      await authService.validateToken('valid-token');
      
      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', 'env-secret');
    });
  });

  describe('changePassword', () => {
    test('should change password successfully', async () => {
      mockBcrypt.hash.mockResolvedValue('hashed-password' as never);
      
      const result = await authService.changePassword('user-id', 'old-pass', 'new-pass');
      
      expect(result).toEqual([200, 'Password changed successfully']);
      expect(mockBcrypt.hash).toHaveBeenCalledWith('new-pass', 10);
    });

    test('should handle password change error', async () => {
      mockBcrypt.hash.mockRejectedValue(new Error('Hash error') as never);
      
      const result = await authService.changePassword('user-id', 'old-pass', 'new-pass');
      
      expect(result).toEqual([500, 'Error changing password']);
    });
  });

  describe('hashPassword', () => {
    test('should hash password correctly', async () => {
      mockBcrypt.hash.mockResolvedValue('hashed-password' as never);
      
      const result = await (authService as any).hashPassword('password123');
      
      expect(result).toBe('hashed-password');
      expect(mockBcrypt.hash).toHaveBeenCalledWith('password123', 10);
    });
  });

  describe('comparePassword', () => {
    test('should compare passwords correctly', async () => {
      mockBcrypt.compare.mockResolvedValue(true as never);
      
      const result = await (authService as any).comparePassword('password123', 'hashed-password');
      
      expect(result).toBe(true);
      expect(mockBcrypt.compare).toHaveBeenCalledWith('password123', 'hashed-password');
    });
  });
});

describe('CandidateAuthService', () => {
  let candidateAuthService: CandidateAuthService;

  beforeEach(() => {
    candidateAuthService = new CandidateAuthService();
    jest.clearAllMocks();
  });

  test('should login candidate successfully', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' };
    mockLoginModel.loginCandidate.mockResolvedValue([200, 'Login successful']);
    
    const result = await candidateAuthService.login(credentials);
    
    expect(result).toEqual([200, 'Login successful']);
    expect(mockLoginModel.loginCandidate).toHaveBeenCalledWith(credentials);
  });
});

describe('CompanyAuthService', () => {
  let companyAuthService: CompanyAuthService;

  beforeEach(() => {
    companyAuthService = new CompanyAuthService();
    jest.clearAllMocks();
  });

  test('should login company successfully', async () => {
    const credentials = { email: 'company@example.com', password: 'password123' };
    mockLoginModel.loginCompany.mockResolvedValue([200, 'Login successful']);
    
    const result = await companyAuthService.login(credentials);
    
    expect(result).toEqual([200, 'Login successful']);
    expect(mockLoginModel.loginCompany).toHaveBeenCalledWith(credentials);
  });
});

describe('AdminAuthService', () => {
  let adminAuthService: AdminAuthService;

  beforeEach(() => {
    adminAuthService = new AdminAuthService();
    jest.clearAllMocks();
  });

  test('should login admin successfully', async () => {
    const credentials = { email: 'admin@example.com', password: 'password123' };
    mockLoginModel.loginAdmin.mockResolvedValue([200, 'Login successful']);
    
    const result = await adminAuthService.login(credentials);
    
    expect(result).toEqual([200, 'Login successful']);
    expect(mockLoginModel.loginAdmin).toHaveBeenCalledWith(credentials);
  });
});