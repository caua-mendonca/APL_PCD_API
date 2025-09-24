import { validateIdContratante, validateIdCandidato } from '../../validation/validateId/validateId.js';

describe('validateIdContratante', () => {
  test('deve validar ID de contratante válido', async () => {
    expect(await validateIdContratante('EMP-123456')).toBe(true);
    expect(await validateIdContratante('emp-123456')).toBe(true);
  });

  test('deve validar ID de colaborador válido', async () => {
    expect(await validateIdContratante('COLAB-123456')).toBe(true);
    expect(await validateIdContratante('colab-123456')).toBe(true);
  });

  test('deve rejeitar ID inválido', async () => {
    expect(await validateIdContratante('CAND-123456')).toBe(false);
    expect(await validateIdContratante('INVALID-123456')).toBe(false);
    expect(await validateIdContratante('123456')).toBe(false);
  });

  test('deve ser case insensitive', async () => {
    expect(await validateIdContratante('emp-123456')).toBe(true);
    expect(await validateIdContratante('EMP-123456')).toBe(true);
    expect(await validateIdContratante('Emp-123456')).toBe(true);
  });
});

describe('validateIdCandidato', () => {
  test('deve validar ID de candidato válido', async () => {
    expect(await validateIdCandidato('CAND-123456')).toBe(true);
    expect(await validateIdCandidato('cand-123456')).toBe(true);
  });

  test('deve rejeitar ID inválido', async () => {
    expect(await validateIdCandidato('EMP-123456')).toBe(false);
    expect(await validateIdCandidato('COLAB-123456')).toBe(false);
    expect(await validateIdCandidato('INVALID-123456')).toBe(false);
    expect(await validateIdCandidato('123456')).toBe(false);
  });

  test('deve ser case insensitive', async () => {
    expect(await validateIdCandidato('cand-123456')).toBe(true);
    expect(await validateIdCandidato('CAND-123456')).toBe(true);
    expect(await validateIdCandidato('Cand-123456')).toBe(true);
  });
});