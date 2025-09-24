import { validateTel } from '../../validation/validateData/validateTel.js';

describe('validateTel', () => {
  test('deve remover traços do telefone', () => {
    expect(validateTel('11-99999-9999')).toBe(11999999999);
    expect(validateTel('21-88888-8888')).toBe(21888888888);
  });

  test('deve remover parênteses do telefone', () => {
    expect(validateTel('(11)99999-9999')).toBe(11999999999);
    expect(validateTel('(21)88888-8888')).toBe(21888888888);
  });

  test('deve remover todos os caracteres especiais', () => {
    expect(validateTel('(11)-99999-9999')).toBe(11999999999);
    expect(validateTel('(21)88888-8888')).toBe(21888888888);
  });

  test('deve processar telefone sem formatação', () => {
    expect(validateTel('11999999999')).toBe(11999999999);
    expect(validateTel('21888888888')).toBe(21888888888);
  });

  test('deve retornar número válido', () => {
    const resultado = validateTel('(11)99999-9999');
    expect(typeof resultado).toBe('number');
    expect(resultado).toBeGreaterThan(0);
  });
});