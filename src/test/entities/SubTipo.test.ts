import { SubTipo } from '../../model/entities/class/SubTipo.js';

describe('SubTipo', () => {
  const mockData = {
    descricao: 'Deficiência motora leve',
    tipo: 'DMOTO-123456',
    created_at: new Date('2024-01-15T10:30:00Z')
  };

  test('deve criar subtipo com dados válidos', () => {
    const subtipo = new SubTipo(
      mockData.descricao,
      mockData.tipo,
      mockData.created_at
    );

    expect(subtipo.descricao).toBe(mockData.descricao);
    expect(subtipo.tipo).toBe(mockData.tipo);
    expect(subtipo.created_at).toBe(mockData.created_at);
    expect(subtipo.id).toBe('');
  });

  test('deve gerar ID com prefixo SUBT-', () => {
    const subtipo = new SubTipo(
      mockData.descricao,
      mockData.tipo,
      mockData.created_at
    );

    subtipo.setId();
    expect(subtipo.id).toMatch(/^SUBT-\d{1,4}$/);
  });

  test('deve retornar string formatada no toString', () => {
    const subtipo = new SubTipo(
      mockData.descricao,
      mockData.tipo,
      mockData.created_at
    );
    subtipo.setId();

    const resultado = subtipo.toString();
    expect(resultado).toContain('SUBTIPO:');
    expect(resultado).toContain(subtipo.id);
    expect(resultado).toContain(mockData.descricao);
    expect(resultado).toContain(mockData.created_at.toISOString());
  });

  test('deve aceitar diferentes tipos de deficiência', () => {
    const tipos = ['DMOTO-123', 'DVISU-456', 'DAUDI-789'];

    tipos.forEach(tipo => {
      const subtipo = new SubTipo(mockData.descricao, tipo, new Date());
      expect(subtipo.tipo).toBe(tipo);
    });
  });

  test('deve aceitar diferentes descrições', () => {
    const descricoes = [
      'Deficiência motora severa',
      'Baixa visão',
      'Surdez parcial',
      'Deficiência intelectual leve'
    ];

    descricoes.forEach(desc => {
      const subtipo = new SubTipo(desc, mockData.tipo, new Date());
      expect(subtipo.descricao).toBe(desc);
    });
  });

  test('deve manter data de criação', () => {
    const dataEspecifica = new Date('2023-12-25T15:45:30Z');
    const subtipo = new SubTipo(
      mockData.descricao,
      mockData.tipo,
      dataEspecifica
    );

    expect(subtipo.created_at).toEqual(dataEspecifica);
  });

  test('deve gerar IDs únicos', () => {
    const subtipo1 = new SubTipo('Desc 1', 'TIPO-1', new Date());
    const subtipo2 = new SubTipo('Desc 2', 'TIPO-2', new Date());

    subtipo1.setId();
    subtipo2.setId();

    expect(subtipo1.id).not.toBe(subtipo2.id);
  });
});