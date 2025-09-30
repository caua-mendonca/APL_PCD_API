import JWT from 'jsonwebtoken';
import { authenticateTokenCand, authenticateTokenEmp, authenticateTokenADM } from '../../../middleware/middleware.js';

jest.mock('jsonwebtoken');
const mockJWT = JWT as jest.Mocked<typeof JWT>;

describe('Authentication Middleware', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockReq = {
      headers: {},
      user: null
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
    
    process.env.SECRET_CAND = 'test-secret-cand';
    process.env.SECRET_EMP = 'test-secret-emp';
    process.env.SECRET_ADM = 'test-secret-adm';
  });

  describe('authenticateTokenCand', () => {
    test('should authenticate valid candidate token', () => {
      const mockPayload = { id: 'CAND-123456', email: 'test@example.com' };
      mockReq.headers.authorization = 'Bearer valid-token';
      mockJWT.verify.mockReturnValue(mockPayload);

      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', 'test-secret-cand');
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('should reject request without authorization header', () => {
      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('should reject invalid token', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';
      mockJWT.verify.mockImplementation(() => {
        throw new Error('Invalid token');
      });

      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Token inválido!' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('authenticateTokenEmp', () => {
    test('should authenticate valid company token', () => {
      const mockPayload = { id: 'EMP-123456', cnpj: '12345678000195' };
      mockReq.headers.authorization = 'Bearer valid-token';
      mockJWT.verify.mockReturnValue(mockPayload);

      authenticateTokenEmp(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', 'test-secret-emp');
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('should reject request without authorization header', () => {
      authenticateTokenEmp(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
    });
  });

  describe('authenticateTokenADM', () => {
    test('should authenticate valid admin token', () => {
      const mockPayload = { id: 'ADM-123456', role: 'admin' };
      mockReq.headers.authorization = 'Bearer valid-token';
      mockJWT.verify.mockReturnValue(mockPayload);

      authenticateTokenADM(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', 'test-secret-adm');
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('should reject request without authorization header', () => {
      authenticateTokenADM(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
    });
  });
});