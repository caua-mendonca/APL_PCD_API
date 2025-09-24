import { validateCNPJ, validateCNPJToDB } from '../../../validation/validateData/validateCNPJ.js';
import * as DB from '../../../repositories/shared/commonRepository.js';

jest.mock('../../../repositories/shared/commonRepository.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('CNPJ Validation', () => {
  describe('validateCNPJ', () => {
    test('should validate correct CNPJ', () => {
      expect(validateCNPJ('11222333000181')).toBe(true);
    });

    test('should reject invalid CNPJ', () => {
      expect(validateCNPJ('11111111111111')).toBe(false);
      expect(validateCNPJ('12345678901234')).toBe(false);
      expect(validateCNPJ('123')).toBe(false);
      expect(validateCNPJ('')).toBe(false);
      expect(validateCNPJ(null as any)).toBe(false);
    });

    test('should reject CNPJ with repeated digits', () => {
      expect(validateCNPJ('00000000000000')).toBe(false);
      expect(validateCNPJ('11111111111111')).toBe(false);
    });

    test('should reject CNPJ with wrong length', () => {
      expect(validateCNPJ('1122233300018')).toBe(false);
      expect(validateCNPJ('112223330001811')).toBe(false);
    });
  });

  describe('validateCNPJToDB', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return true when CNPJ does not exist in database', async () => {
      mockDB.validateData.mockResolvedValue(0);
      
      const result = await validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa');
      
      expect(result).toBe(true);
      expect(mockDB.validateData).toHaveBeenCalledWith('11222333000181', 'cnpj', 'tb_empresa');
    });

    test('should return false when CNPJ exists in database', async () => {
      mockDB.validateData.mockResolvedValue(1);
      
      const result = await validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa');
      
      expect(result).toBe(false);
    });
  });
});