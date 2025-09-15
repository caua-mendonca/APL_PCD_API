import { validateEmailToDB } from '../../../validation/validateData/validateEmail.js';
import * as DB from '../../../repositories/queryTools.js';

// Mock do repositório
jest.mock('../../../repositories/queryTools.js');
const mockDB = DB as jest.Mocked<typeof DB>;

describe('Validação de Email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateEmailToDB', () => {
    test('deve retornar true para email não existente no banco', async () => {
      mockDB.validateData.mockResolvedValue(0);

      const result = await validateEmailToDB('novo@email.com', 'email', 'tb_candidato');

      expect(result).toBe(true);
      expect(mockDB.validateData).toHaveBeenCalledWith('novo@email.com', 'email', 'tb_candidato');
    });

    test('deve retornar false para email já existente no banco', async () => {
      mockDB.validateData.mockResolvedValue(1);

      const result = await validateEmailToDB('existente@email.com', 'email', 'tb_candidato');

      expect(result).toBe(false);
      expect(mockDB.validateData).toHaveBeenCalledWith('existente@email.com', 'email', 'tb_candidato');
    });

    test('deve retornar false para múltiplos emails existentes', async () => {
      mockDB.validateData.mockResolvedValue(2);

      const result = await validateEmailToDB('duplicado@email.com', 'email', 'tb_candidato');

      expect(result).toBe(false);
    });

    test('deve tratar erro na consulta ao banco', async () => {
      mockDB.validateData.mockRejectedValue(new Error('Erro de conexão'));

      await expect(validateEmailToDB('erro@email.com', 'email', 'tb_candidato'))
        .rejects.toThrow('Erro de conexão');
    });
  });
});