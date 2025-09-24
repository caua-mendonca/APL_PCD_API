import { validateDate } from '../../validation/validateData/validateDataVaga.js';

describe('validateDataVaga', () => {
  test('deve validar data futura', () => {
    const dataFutura = new Date();
    dataFutura.setDate(dataFutura.getDate() + 1);
    
    expect(validateDate(dataFutura)).toBe(true);
  });

  test('deve rejeitar data passada', () => {
    const dataPassada = new Date();
    dataPassada.setDate(dataPassada.getDate() - 1);
    
    expect(validateDate(dataPassada)).toBe(false);
  });

  test('deve rejeitar data atual', () => {
    const dataAtual = new Date();
    
    expect(validateDate(dataAtual)).toBe(false);
  });

  test('deve validar data muito futura', () => {
    const dataFutura = new Date('2030-12-31');
    
    expect(validateDate(dataFutura)).toBe(true);
  });

  test('deve rejeitar data muito passada', () => {
    const dataPassada = new Date('2020-01-01');
    
    expect(validateDate(dataPassada)).toBe(false);
  });

  test('deve validar data de amanhã', () => {
    const amanha = new Date();
    amanha.setHours(amanha.getHours() + 24);
    
    expect(validateDate(amanha)).toBe(true);
  });
});