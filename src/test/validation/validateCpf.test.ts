import { validateCpf } from '../../validation/validateData/validadeteCpf.js';

describe('validateCpf', () => {
  test('deve validar CPF válido', () => {
    expect(validateCpf('11144477735')).toBe(true);
    expect(validateCpf('111.444.777-35')).toBe(true);
  });

  test('deve rejeitar CPF inválido', () => {
    expect(validateCpf('11144477736')).toBe(false);
    expect(validateCpf('123.456.789-10')).toBe(false);
  });

  test('deve rejeitar CPF com sequência repetida', () => {
    expect(validateCpf('11111111111')).toBe(false);
    expect(validateCpf('000.000.000-00')).toBe(false);
  });

  test('deve rejeitar CPF com tamanho incorreto', () => {
    expect(validateCpf('1234567890')).toBe(false);
    expect(validateCpf('123456789012')).toBe(false);
    expect(validateCpf('')).toBe(false);
  });

  test('deve remover caracteres especiais', () => {
    expect(validateCpf('111.444.777-35')).toBe(true);
    expect(validateCpf('111 444 777 35')).toBe(true);
    expect(validateCpf('111/444/777-35')).toBe(true);
  });
});