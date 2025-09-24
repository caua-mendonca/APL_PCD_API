import { validateAge } from '../../validation/validateData/validateAge.js';

describe('validateAge', () => {
  test('deve validar pessoa maior de 18 anos', () => {
    const dataAntigaValida = new Date('1990-01-01');
    expect(validateAge(dataAntigaValida)).toBe(true);
  });

  test('deve rejeitar pessoa menor de 18 anos', () => {
    const hoje = new Date();
    const dataMenor = new Date(hoje.getFullYear() - 17, hoje.getMonth(), hoje.getDate());
    expect(validateAge(dataMenor)).toBe(false);
  });

  test('deve validar pessoa com exatamente 18 anos', () => {
    const hoje = new Date();
    const data18Anos = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    expect(validateAge(data18Anos)).toBe(true);
  });

  test('deve considerar aniversário ainda não ocorrido no ano', () => {
    const hoje = new Date();
    const proximoMes = new Date(hoje.getFullYear() - 18, hoje.getMonth() + 1, hoje.getDate());
    expect(validateAge(proximoMes)).toBe(false);
  });

  test('deve considerar aniversário já ocorrido no ano', () => {
    const hoje = new Date();
    const mesPassado = new Date(hoje.getFullYear() - 18, hoje.getMonth() - 1, hoje.getDate());
    expect(validateAge(mesPassado)).toBe(true);
  });
});