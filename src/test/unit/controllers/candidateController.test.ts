import { createCandidateController, getCandidatesController, getCandidateByNameController } from '../../../controller/user/candidateController.js';
import { CandidateService } from '../../../services/CandidateService.js';
import { container } from '../../../container/DIContainer.js';

jest.mock('../../../services/CandidateService.js');
jest.mock('../../../container/DIContainer.js');

const mockCandidateService = {
  create: jest.fn(),
  getAll: jest.fn(),
  getByName: jest.fn(),
  applyToJob: jest.fn()
};

const mockContainer = container as jest.Mocked<typeof container>;

describe('Candidate Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockContainer.resolve.mockReturnValue(mockCandidateService);
  });

  describe('createCandidateController', () => {
    const mockRequestBody = {
      name: 'João Silva',
      email: 'joao@example.com',
      confirm_email: 'joao@example.com',
      password: 'password123',
      confirm_password: 'password123',
      phone: '11999999999',
      cpf: '11144477735',
      birth_date: new Date('1990-01-01'),
      motor_disability: false,
      hearing_disability: true,
      visual_disability: false,
      sub_type: 'SUBT-123456',
      barrier: 'BARR-123456',
      accessibility: 'ACES-123456'
    };

    test('should create candidate successfully', async () => {
      mockCandidateService.create.mockResolvedValue([201, 'Created']);

      const result = await createCandidateController(mockRequestBody);

      expect(result).toEqual([201, 'Created']);
      expect(mockCandidateService.create).toHaveBeenCalledWith({
        name: mockRequestBody.name,
        email: mockRequestBody.email,
        confirme_email: mockRequestBody.confirm_email,
        senha: mockRequestBody.password,
        confirme_senha: mockRequestBody.confirm_password,
        telefone: mockRequestBody.phone,
        cpf: mockRequestBody.cpf,
        data_nascimento: mockRequestBody.birth_date,
        def_motora: mockRequestBody.motor_disability,
        def_auditiva: mockRequestBody.hearing_disability,
        def_visual: mockRequestBody.visual_disability,
        sub_tipo: mockRequestBody.sub_type,
        barreira: mockRequestBody.barrier,
        acessbilidade: mockRequestBody.accessibility
      });
    });

    test('should handle service error', async () => {
      mockCandidateService.create.mockRejectedValue(new Error('Service error'));

      const result = await createCandidateController(mockRequestBody);

      expect(result).toEqual([400, 'Error: Service error']);
    });
  });

  describe('getCandidatesController', () => {
    test('should get all candidates successfully', async () => {
      const mockCandidates = [{ id: 'CAND-123456', name: 'João Silva' }];
      mockCandidateService.getAll.mockResolvedValue([200, mockCandidates]);

      const result = await getCandidatesController();

      expect(result).toEqual([200, mockCandidates]);
      expect(mockCandidateService.getAll).toHaveBeenCalled();
    });

    test('should handle service error', async () => {
      mockCandidateService.getAll.mockRejectedValue(new Error('Service error'));

      const result = await getCandidatesController();

      expect(result).toEqual([400, 'Error: Service error']);
    });
  });

  describe('getCandidateByNameController', () => {
    test('should get candidate by name successfully', async () => {
      const mockCandidate = { id: 'CAND-123456', name: 'João Silva' };
      mockCandidateService.getByName.mockResolvedValue([200, mockCandidate]);

      const result = await getCandidateByNameController('João Silva');

      expect(result).toEqual([200, mockCandidate]);
      expect(mockCandidateService.getByName).toHaveBeenCalledWith('João Silva');
    });

    test('should handle service error', async () => {
      mockCandidateService.getByName.mockRejectedValue(new Error('Service error'));

      const result = await getCandidateByNameController('João Silva');

      expect(result).toEqual([400, 'Error: Service error']);
    });
  });
});