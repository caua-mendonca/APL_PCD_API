import { validateAge } from '../../../validation/validateData/validateAge.js';

describe('Validação de Idade', () => {
  test('deve aceitar idade válida (18+ anos)', () => {
    const dataValida = new Date();
    dataValida.setFullYear(dataValida.getFullYear() - 20);
    expect(validateAge(dataValida)).toBe(true);
  });

  test('deve aceitar exatamente 18 anos', () => {
    const data18Anos = new Date();
    data18Anos.setFullYear(data18Anos.getFullYear() - 18);
    expect(validateAge(data18Anos)).toBe(true);
  });

  test('deve rejeitar menor de 18 anos', () => {
    const dataMenor = new Date();
    dataMenor.setFullYear(dataMenor.getFullYear() - 17);
    expect(validateAge(dataMenor)).toBe(false);
  });

  test('deve rejeitar data futura', () => {
    const dataFutura = new Date();
    dataFutura.setFullYear(dataFutura.getFullYear() + 1);
    expect(validateAge(dataFutura)).toBe(false);
  });

  test('deve aceitar pessoa idosa', () => {
    const dataIdosa = new Date();
    dataIdosa.setFullYear(dataIdosa.getFullYear() - 70);
    expect(validateAge(dataIdosa)).toBe(true);
  });
});