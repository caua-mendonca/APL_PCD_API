import { Acessibilidade } from '../../model/entities/class/Acessibilidade.js';

describe('Acessibilidade', () => {
  const mockData = {
    descricao: 'Rampa de acesso para cadeirantes',
    created_at: new Date('2024-01-15T10:30:00Z')
  };

  test('deve criar acessibilidade com dados válidos', () => {
    const acessibilidade = new Acessibilidade(
      mockData.descricao,
      mockData.created_at
    );

    expect(acessibilidade.descricao).toBe(mockData.descricao);
    expect(acessibilidade.created_at).toBe(mockData.created_at);
    expect(acessibilidade.id).toBe('');
  });

  test('deve gerar ID com prefixo ACES-', () => {
    const acessibilidade = new Acessibilidade(
      mockData.descricao,
      mockData.created_at
    );

    acessibilidade.setId();
    expect(acessibilidade.id).toMatch(/^ACES-\d{1,4}$/);
  });

  test('deve retornar string formatada no toString', () => {
    const acessibilidade = new Acessibilidade(
      mockData.descricao,
      mockData.created_at
    );
    acessibilidade.setId();

    const resultado = acessibilidade.toString();
    expect(resultado).toContain('ACESSIBILIDADE:');
    expect(resultado).toContain(acessibilidade.id);
    expect(resultado).toContain(mockData.descricao);
    expect(resultado).toContain(mockData.created_at.toISOString());
  });

  test('deve aceitar diferentes descrições', () => {
    const descricoes = [
      'Elevador adaptado',
      'Banheiro acessível',
      'Sinalização em braile',
      'Intérprete de libras'
    ];

    descricoes.forEach(desc => {
      const acessibilidade = new Acessibilidade(desc, new Date());
      expect(acessibilidade.descricao).toBe(desc);
    });
  });

  test('deve manter data de criação', () => {
    const dataEspecifica = new Date('2023-12-25T15:45:30Z');
    const acessibilidade = new Acessibilidade(
      mockData.descricao,
      dataEspecifica
    );

    expect(acessibilidade.created_at).toEqual(dataEspecifica);
  });

  test('deve gerar IDs únicos', () => {
    const acessibilidade1 = new Acessibilidade('Desc 1', new Date());
    const acessibilidade2 = new Acessibilidade('Desc 2', new Date());

    acessibilidade1.setId();
    acessibilidade2.setId();

    expect(acessibilidade1.id).not.toBe(acessibilidade2.id);
  });
});