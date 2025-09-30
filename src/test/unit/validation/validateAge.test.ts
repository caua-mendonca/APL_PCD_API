import { validateAge } from '../../../validation/validateData/validateAge.js';

describe('Age Validation', () => {
  describe('validateAge', () => {
    test('should return true for person over 18', () => {
      const birthDate = new Date('1990-01-01');
      expect(validateAge(birthDate)).toBe(true);
    });

    test('should return false for person under 18', () => {
      const currentYear = new Date().getFullYear();
      const birthDate = new Date(`${currentYear - 17}-01-01`);
      expect(validateAge(birthDate)).toBe(false);
    });

    test('should return true for person exactly 18', () => {
      const currentDate = new Date();
      const birthDate = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
      expect(validateAge(birthDate)).toBe(true);
    });

    test('should handle birthday not yet occurred this year', () => {
      const currentDate = new Date();
      const birthDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth() + 1, // Next month
        currentDate.getDate()
      );
      expect(validateAge(birthDate)).toBe(false);
    });

    test('should handle birthday already occurred this year', () => {
      const currentDate = new Date();
      const birthDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth() - 1, // Previous month
        currentDate.getDate()
      );
      expect(validateAge(birthDate)).toBe(true);
    });
  });
});