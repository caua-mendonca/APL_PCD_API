import JWT from 'jsonwebtoken';
import { authenticateTokenCand, authenticateTokenEmp, authenticateTokenADM } from '../../middleware/middleware.js';

// Mock do JWT
jest.mock('jsonwebtoken');
const mockJWT = JWT as jest.Mocked<typeof JWT>;

describe('Middleware Authentication', () => {
  let mockReq: any;
  let mockRes: any;
  let mockNext: any;

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
  });

  describe('authenticateTokenCand', () => {
    test('deve rejeitar requisição sem header authorization', () => {
      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve processar token válido', () => {
      const mockPayload = { id: 'CAND-123456', email: 'test@test.com' };
      mockReq.headers.authorization = 'Bearer valid-token';
      (mockJWT.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', process.env.SECRET_CAND);
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('deve rejeitar token inválido', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';
      (mockJWT.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token inválido');
      });

      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Token inválido!' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('authenticateTokenEmp', () => {
    test('deve rejeitar requisição sem header authorization', () => {
      authenticateTokenEmp(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve processar token válido', () => {
      const mockPayload = { id: 'EMP-123456', email: 'empresa@test.com' };
      mockReq.headers.authorization = 'Bearer valid-token';
      (mockJWT.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticateTokenEmp(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', process.env.SECRET_EMP);
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('deve rejeitar token inválido', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';
      (mockJWT.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token inválido');
      });

      authenticateTokenEmp(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Token inválido!' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('authenticateTokenADM', () => {
    test('deve rejeitar requisição sem header authorization', () => {
      authenticateTokenADM(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(401);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Não autorizado!' });
      expect(mockNext).not.toHaveBeenCalled();
    });

    test('deve processar token válido', () => {
      const mockPayload = { id: 'ADM-123456', email: 'admin@test.com' };
      mockReq.headers.authorization = 'Bearer valid-token';
      (mockJWT.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticateTokenADM(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('valid-token', process.env.SECRET_ADM);
      expect(mockReq.user).toBe(mockPayload);
      expect(mockNext).toHaveBeenCalled();
    });

    test('deve rejeitar token inválido', () => {
      mockReq.headers.authorization = 'Bearer invalid-token';
      (mockJWT.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token inválido');
      });

      authenticateTokenADM(mockReq, mockRes, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(403);
      expect(mockRes.json).toHaveBeenCalledWith({ msg: 'Token inválido!' });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('Formato do token', () => {
    test('deve extrair token corretamente do header Bearer', () => {
      const mockPayload = { id: 'TEST-123' };
      mockReq.headers.authorization = 'Bearer my-secret-token';
      (mockJWT.verify as jest.Mock).mockReturnValue(mockPayload);

      authenticateTokenCand(mockReq, mockRes, mockNext);

      expect(mockJWT.verify).toHaveBeenCalledWith('my-secret-token', process.env.SECRET_CAND);
    });
  });
});