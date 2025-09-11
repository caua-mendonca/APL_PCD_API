import * as modelVaga from '../../../model/vaga/modelVaga.js';
import * as DB from '../../../repositories/queryTools.js';
import * as validateData from '../../../validation/validateData/validateDataVaga.js';
import * as validateId from '../../../validation/validateId/validateId.js';
jest.mock('../../../repositories/queryTools.js');
jest.mock('../../../validation/validateData/validateDataVaga.js');
jest.mock('../../../validation/validateId/validateId.js');
const mockDB = DB;
const mockValidateData = validateData;
const mockValidateId = validateId;
describe('ModelVaga', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('getVagaModel', () => {
        it('deve retornar vagas quando existirem', async () => {
            const mockVagas = [
                { id: 'VAGA-123456', titulo: 'Desenvolvedor' },
                { id: 'VAGA-789012', titulo: 'Analista' }
            ];
            mockDB.selectFromTable.mockResolvedValue({ rows: mockVagas });
            const result = await modelVaga.getVagaModel();
            expect(result).toEqual(mockVagas);
            expect(mockDB.selectFromTable).toHaveBeenCalledWith('tb_vaga');
        });
        it('deve retornar undefined quando não houver vagas', async () => {
            mockDB.selectFromTable.mockResolvedValue({ rows: [] });
            const result = await modelVaga.getVagaModel();
            expect(result).toBeUndefined();
        });
    });
    describe('getVagaById', () => {
        it('deve retornar vaga por ID', async () => {
            const mockVaga = [{ id: 'VAGA-123456', titulo: 'Desenvolvedor' }];
            mockDB.selectFromIdWhere.mockResolvedValue({ rows: mockVaga });
            const result = await modelVaga.getVagaById('VAGA-123456');
            expect(result).toEqual(mockVaga);
            expect(mockDB.selectFromIdWhere).toHaveBeenCalledWith('tb_vaga', 'VAGA-123456');
        });
    });
    describe('deleteVaga', () => {
        it('deve deletar vaga com sucesso', async () => {
            const mockResult = [{ id: 'VAGA-123456' }];
            mockDB.deleteFromTable.mockResolvedValue({ rows: mockResult });
            const result = await modelVaga.deleteVaga('VAGA-123456');
            expect(result).toEqual(mockResult);
            expect(mockDB.deleteFromTable).toHaveBeenCalledWith('tb_vaga', 'VAGA-123456');
        });
    });
    describe('createVaga', () => {
        const mockVaga = {
            data_fim: new Date('2024-12-31'),
            titulo: 'Desenvolvedor Frontend',
            descricao: 'Vaga para desenvolvedor React',
            salario: 5000,
            localidade: 'São Paulo',
            acessibilidade: 'Rampa de acesso'
        };
        it('deve criar vaga com sucesso para empresa', async () => {
            mockValidateData.validateDate.mockReturnValue(true);
            mockDB.insertVaga.mockResolvedValue(true);
            mockDB.insertEmpVaga.mockResolvedValue(undefined);
            const result = await modelVaga.createVaga(mockVaga, 'EMP-123456');
            expect(result).toBe(true);
            expect(mockDB.insertVaga).toHaveBeenCalled();
            expect(mockDB.insertEmpVaga).toHaveBeenCalled();
        });
        it('deve criar vaga com sucesso para colaborador', async () => {
            mockValidateData.validateDate.mockReturnValue(true);
            mockDB.insertVaga.mockResolvedValue(true);
            mockDB.getEmpByColab.mockResolvedValue('EMP-123456');
            mockDB.insertEmpVaga.mockResolvedValue(undefined);
            const result = await modelVaga.createVaga(mockVaga, 'COLAB-123456');
            expect(result).toBe(true);
            expect(mockDB.getEmpByColab).toHaveBeenCalledWith('COLAB-123456');
        });
        it('deve falhar com data inválida', async () => {
            mockValidateData.validateDate.mockReturnValue(false);
            const result = await modelVaga.createVaga(mockVaga, 'EMP-123456');
            expect(result).toBe(false);
        });
    });
    describe('registerCandidateToVaga', () => {
        it('deve inscrever candidato na vaga com sucesso', async () => {
            mockValidateId.validateIdByRelation.mockResolvedValue(true);
            mockDB.insertCandidateVaga.mockResolvedValue(true);
            const result = await modelVaga.registerCandidateToVaga('CAND-123456', 'VAGA-789012');
            expect(result).toBe(true);
            expect(mockDB.insertCandidateVaga).toHaveBeenCalledWith('CAND-123456', 'VAGA-789012');
        });
        it('deve falhar com candidato inválido', async () => {
            mockValidateId.validateIdByRelation.mockResolvedValue(false);
            await expect(modelVaga.registerCandidateToVaga('CAND-999999', 'VAGA-789012'))
                .rejects.toThrow('Candidato inválido');
        });
    });
});
