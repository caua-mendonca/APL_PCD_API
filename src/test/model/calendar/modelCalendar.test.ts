import * as modelCalendar from '../../../model/calendar/modelCalendar.js';
import * as DB from '../../../repositories/queryTools.js';
import * as Validations from '../../../validation/validateId/validateId.js';

jest.mock('../../../repositories/queryTools.js');
jest.mock('../../../validation/validateId/validateId.js');

const mockDB = DB as jest.Mocked<typeof DB>;
const mockValidations = Validations as jest.Mocked<typeof Validations>;

describe('ModelCalendar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createCalendario', () => {
    it('deve criar calendário com sucesso', async () => {
      mockValidations.validateId.mockReturnValue(true);
      mockDB.insertCalendario.mockResolvedValue('success');

      const result = await modelCalendar.createCalendario('EMP-123456');

      expect(result).toBe('success');
      expect(mockDB.insertCalendario).toHaveBeenCalled();
    });

    it('deve falhar com ID inválido', async () => {
      mockValidations.validateId.mockReturnValue(false);

      await expect(modelCalendar.createCalendario('ID-INVALIDO'))
        .rejects.toThrow('ID inválido');
    });

    it('deve falhar se inserção no banco falhar', async () => {
      mockValidations.validateId.mockReturnValue(true);
      mockDB.insertCalendario.mockResolvedValue(null);

      await expect(modelCalendar.createCalendario('EMP-123456'))
        .rejects.toThrow('Erro ao criar calendário');
    });
  });

  describe('getCalendario', () => {
    const mockEvents = [
      {
        nome: 'Reunião',
        descricao: 'Reunião de equipe',
        data_evento: '2024-01-15',
        hora_ini: '09:00',
        hora_fim: '10:00'
      },
      {
        nome: 'Entrevista',
        descricao: 'Entrevista candidato',
        data_evento: '2024-01-20',
        hora_ini: '14:00',
        hora_fim: '15:00'
      }
    ];

    it('deve gerar calendário para janeiro 2024', () => {
      const result = modelCalendar.getCalendario(1, 2024, mockEvents);

      expect(result).toContain('📅 Calendário de janeiro / 2024');
      expect(result).toContain('Reunião - Reunião de equipe');
      expect(result).toContain('Entrevista - Entrevista candidato');
    });

    it('deve marcar dias com eventos', () => {
      const eventsWithDate = [
        {
          nome: 'Evento',
          descricao: 'Descrição',
          date: new Date('2024-01-15'),
          hora_ini: '09:00',
          hora_fim: '10:00'
        }
      ];

      const result = modelCalendar.getCalendario(1, 2024, eventsWithDate);

      expect(result).toContain('*');
    });

    it('deve falhar com mês inválido', () => {
      expect(() => modelCalendar.getCalendario(13, 2024, []))
        .toThrow('Mês inválido. Informe o número do mês corretamente.');
    });

    it('deve lidar com eventos sem data válida', () => {
      const invalidEvents = [
        { nome: 'Evento sem data' },
        null,
        undefined
      ];

      const result = modelCalendar.getCalendario(1, 2024, invalidEvents);

      expect(result).toContain('📅 Calendário de janeiro / 2024');
    });
  });
});