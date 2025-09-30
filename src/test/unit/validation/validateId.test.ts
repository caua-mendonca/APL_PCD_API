import { validateId, validateIdContratante, validateIdCandidato, validateIdByRelation } from '../../../validation/validateId/validateId.js';
import * as DB from '../../../repositories/shared/commonRepository.js';

jest.mock('../../../repositories/shared/commonRepository.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('ID Validation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateId', () => {
    test('should validate existing ID', async () => {
      mockDB.selectId.mockResolvedValue(true);
      
      const result = await validateId('CAND-123456', 'tb_candidato');
      
      expect(result).toBe(true);
      expect(mockDB.selectId).toHaveBeenCalledWith('tb_candidato', 'CAND-123456');
    });

    test('should return false for non-existing ID', async () => {
      mockDB.selectId.mockResolvedValue(false);
      
      const result = await validateId('CAND-999999', 'tb_candidato');
      
      expect(result).toBe(false);
    });
  });

  describe('validateIdContratante', () => {
    test('should validate EMP prefix', async () => {
      const result = await validateIdContratante('EMP-123456');
      expect(result).toBe(true);
    });

    test('should validate COLAB prefix', async () => {
      const result = await validateIdContratante('COLAB-123456');
      expect(result).toBe(true);
    });

    test('should reject invalid prefix', async () => {
      const result = await validateIdContratante('CAND-123456');
      expect(result).toBe(false);
    });

    test('should handle case insensitive', async () => {
      const result = await validateIdContratante('emp-123456');
      expect(result).toBe(true);
    });
  });

  describe('validateIdCandidato', () => {
    test('should validate CAND prefix', async () => {
      const result = await validateIdCandidato('CAND-123456');
      expect(result).toBe(true);
    });

    test('should reject invalid prefix', async () => {
      const result = await validateIdCandidato('EMP-123456');
      expect(result).toBe(false);
    });

    test('should handle case insensitive', async () => {
      const result = await validateIdCandidato('cand-123456');
      expect(result).toBe(true);
    });
  });

  describe('validateIdByRelation', () => {
    test('should return true when relation exists', async () => {
      mockDB.validateData.mockResolvedValue(1);
      
      const result = await validateIdByRelation('CAND-123456', 'id', 'tb_candidato');
      
      expect(result).toBe(true);
      expect(mockDB.validateData).toHaveBeenCalledWith('CAND-123456', 'tb_candidato', 'id');
    });

    test('should return false when relation does not exist', async () => {
      mockDB.validateData.mockResolvedValue(0);
      
      const result = await validateIdByRelation('CAND-999999', 'id', 'tb_candidato');
      
      expect(result).toBe(false);
    });
  });
});