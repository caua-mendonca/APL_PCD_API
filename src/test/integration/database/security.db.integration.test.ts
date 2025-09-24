import { safeIdentifier, validateColumnsForTable, extractColumnsFromSets } from '../../../repositories/shared/security.js';

describe('Database Security Integration Tests', () => {
  describe('safeIdentifier', () => {
    test('should allow valid table names', () => {
      expect(safeIdentifier('tb_candidato')).toBe('tb_candidato');
      expect(safeIdentifier('tb_empresa')).toBe('tb_empresa');
      expect(safeIdentifier('tb_vaga')).toBe('tb_vaga');
    });

    test('should reject SQL injection attempts', () => {
      expect(() => safeIdentifier('tb_candidato; DROP TABLE users;')).toThrow();
      expect(() => safeIdentifier('tb_candidato\' OR 1=1--')).toThrow();
      expect(() => safeIdentifier('tb_candidato UNION SELECT')).toThrow();
    });

    test('should reject invalid characters', () => {
      expect(() => safeIdentifier('tb_candidato@')).toThrow();
      expect(() => safeIdentifier('tb_candidato#')).toThrow();
      expect(() => safeIdentifier('tb_candidato$')).toThrow();
    });

    test('should handle empty or null inputs', () => {
      expect(() => safeIdentifier('')).toThrow();
      expect(() => safeIdentifier(null as any)).toThrow();
      expect(() => safeIdentifier(undefined as any)).toThrow();
    });
  });

  describe('validateColumnsForTable', () => {
    test('should validate columns for tb_candidato', () => {
      const validColumns = ['id', 'nome', 'email', 'cpf'];
      expect(() => validateColumnsForTable('tb_candidato', validColumns)).not.toThrow();
    });

    test('should reject invalid columns', () => {
      const invalidColumns = ['id', 'invalid_column'];
      expect(() => validateColumnsForTable('tb_candidato', invalidColumns)).toThrow();
    });

    test('should reject SQL injection in column names', () => {
      const maliciousColumns = ['id', 'nome; DROP TABLE tb_candidato;'];
      expect(() => validateColumnsForTable('tb_candidato', maliciousColumns)).toThrow();
    });
  });

  describe('extractColumnsFromSets', () => {
    test('should extract valid column names from SET clauses', () => {
      const setSql = 'nome = $1, email = $2, telefone = $3';
      const columns = extractColumnsFromSets(setSql);
      
      expect(columns).toContain('nome');
      expect(columns).toContain('email');
      expect(columns).toContain('telefone');
    });

    test('should handle complex SET clauses', () => {
      const setSql = 'nome = $1, email = LOWER($2), data_nascimento = $3';
      const columns = extractColumnsFromSets(setSql);
      
      expect(columns).toContain('nome');
      expect(columns).toContain('email');
      expect(columns).toContain('data_nascimento');
    });

    test('should reject malicious SET clauses', () => {
      const maliciousSql = 'nome = $1; DROP TABLE tb_candidato; --';
      expect(() => extractColumnsFromSets(maliciousSql)).toThrow();
    });

    test('should handle empty SET clauses', () => {
      expect(() => extractColumnsFromSets('')).toThrow();
      expect(() => extractColumnsFromSets(null as any)).toThrow();
    });
  });

  describe('SQL Injection Prevention', () => {
    test('should prevent common SQL injection patterns', () => {
      const injectionAttempts = [
        "'; DROP TABLE tb_candidato; --",
        "' OR '1'='1",
        "' UNION SELECT * FROM tb_candidato --",
        "'; INSERT INTO tb_candidato VALUES ('hack'); --",
        "' OR 1=1 --",
        "admin'--",
        "admin'/*",
        "' OR 'x'='x",
        "') OR ('1'='1",
        "' OR 1=1#"
      ];

      injectionAttempts.forEach(attempt => {
        expect(() => safeIdentifier(attempt)).toThrow();
      });
    });

    test('should prevent XSS attempts in identifiers', () => {
      const xssAttempts = [
        "<script>alert('xss')</script>",
        "javascript:alert('xss')",
        "<img src=x onerror=alert('xss')>",
        "';alert('xss');//"
      ];

      xssAttempts.forEach(attempt => {
        expect(() => safeIdentifier(attempt)).toThrow();
      });
    });
  });

  describe('Parameter Validation', () => {
    test('should validate parameter types', () => {
      expect(() => safeIdentifier(123 as any)).toThrow();
      expect(() => safeIdentifier({} as any)).toThrow();
      expect(() => safeIdentifier([] as any)).toThrow();
      expect(() => safeIdentifier(true as any)).toThrow();
    });

    test('should validate parameter length', () => {
      const longIdentifier = 'a'.repeat(1000);
      expect(() => safeIdentifier(longIdentifier)).toThrow();
    });
  });
});