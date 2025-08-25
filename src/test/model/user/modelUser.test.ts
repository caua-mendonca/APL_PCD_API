import * as modelUser from '../../../model/user/modelUser.js';
import * as DB from '../../../repositories/queryTools.js';
import * as validateId from '../../../validation/validateId/validateId.js';
import * as validateCpf from '../../../validation/validateData/validadeteCpf.js';
import * as validateAge from '../../../validation/validateData/validateAge.js';
import * as validateCNPJ from '../../../validation/validateData/validateCNPJ.js';
import * as validateEmail from '../../../validation/validateData/validateEmail.js';

jest.mock('../../../repositories/queryTools.js');
jest.mock('../../../validation/validateId/validateId.js');
jest.mock('../../../validation/validateData/validadeteCpf.js');
jest.mock('../../../validation/validateData/validateAge.js');
jest.mock('../../../validation/validateData/validateCNPJ.js');
jest.mock('../../../validation/validateData/validateEmail.js');

const mockDB = DB as jest.Mocked<typeof DB>;
const mockValidateId = validateId as jest.Mocked<typeof validateId>;
const mockValidateCpf = validateCpf as jest.Mocked<typeof validateCpf>;
const mockValidateAge = validateAge as jest.Mocked<typeof validateAge>;
const mockValidateCNPJ = validateCNPJ as jest.Mocked<typeof validateCNPJ>;
const mockValidateEmail = validateEmail as jest.Mocked<typeof validateEmail>;

describe('ModelUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createColaborador', () => {
    const mockUser = {
      name: 'João Silva',
      email: 'joao@empresa.com',
      senha: '123456',
      setor: 'TI'
    };

    it('deve criar colaborador com sucesso', async () => {
      mockValidateId.validateIdByRelation.mockResolvedValue(true);
      mockDB.insertIntoColaborador.mockResolvedValue(undefined);
      mockDB.updateColaboradorEmpresa.mockResolvedValue(undefined);
      mockDB.insertEmpresaColaborador.mockResolvedValue(undefined);

      const result = await modelUser.createColaborador(mockUser, 'EMP-123456');

      expect(result).toBe(true);
      expect(mockDB.insertIntoColaborador).toHaveBeenCalled();
    });

    it('deve falhar se empresa não existir', async () => {
      mockValidateId.validateIdByRelation.mockResolvedValue(false);

      await expect(modelUser.createColaborador(mockUser, 'EMP-999999'))
        .rejects.toThrow('Empresa EMP-999999 nao encontrada');
    });
  });

  describe('createCanditado', () => {
    const mockCandidate = {
      name: 'Maria Santos',
      email: 'maria@email.com',
      confirme_email: 'maria@email.com',
      senha: '123456',
      confirme_senha: '123456',
      telefone: '11999999999',
      cpf: '12345678901',
      data_nascimento: new Date('1990-01-01'),
      def_visual: false,
      def_fisica: true,
      def_auditiva: false,
      def_intelectual: false,
      outra_def: false,
      descricao_def: '',
      acessibilidade_trab: true,
      descricao_acessibilidade: 'Cadeirante'
    };

    it('deve criar candidato com dados válidos', async () => {
      mockValidateId.validateId.mockReturnValue(true);
      mockValidateCpf.validateCpf.mockReturnValue(true);
      mockValidateCpf.validateCpfToDB.mockResolvedValue(true);
      mockValidateAge.validateAge.mockReturnValue(true);
      mockValidateEmail.validateEmailToDB.mockResolvedValue(true);
      mockDB.insertIntoCandidate.mockResolvedValue(undefined);

      const result = await modelUser.createCanditado(mockCandidate);

      expect(result).toBe(true);
      expect(mockDB.insertIntoCandidate).toHaveBeenCalled();
    });

    it('deve retornar erros para dados inválidos', async () => {
      mockValidateId.validateId.mockReturnValue(true);
      mockValidateCpf.validateCpf.mockReturnValue(false);
      mockValidateAge.validateAge.mockReturnValue(false);

      const result = await modelUser.createCanditado({
        ...mockCandidate,
        confirme_email: 'email_diferente@email.com',
        confirme_senha: 'senha_diferente'
      });

      expect(Array.isArray(result)).toBe(true);
      expect(result).toContain('CPF inválido');
    });
  });

  describe('deleteUser', () => {
    it('deve deletar usuário com sucesso', async () => {
      mockDB.deleteFromTable.mockResolvedValue({ rowCount: 1 });

      const result = await modelUser.deleteUser('tb_candidato', 'CAND-123456');

      expect(result.rowCount).toBe(1);
    });

    it('deve retornar false se nenhum registro for encontrado', async () => {
      mockDB.deleteFromTable.mockResolvedValue({ rowCount: 0 });

      const result = await modelUser.deleteUser('tb_candidato', 'CAND-999999');

      expect(result).toBe(false);
    });
  });

  describe('getUser', () => {
    it('deve retornar todos os usuários', async () => {
      const mockResult = { rowCount: 2, rows: [{ id: '1' }, { id: '2' }] };
      mockDB.selectFromTable.mockResolvedValue(mockResult);

      const result = await modelUser.getUser('tb_candidato');

      expect(result).toEqual(mockResult);
    });
  });
});