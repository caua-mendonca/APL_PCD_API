import { validateTel } from '../../../validation/validateData/validatePhone.js';

describe('Phone Validation', () => {
  describe('validateTel', () => {
    test('should remove formatting and return clean number', () => {
      expect(validateTel('(11)99999-9999')).toBe(11999999999);
      expect(validateTel('11-99999-9999')).toBe(11999999999);
      expect(validateTel('(11)-99999-9999')).toBe(11999999999);
    });

    test('should handle phone without formatting', () => {
      expect(validateTel('11999999999')).toBe(11999999999);
    });

    test('should handle empty string', () => {
      expect(validateTel('')).toBe(0);
    });

    test('should handle different formats', () => {
      expect(validateTel('(11) 99999-9999')).toBe(11999999999);
      expect(validateTel('11 99999-9999')).toBe(11999999999);
      expect(validateTel('11-9-9999-9999')).toBe(11999999999);
    });

    test('should handle landline numbers', () => {
      expect(validateTel('(11)3333-3333')).toBe(1133333333);
      expect(validateTel('11-3333-3333')).toBe(1133333333);
    });
  });
});