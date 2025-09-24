import { Calendar } from '../../model/entities/class/Calendar.js';
import { Event } from '../../model/entities/class/Event.js';

describe('Calendar', () => {
  test('deve criar calendário com nome válido', () => {
    const nomeCalendario = 'Calendário de Entrevistas';
    const calendar = new Calendar(nomeCalendario);

    expect(calendar.nome).toBe(nomeCalendario);
    expect(calendar.id).toBe('');
    expect(calendar.eventos).toEqual([]);
  });

  test('deve gerar ID com prefixo CALENDAR-', () => {
    const calendar = new Calendar('Teste');
    calendar.setId();
    
    expect(calendar.id).toMatch(/^CALENDAR-\d{1,6}$/);
  });

  test('deve inicializar com lista de eventos vazia', () => {
    const calendar = new Calendar('Calendário Vazio');
    
    expect(calendar.eventos).toEqual([]);
    expect(calendar.eventos.length).toBe(0);
  });

  test('deve definir eventos corretamente', () => {
    const calendar = new Calendar('Calendário com Eventos');
    
    const evento1 = new Event(
      'Evento 1',
      'Descrição 1',
      new Date('2024-12-15'),
      '09:00',
      '10:00',
      'CAND-123456'
    );
    
    const evento2 = new Event(
      'Evento 2',
      'Descrição 2',
      new Date('2024-12-16'),
      '14:00',
      '15:00',
      'CAND-789012'
    );

    const eventos = [evento1, evento2];
    calendar.setEvents(eventos);

    expect(calendar.eventos).toEqual(eventos);
    expect(calendar.eventos.length).toBe(2);
  });

  test('deve substituir eventos existentes ao definir novos', () => {
    const calendar = new Calendar('Calendário Substituição');
    
    const eventosIniciais = [
      new Event('Inicial', 'Desc', new Date(), '09:00', '10:00', 'CAND-111')
    ];
    
    const eventosNovos = [
      new Event('Novo 1', 'Desc 1', new Date(), '11:00', '12:00', 'CAND-222'),
      new Event('Novo 2', 'Desc 2', new Date(), '13:00', '14:00', 'CAND-333')
    ];

    calendar.setEvents(eventosIniciais);
    expect(calendar.eventos.length).toBe(1);

    calendar.setEvents(eventosNovos);
    expect(calendar.eventos.length).toBe(2);
    expect(calendar.eventos).toEqual(eventosNovos);
  });

  test('deve aceitar lista vazia de eventos', () => {
    const calendar = new Calendar('Calendário Limpo');
    calendar.setEvents([]);

    expect(calendar.eventos).toEqual([]);
    expect(calendar.eventos.length).toBe(0);
  });

  test('deve manter nome após operações', () => {
    const nomeOriginal = 'Calendário Persistente';
    const calendar = new Calendar(nomeOriginal);
    
    calendar.setId();
    calendar.setEvents([]);
    
    expect(calendar.nome).toBe(nomeOriginal);
  });
});