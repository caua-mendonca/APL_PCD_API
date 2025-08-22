import * as modelEvent from '../../../model/event/modelEvent.js';
import * as DB from '../../../repositories/queryTools.js';
import * as Validation from '../../../validation/validateId/validateId.js';

jest.mock('../../../repositories/queryTools.js');
jest.mock('../../../validation/validateId/validateId.js');

const mockDB = DB as jest.Mocked<typeof DB>;
const mockValidation = Validation as jest.Mocked<typeof Validation>;

describe('ModelEvent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createEvento', () => {
    const mockEvento = {
      titulo: 'Reunião de Equipe',
      descricao: 'Reunião semanal da equipe',
      data: new Date('2024-01-15'),
      hora_inicio: '09:00',
      hora_fim: '10:00',
      id_candidato: 'CAND-123456'
    };

    it('deve criar evento com sucesso', async () => {
      mockValidation.validateId.mockResolvedValue(true);
      mockDB.insertIntoEventos.mockResolvedValue('success');

      const result = await modelEvent.createEvento(mockEvento, 'CALENDAR-123456');

      expect(result).toBe('success');
      expect(mockDB.insertIntoEventos).toHaveBeenCalled();
    });

    it('deve falhar com formato de hora inválido', async () => {
      const eventoInvalido = {
        ...mockEvento,
        hora_inicio: '9:00:00:00',
        hora_fim: '10'
      };

      await expect(modelEvent.createEvento(eventoInvalido, 'CALENDAR-123456'))
        .rejects.toThrow('Formato de hora inválido. Use HH:mm.');
    });

    it('deve falhar quando hora início maior que hora fim', async () => {
      const eventoInvalido = {
        ...mockEvento,
        hora_inicio: '15:00',
        hora_fim: '14:00'
      };

      await expect(modelEvent.createEvento(eventoInvalido, 'CALENDAR-123456'))
        .rejects.toThrow('A hora de início não pode ser maior que a hora de fim.');
    });

    it('deve falhar com candidato inválido', async () => {
      mockValidation.validateId.mockResolvedValue(false);

      await expect(modelEvent.createEvento(mockEvento, 'CALENDAR-123456'))
        .rejects.toThrow('ID do candidato inválido.');
    });

    it('deve falhar se inserção no banco falhar', async () => {
      mockValidation.validateId.mockResolvedValue(true);
      mockDB.insertIntoEventos.mockResolvedValue('');

      await expect(modelEvent.createEvento(mockEvento, 'CALENDAR-123456'))
        .rejects.toThrow('Falha ao inserir evento');
    });
  });

  describe('getEvento', () => {
    it('deve retornar eventos do calendário', async () => {
      const mockEventos = [
        { id: 'EVENT-123456', titulo: 'Reunião' },
        { id: 'EVENT-789012', titulo: 'Entrevista' }
      ];
      mockDB.getEventosByCalendario.mockResolvedValue(mockEventos);

      const result = await modelEvent.getEvento('CALENDAR-123456');

      expect(result).toEqual(mockEventos);
      expect(mockDB.getEventosByCalendario).toHaveBeenCalledWith('CALENDAR-123456');
    });
  });

  describe('deleteEvento', () => {
    it('deve deletar evento com sucesso', async () => {
      mockValidation.validateId.mockReturnValue(true);
      mockDB.deleteFromTable.mockResolvedValue({ rowCount: 1 });

      const result = await modelEvent.deleteEvento('EVENT-123456');

      expect(result.rowCount).toBe(1);
      expect(mockDB.deleteFromTable).toHaveBeenCalledWith('tb_evento', 'EVENT-123456');
    });

    it('deve falhar com ID inválido', async () => {
      mockValidation.validateId.mockReturnValue(false);

      await expect(modelEvent.deleteEvento('ID-INVALIDO'))
        .rejects.toThrow('ID inválido');
    });

    it('deve falhar se nenhum evento for encontrado', async () => {
      mockValidation.validateId.mockReturnValue(true);
      mockDB.deleteFromTable.mockResolvedValue({ rowCount: 0 });

      await expect(modelEvent.deleteEvento('EVENT-999999'))
        .rejects.toThrow('Falha ao deletar evento');
    });
  });
});