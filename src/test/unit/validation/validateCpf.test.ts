import { validateCpf, validateCpfToDB } from '../../../validation/validateData/validateCpf.js';
import * as DB from '../../../repositories/shared/commonRepository.js';

jest.mock('../../../repositories/shared/commonRepository.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('CPF Validation', () => {
  describe('validateCpf', () => {
    test('should validate correct CPF', () => {
      expect(validateCpf('11144477735')).toBe(true);
      expect(validateCpf('111.444.777-35')).toBe(true);
    });

    test('should reject invalid CPF', () => {
      expect(validateCpf('11111111111')).toBe(false);
      expect(validateCpf('12345678901')).toBe(false);
      expect(validateCpf('123')).toBe(false);
      expect(validateCpf('')).toBe(false);
    });

    test('should handle CPF with formatting', () => {
      expect(validateCpf('111.444.777-35')).toBe(true);
      expect(validateCpf('111-444-777.35')).toBe(true);
    });
  });

  describe('validateCpfToDB', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return true when CPF does not exist in database', async () => {
      mockDB.validateData.mockResolvedValue(0);
      
      const result = await validateCpfToDB('11144477735', 'cpf', 'tb_candidato');
      
      expect(result).toBe(true);
      expect(mockDB.validateData).toHaveBeenCalledWith('11144477735', 'cpf', 'tb_candidato');
    });

    test('should return false when CPF exists in database', async () => {
      mockDB.validateData.mockResolvedValue(1);
      
      const result = await validateCpfToDB('11144477735', 'cpf', 'tb_candidato');
      
      expect(result).toBe(false);
    });
  });
});