import { Candidate } from '../../model/entities/class/candidate.js';
import { Colaborador } from '../../model/entities/class/colaborador.js';
import { Contratante } from '../../model/entities/class/contratante.js';
import { Event } from '../../model/entities/class/event.js';
import { Calendar } from '../../model/entities/class/calendar.js';
import { Vaga } from '../../model/entities/class/Vaga.js';
import { IFBR } from '../../model/entities/class/ifbr.js';
import { QuestIFBR } from '../../model/entities/class/questIFBR.js';
import * as modelCalendar from '../../model/calendar/modelCalendar.js';

describe('Model Layer Tests', () => {
  describe('Entities', () => {
    describe('Candidate', () => {
      it('deve criar candidato com dados corretos', async () => {
        const candidate = new Candidate(
          'João Silva',
          'joao@email.com',
          'joao@email.com',
          '123456',
          '123456',
          '11999999999',
          '12345678901',
          new Date('1990-01-01'),
          false, true, false, false, false,
          '', true, 'Cadeirante'
        );

        await candidate.setId();

        expect(candidate.name).toBe('João Silva');
        expect(candidate.email).toBe('joao@email.com');
        expect(candidate.id).toMatch(/^CAND-\d+$/);
        expect(candidate.status).toBe(true);
      });
    });

    describe('Colaborador', () => {
      it('deve criar colaborador com dados corretos', async () => {
        const colaborador = new Colaborador('Maria Santos', 'maria@empresa.com', '123456', 'TI');

        await colaborador.setId();

        expect(colaborador.name).toBe('Maria Santos');
        expect(colaborador.setor).toBe('TI');
        expect(colaborador.id).toMatch(/^COLAB-\d+$/);
      });
    });

    describe('Contratante', () => {
      it('deve criar contratante com dados corretos', async () => {
        const contratante = new Contratante(
          'Tech Corp',
          'Tech Corp LTDA',
          'contato@tech.com',
          'contato@tech.com',
          '123456',
          '123456',
          '12345678000195',
          '1133334444',
          'Rampa de acesso'
        );

        await contratante.setId();

        expect(contratante.nome_fantasia).toBe('Tech Corp');
        expect(contratante.razao_social).toBe('Tech Corp LTDA');
        expect(contratante.id).toMatch(/^EMP-\d+$/);
        expect(contratante.status).toBe(true);
      });
    });

    describe('Event', () => {
      it('deve criar evento com dados corretos', () => {
        const event = new Event(
          'Reunião',
          'Reunião de equipe',
          new Date('2024-01-15'),
          '09:00',
          '10:00',
          'CAND-123456'
        );

        event.setId();

        expect(event.titulo).toBe('Reunião');
        expect(event.descricao).toBe('Reunião de equipe');
        expect(event.id).toMatch(/^EVENT-\d+$/);
        expect(event.id_candidato).toBe('CAND-123456');
      });
    });

    describe('Calendar', () => {
      it('deve criar calendário com dados corretos', () => {
        const calendar = new Calendar('Calendário da Empresa');

        calendar.setId();

        expect(calendar.nome).toBe('Calendário da Empresa');
        expect(calendar.id).toMatch(/^CALENDAR-\d+$/);
        expect(calendar.eventos).toEqual([]);
      });

      it('deve definir eventos no calendário', () => {
        const calendar = new Calendar('Calendário');
        const event = new Event('Reunião', 'Desc', new Date(), '09:00', '10:00', 'CAND-123');
        
        calendar.setEvents([event]);

        expect(calendar.eventos).toHaveLength(1);
        expect(calendar.eventos[0]).toBe(event);
      });
    });

    describe('Vaga', () => {
      it('deve criar vaga com dados corretos', () => {
        const vaga = new Vaga(
          new Date('2024-12-31'),
          'Desenvolvedor',
          'Vaga para desenvolvedor React',
          5000,
          'São Paulo',
          'Rampa de acesso'
        );

        vaga.setId('EMP-123456');

        expect(vaga.titulo).toBe('Desenvolvedor');
        expect(vaga.salario).toBe(5000);
        expect(vaga.id).toMatch(/^VAGA-\d+$/);
        expect(vaga.status).toBe(true);
        expect(vaga.data_inicio).toBeInstanceOf(Date);
      });
    });

    describe('IFBR', () => {
      it('deve criar IFBR com dados corretos', () => {
        const ifbr = new IFBR(1, 'Questão 1', new Date(), 5);

        expect(ifbr.id).toBe(1);
        expect(ifbr.name).toBe('Questão 1');
        expect(ifbr.score).toBe(5);
        expect(ifbr.idTable).toBe('');
      });
    });

    describe('QuestIFBR', () => {
      it('deve criar questão IFBR com dados corretos', () => {
        const quest = new QuestIFBR(1, 'Questão sobre comunicação', 4);

        expect(quest.id).toBe(1);
        expect(quest.name).toBe('Questão sobre comunicação');
        expect(quest.score).toBe(4);
      });

      it('deve retornar string formatada', () => {
        const quest = new QuestIFBR(2, 'Questão teste', 3);

        expect(quest.toString()).toBe('Quest 2 - Questão teste - 3 points');
      });
    });
  });

  describe('Calendar Model', () => {
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
          { nome: 'Evento sem data', descricao: 'Desc', data_evento: '', hora_ini: '', hora_fim: '' }
        ];

        const result = modelCalendar.getCalendario(1, 2024, invalidEvents);

        expect(result).toContain('📅 Calendário de janeiro / 2024');
      });
    });
  });
});