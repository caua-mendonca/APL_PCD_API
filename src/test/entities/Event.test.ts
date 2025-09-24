import { Event } from '../../model/entities/class/Event.js';

describe('Event', () => {
  const mockEventData = {
    titulo: 'Entrevista Técnica',
    descricao: 'Entrevista técnica para vaga de desenvolvedor',
    data: new Date('2024-12-15'),
    hora_inicio: '14:00',
    hora_fim: '15:30',
    id_candidato: 'CAND-123456'
  };

  test('deve criar evento com dados válidos', () => {
    const event = new Event(
      mockEventData.titulo,
      mockEventData.descricao,
      mockEventData.data,
      mockEventData.hora_inicio,
      mockEventData.hora_fim,
      mockEventData.id_candidato
    );

    expect(event.titulo).toBe(mockEventData.titulo);
    expect(event.descricao).toBe(mockEventData.descricao);
    expect(event.data).toBe(mockEventData.data);
    expect(event.hora_inicio).toBe(mockEventData.hora_inicio);
    expect(event.hora_fim).toBe(mockEventData.hora_fim);
    expect(event.id_candidato).toBe(mockEventData.id_candidato);
  });

  test('deve inicializar com ID vazio', () => {
    const event = new Event(
      mockEventData.titulo,
      mockEventData.descricao,
      mockEventData.data,
      mockEventData.hora_inicio,
      mockEventData.hora_fim,
      mockEventData.id_candidato
    );

    expect(event.id).toBe('');
  });

  test('deve gerar ID com prefixo EVENT-', () => {
    const event = new Event(
      mockEventData.titulo,
      mockEventData.descricao,
      mockEventData.data,
      mockEventData.hora_inicio,
      mockEventData.hora_fim,
      mockEventData.id_candidato
    );

    event.setId();
    expect(event.id).toMatch(/^EVENT-\d{1,6}$/);
  });

  test('deve aceitar diferentes formatos de hora', () => {
    const formatosHora = ['09:00', '14:30', '18:45', '23:59'];
    
    formatosHora.forEach(hora => {
      const event = new Event(
        mockEventData.titulo,
        mockEventData.descricao,
        mockEventData.data,
        hora,
        hora,
        mockEventData.id_candidato
      );
      expect(event.hora_inicio).toBe(hora);
      expect(event.hora_fim).toBe(hora);
    });
  });

  test('deve manter data fornecida', () => {
    const dataEspecifica = new Date('2025-03-20');
    const event = new Event(
      mockEventData.titulo,
      mockEventData.descricao,
      dataEspecifica,
      mockEventData.hora_inicio,
      mockEventData.hora_fim,
      mockEventData.id_candidato
    );

    expect(event.data).toEqual(dataEspecifica);
  });

  test('deve associar candidato corretamente', () => {
    const idCandidato = 'CAND-789012';
    const event = new Event(
      mockEventData.titulo,
      mockEventData.descricao,
      mockEventData.data,
      mockEventData.hora_inicio,
      mockEventData.hora_fim,
      idCandidato
    );

    expect(event.id_candidato).toBe(idCandidato);
  });
});