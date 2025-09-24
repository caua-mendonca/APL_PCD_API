import { validateEmailToDB } from '../../../validation/validateData/validateEmail.js';
import * as DB from '../../../repositories/shared/commonRepository.js';

jest.mock('../../../repositories/shared/commonRepository.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('Email Validation', () => {
  describe('validateEmailToDB', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('should return true when email does not exist in database', async () => {
      mockDB.validateData.mockResolvedValue(0);
      
      const result = await validateEmailToDB('test@example.com', 'email', 'tb_candidato');
      
      expect(result).toBe(true);
      expect(mockDB.validateData).toHaveBeenCalledWith('test@example.com', 'email', 'tb_candidato');
    });

    test('should return false when email exists in database', async () => {
      mockDB.validateData.mockResolvedValue(1);
      
      const result = await validateEmailToDB('existing@example.com', 'email', 'tb_candidato');
      
      expect(result).toBe(false);
    });

    test('should handle database errors', async () => {
      mockDB.validateData.mockRejectedValue(new Error('Database error'));
      
      await expect(validateEmailToDB('test@example.com', 'email', 'tb_candidato'))
        .rejects.toThrow('Database error');
    });
  });
});