import { Barreira } from '../../model/entities/class/Barreira.js';

describe('Barreira', () => {
  const mockData = {
    descricao: 'Escadas sem corrimão',
    created_at: new Date('2024-01-15T10:30:00Z')
  };

  test('deve criar barreira com dados válidos', () => {
    const barreira = new Barreira(
      mockData.descricao,
      mockData.created_at
    );

    expect(barreira.descricao).toBe(mockData.descricao);
    expect(barreira.created_at).toBe(mockData.created_at);
    expect(barreira.id).toBe('');
  });

  test('deve gerar ID com prefixo BARR-', () => {
    const barreira = new Barreira(
      mockData.descricao,
      mockData.created_at
    );

    barreira.setId();
    expect(barreira.id).toMatch(/^BARR-\d{1,4}$/);
  });

  test('deve retornar string formatada no toString', () => {
    const barreira = new Barreira(
      mockData.descricao,
      mockData.created_at
    );
    barreira.setId();

    const resultado = barreira.toString();
    expect(resultado).toContain('BARREIRA:');
    expect(resultado).toContain(barreira.id);
    expect(resultado).toContain(mockData.descricao);
    expect(resultado).toContain(mockData.created_at.toISOString());
  });

  test('deve aceitar diferentes descrições', () => {
    const descricoes = [
      'Porta estreita',
      'Ausência de rampa',
      'Iluminação inadequada',
      'Piso irregular'
    ];

    descricoes.forEach(desc => {
      const barreira = new Barreira(desc, new Date());
      expect(barreira.descricao).toBe(desc);
    });
  });

  test('deve manter data de criação', () => {
    const dataEspecifica = new Date('2023-12-25T15:45:30Z');
    const barreira = new Barreira(
      mockData.descricao,
      dataEspecifica
    );

    expect(barreira.created_at).toEqual(dataEspecifica);
  });

  test('deve gerar IDs únicos', () => {
    const barreira1 = new Barreira('Desc 1', new Date());
    const barreira2 = new Barreira('Desc 2', new Date());

    barreira1.setId();
    barreira2.setId();

    expect(barreira1.id).not.toBe(barreira2.id);
  });
});