import { Vaga } from '../../model/entities/class/Vaga.js';

describe('Vaga', () => {
  const mockVagaData = {
    data_fim: new Date('2024-12-31'),
    titulo: 'Desenvolvedor Frontend',
    descricao: 'Vaga para desenvolvedor frontend com experiência em React',
    salario: 5000,
    localidade: 'São Paulo, SP',
    acessibilidade: 'Ambiente acessível para cadeirantes',
    tipo: 'CLT'
  };

  test('deve criar vaga com dados válidos', () => {
    const vaga = new Vaga(
      mockVagaData.data_fim,
      mockVagaData.titulo,
      mockVagaData.descricao,
      mockVagaData.salario,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );

    expect(vaga.titulo).toBe(mockVagaData.titulo);
    expect(vaga.descricao).toBe(mockVagaData.descricao);
    expect(vaga.salario).toBe(mockVagaData.salario);
    expect(vaga.localidade).toBe(mockVagaData.localidade);
    expect(vaga.tipo).toBe(mockVagaData.tipo);
  });

  test('deve inicializar com status ativo', () => {
    const vaga = new Vaga(
      mockVagaData.data_fim,
      mockVagaData.titulo,
      mockVagaData.descricao,
      mockVagaData.salario,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );

    expect(vaga.status).toBe(true);
  });

  test('deve definir data_inicio como data atual', () => {
    const antes = new Date();
    const vaga = new Vaga(
      mockVagaData.data_fim,
      mockVagaData.titulo,
      mockVagaData.descricao,
      mockVagaData.salario,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );
    const depois = new Date();

    expect(vaga.data_inicio.getTime()).toBeGreaterThanOrEqual(antes.getTime());
    expect(vaga.data_inicio.getTime()).toBeLessThanOrEqual(depois.getTime());
  });

  test('deve gerar ID com prefixo VAGA-', () => {
    const vaga = new Vaga(
      mockVagaData.data_fim,
      mockVagaData.titulo,
      mockVagaData.descricao,
      mockVagaData.salario,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );

    vaga.setId('');
    expect(vaga.id).toMatch(/^VAGA-\d{1,6}$/);
  });

  test('deve aceitar salário numérico', () => {
    const vaga = new Vaga(
      mockVagaData.data_fim,
      mockVagaData.titulo,
      mockVagaData.descricao,
      7500.50,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );

    expect(vaga.salario).toBe(7500.50);
    expect(typeof vaga.salario).toBe('number');
  });

  test('deve manter data_fim fornecida', () => {
    const dataEspecifica = new Date('2025-06-15');
    const vaga = new Vaga(
      dataEspecifica,
      mockVagaData.titulo,
      mockVagaData.descricao,
      mockVagaData.salario,
      mockVagaData.localidade,
      mockVagaData.acessibilidade,
      mockVagaData.tipo
    );

    expect(vaga.data_fim).toEqual(dataEspecifica);
  });
});