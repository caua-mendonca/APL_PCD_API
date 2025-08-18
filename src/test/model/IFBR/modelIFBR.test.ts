import * as modelIFBR from '../../../model/IFBR/modelIFBR.js';
import * as DB from '../../../repositories/queryTools.js';
import * as validateId from '../../../validation/validateId/validateId.js';

jest.mock('../../../repositories/queryTools.js');
jest.mock('../../../validation/validateId/validateId.js');

const mockDB = DB as jest.Mocked<typeof DB>;
const mockValidateId = validateId as jest.Mocked<typeof validateId>;

describe('ModelIFBR', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createIFBRCompleto', () => {
    const mockBody = [
      { id: 1, name: 'Questão 1', score: 5 },
      { id: 2, name: 'Questão 2', score: 3 },
      { id: 3, name: 'Questão 3', score: 4 },
      { id: 4, name: 'Questão 4', score: 2 },
      { id: 5, name: 'Questão 5', score: 5 },
      { id: 6, name: 'Questão 6', score: 3 },
      { id: 7, name: 'Questão 7', score: 4 }
    ];

    it('deve criar IFBR completo com sucesso', async () => {
      mockValidateId.validateIdByRelation.mockResolvedValue(false);
      mockDB.insertIntoIFBR.mockResolvedValue(undefined);
      mockDB.updateIfbrCandidato.mockResolvedValue(undefined);
      mockDB.insertCandidatoIFBRData.mockResolvedValue(undefined);

      const result = await modelIFBR.createIFBRCompleto(mockBody, 'CAND-123456');

      expect(result).toBe(true);
      expect(mockDB.insertIntoIFBR).toHaveBeenCalledTimes(7);
      expect(mockDB.updateIfbrCandidato).toHaveBeenCalled();
      expect(mockDB.insertCandidatoIFBRData).toHaveBeenCalled();
    });

    it('deve falhar se candidato já possui formulário', async () => {
      mockValidateId.validateIdByRelation.mockResolvedValue(true);

      const result = await modelIFBR.createIFBRCompleto(mockBody, 'CAND-123456');

      expect(result).toBe(false);
    });

    it('deve ignorar questões com ID inválido', async () => {
      const bodyComIdInvalido = [
        { id: 1, name: 'Questão 1', score: 5 },
        { id: 8, name: 'Questão Inválida', score: 3 }, // ID inválido
        { id: 2, name: 'Questão 2', score: 4 }
      ];

      mockValidateId.validateIdByRelation.mockResolvedValue(false);
      mockDB.insertIntoIFBR.mockResolvedValue(undefined);
      mockDB.updateIfbrCandidato.mockResolvedValue(undefined);
      mockDB.insertCandidatoIFBRData.mockResolvedValue(undefined);

      const result = await modelIFBR.createIFBRCompleto(bodyComIdInvalido, 'CAND-123456');

      expect(result).toBe(true);
      expect(mockDB.insertIntoIFBR).toHaveBeenCalledTimes(2); // Apenas 2 questões válidas
    });

    it('deve retornar false em caso de erro', async () => {
      mockValidateId.validateIdByRelation.mockResolvedValue(false);
      mockDB.insertIntoIFBR.mockRejectedValue(new Error('Erro no banco'));

      const result = await modelIFBR.createIFBRCompleto(mockBody, 'CAND-123456');

      expect(result).toBe(false);
    });

    it('deve processar questões com IDs no limite válido', async () => {
      const bodyLimite = [
        { id: 1, name: 'Questão 1', score: 5 },
        { id: 7, name: 'Questão 7', score: 3 } // ID 7 é válido (< 8)
      ];

      mockValidateId.validateIdByRelation.mockResolvedValue(false);
      mockDB.insertIntoIFBR.mockResolvedValue(undefined);
      mockDB.updateIfbrCandidato.mockResolvedValue(undefined);
      mockDB.insertCandidatoIFBRData.mockResolvedValue(undefined);

      const result = await modelIFBR.createIFBRCompleto(bodyLimite, 'CAND-123456');

      expect(result).toBe(true);
      expect(mockDB.insertIntoIFBR).toHaveBeenCalledTimes(2);
    });
  });
});