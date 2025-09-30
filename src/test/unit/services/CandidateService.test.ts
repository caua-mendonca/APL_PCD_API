import { CandidateService, CandidateData } from '../../../services/CandidateService.js';
import * as CandidateModel from '../../../model/user/candidate/candidateModel.js';
import * as JobModel from '../../../model/job/jobModel.js';

jest.mock('../../../model/user/candidate/candidateModel.js');
jest.mock('../../../model/job/jobModel.js');

const mockCandidateModel = CandidateModel as jest.Mocked<typeof CandidateModel>;
const mockJobModel = JobModel as jest.Mocked<typeof JobModel>;

describe('CandidateService', () => {
  let candidateService: CandidateService;
  
  const mockCandidateData: CandidateData = {
    name: 'João Silva',
    email: 'joao@example.com',
    confirme_email: 'joao@example.com',
    senha: 'password123',
    confirme_senha: 'password123',
    telefone: '11999999999',
    cpf: '11144477735',
    data_nascimento: new Date('1990-01-01'),
    def_motora: false,
    def_auditiva: true,
    def_visual: false,
    sub_tipo: 'SUBT-123456',
    barreira: 'BARR-123456',
    acessbilidade: 'ACES-123456'
  };

  beforeEach(() => {
    candidateService = new CandidateService();
    jest.clearAllMocks();
  });

  describe('create', () => {
    test('should create candidate successfully', async () => {
      mockCandidateModel.createCandidate.mockResolvedValue([201, 'Created']);
      
      const result = await candidateService.create(mockCandidateData);
      
      expect(result).toEqual([201, 'Created']);
      expect(mockCandidateModel.createCandidate).toHaveBeenCalledWith(mockCandidateData);
    });

    test('should handle creation error', async () => {
      mockCandidateModel.createCandidate.mockResolvedValue([400, 'Bad Request']);
      
      const result = await candidateService.create(mockCandidateData);
      
      expect(result).toEqual([400, 'Bad Request']);
    });
  });

  describe('getById', () => {
    test('should get candidate by ID successfully', async () => {
      const mockCandidate = { id: 'CAND-123456', name: 'João Silva' };
      mockCandidateModel.getUserById.mockResolvedValue([200, mockCandidate]);
      
      const result = await candidateService.getById('CAND-123456');
      
      expect(result).toEqual([200, mockCandidate]);
      expect(mockCandidateModel.getUserById).toHaveBeenCalledWith('CAND-123456');
    });
  });

  describe('getAll', () => {
    test('should get all candidates successfully', async () => {
      const mockCandidates = [{ id: 'CAND-123456', name: 'João Silva' }];
      mockCandidateModel.getUser.mockResolvedValue([200, mockCandidates]);
      
      const result = await candidateService.getAll();
      
      expect(result).toEqual([200, mockCandidates]);
      expect(mockCandidateModel.getUser).toHaveBeenCalledWith('tb_candidato');
    });
  });

  describe('update', () => {
    test('should update candidate successfully', async () => {
      const updateData = { name: 'João Santos' };
      mockCandidateModel.updateUser.mockResolvedValue([200, 'Updated']);
      
      const result = await candidateService.update('CAND-123456', updateData);
      
      expect(result).toEqual([200, 'Updated']);
      expect(mockCandidateModel.updateUser).toHaveBeenCalledWith('tb_candidato', 'CAND-123456', updateData);
    });
  });

  describe('delete', () => {
    test('should delete candidate successfully', async () => {
      mockCandidateModel.deleteUser.mockResolvedValue([200, 'Deleted']);
      
      const result = await candidateService.delete('CAND-123456');
      
      expect(result).toEqual([200, 'Deleted']);
      expect(mockCandidateModel.deleteUser).toHaveBeenCalledWith('tb_candidato', 'CAND-123456');
    });
  });

  describe('getByName', () => {
    test('should get candidate by name successfully', async () => {
      const mockCandidate = { id: 'CAND-123456', name: 'João Silva' };
      mockCandidateModel.getUserByName.mockResolvedValue([200, mockCandidate]);
      
      const result = await candidateService.getByName('João Silva');
      
      expect(result).toEqual([200, mockCandidate]);
      expect(mockCandidateModel.getUserByName).toHaveBeenCalledWith('tb_candidato', 'João Silva');
    });
  });

  describe('applyToJob', () => {
    test('should apply to job successfully', async () => {
      mockJobModel.registerCandidateToVaga.mockResolvedValue([200, 'Applied']);
      
      const result = await candidateService.applyToJob('CAND-123456', 'VAGA-789012');
      
      expect(result).toEqual([200, 'Applied']);
      expect(mockJobModel.registerCandidateToVaga).toHaveBeenCalledWith('CAND-123456', 'VAGA-789012');
    });
  });
});