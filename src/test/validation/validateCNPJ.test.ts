import { validateCNPJ } from '../../validation/validateData/validateCNPJ.js';

describe('validateCNPJ', () => {
  test('deve validar CNPJ válido', () => {
    expect(validateCNPJ('11222333000181')).toBe(true);
  });

  test('deve rejeitar CNPJ inválido', () => {
    expect(validateCNPJ('11222333000182')).toBe(false);
    expect(validateCNPJ('12345678000100')).toBe(false);
  });

  test('deve rejeitar CNPJ com sequência repetida', () => {
    expect(validateCNPJ('11111111111111')).toBe(false);
    expect(validateCNPJ('00000000000000')).toBe(false);
  });

  test('deve rejeitar CNPJ com tamanho incorreto', () => {
    expect(validateCNPJ('1122233300018')).toBe(false);
    expect(validateCNPJ('112223330001811')).toBe(false);
    expect(validateCNPJ('')).toBe(false);
  });

  test('deve rejeitar CNPJ nulo ou undefined', () => {
    expect(validateCNPJ(null as any)).toBe(false);
    expect(validateCNPJ(undefined as any)).toBe(false);
  });
});