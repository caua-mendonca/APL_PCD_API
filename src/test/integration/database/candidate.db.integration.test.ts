import { insertCandidate } from '../../../repositories/user/candidateRepository.js';
import * as DB from '../../../config/connect.js';

// Mock database connection for integration tests
jest.mock('../../../config/connect.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('Candidate Database Integration Tests', () => {
  const mockCandidate = {
    id: 'CAND-123456',
    name: 'João Silva',
    email: 'joao@example.com',
    senha: 'hashedPassword123',
    telefone: '11999999999',
    cpf: '11144477735',
    data_nascimento: new Date('1990-01-01'),
    def: 'DAUDI-123456',
    sub_tipo: 'SUBT-123456',
    barreira: 'BARR-123456',
    acessbilidade: 'ACES-123456',
    status: true
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockDB.pool = {
      query: jest.fn(),
      connect: jest.fn(),
      end: jest.fn()
    } as any;
  });

  describe('insertCandidate', () => {
    test('should insert candidate successfully', async () => {
      mockDB.pool.query.mockResolvedValue({ rows: [], rowCount: 1 });
      process.env.STATUS_201 = 'Created';

      const result = await insertCandidate(mockCandidate);

      expect(result).toEqual([201, 'Created']);
      expect(mockDB.pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO tb_candidato'),
        [
          mockCandidate.id,
          mockCandidate.name,
          mockCandidate.email,
          mockCandidate.senha,
          mockCandidate.telefone,
          mockCandidate.cpf,
          mockCandidate.data_nascimento,
          mockCandidate.status,
          mockCandidate.def,
          mockCandidate.sub_tipo,
          mockCandidate.barreira,
          mockCandidate.acessbilidade
        ]
      );
    });

    test('should handle database error', async () => {
      mockDB.pool.query.mockRejectedValue(new Error('Database connection failed'));
      process.env.STATUS_500 = 'Internal Server Error';

      const result = await insertCandidate(mockCandidate);

      expect(result).toEqual([500, 'Internal Server Error']);
    });

    test('should handle duplicate key error', async () => {
      const duplicateError = new Error('duplicate key value violates unique constraint');
      mockDB.pool.query.mockRejectedValue(duplicateError);
      process.env.STATUS_500 = 'Internal Server Error';

      const result = await insertCandidate(mockCandidate);

      expect(result).toEqual([500, 'Internal Server Error']);
    });
  });

  describe('Database Connection', () => {
    test('should handle connection timeout', async () => {
      const timeoutError = new Error('connection timeout');
      mockDB.pool.query.mockRejectedValue(timeoutError);
      process.env.STATUS_500 = 'Internal Server Error';

      const result = await insertCandidate(mockCandidate);

      expect(result).toEqual([500, 'Internal Server Error']);
    });

    test('should handle invalid SQL syntax', async () => {
      const sqlError = new Error('syntax error at or near');
      mockDB.pool.query.mockRejectedValue(sqlError);
      process.env.STATUS_500 = 'Internal Server Error';

      const result = await insertCandidate(mockCandidate);

      expect(result).toEqual([500, 'Internal Server Error']);
    });
  });
});