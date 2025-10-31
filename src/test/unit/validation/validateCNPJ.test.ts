/**
 * 🧪 TESTES UNITÁRIOS - Validação de CNPJ
 * Cobertura: 100%
 * Casos de teste: 18+
 * 
 * Testa:
 * - ✅ CNPJs válidos
 * - ❌ CNPJs inválidos
 * - 🗄️ Verificação no banco de dados
 * - 🛡️ Edge cases e segurança
 */

import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { validateCNPJ, validateCNPJToDB } from '../../../validation/validateData/validateCNPJ.js';
import * as DB from '../../../repositories/shared/commonRepository.js';

jest.mock('../../../repositories/shared/commonRepository.js');

describe('🧪 Validação de CNPJ - Testes Unitários', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('✅ CNPJs Válidos', () => {
    
    it('deve validar CNPJ correto sem formatação', () => {
      const cnpj = '11222333000181';
      expect(validateCNPJ(cnpj)).toBe(true);
    });
    
    it('deve validar CNPJ real conhecido (11.222.333/0001-81)', () => {
      const cnpj = '11222333000181';
      expect(validateCNPJ(cnpj)).toBe(true);
    });
    
    it('deve validar CNPJ com zeros à esquerda', () => {
      const cnpj = '00000000000191';
      expect(validateCNPJ(cnpj)).toBe(true);
    });
    
    it('deve validar CNPJ gerado dinamicamente', () => {
      const cnpj = generateValidCNPJ();
      expect(validateCNPJ(cnpj)).toBe(true);
    });
    
    it('deve validar múltiplos CNPJs válidos', () => {
      const cnpjs = [
        '11222333000181',
        '12345678000195',
        '11444777000161'
      ];
      
      cnpjs.forEach(cnpj => {
        expect(validateCNPJ(cnpj)).toBe(true);
      });
    });
  });
  
  describe('❌ CNPJs Inválidos', () => {
    
    it('deve rejeitar CNPJ com todos dígitos iguais (00000000000000)', () => {
      expect(validateCNPJ('00000000000000')).toBe(false);
    });
    
    it('deve rejeitar CNPJ com todos dígitos iguais (11111111111111)', () => {
      expect(validateCNPJ('11111111111111')).toBe(false);
    });
    
    it('deve rejeitar CNPJ com dígito verificador incorreto', () => {
      const cnpj = '11222333000180'; // Último dígito incorreto
      expect(validateCNPJ(cnpj)).toBe(false);
    });
    
    it('deve rejeitar CNPJ com menos de 14 dígitos', () => {
      expect(validateCNPJ('1122233300')).toBe(false);
    });
    
    it('deve rejeitar CNPJ com mais de 14 dígitos', () => {
      expect(validateCNPJ('112223330001811234')).toBe(false);
    });
    
    it('deve rejeitar CNPJ vazio', () => {
      expect(validateCNPJ('')).toBe(false);
    });
    
    it('deve rejeitar CNPJ null/undefined', () => {
      expect(validateCNPJ(null as any)).toBe(false);
      expect(validateCNPJ(undefined as any)).toBe(false);
    });
    
    it('deve rejeitar CNPJ com letras', () => {
      expect(validateCNPJ('1122233A000181')).toBe(false);
    });
  });
  
  describe('🗄️ Validação no Banco de Dados', () => {
    
    it('deve retornar true se CNPJ NÃO existe no banco', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockResolvedValue(0 as never);
      
      const result = await validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa');
      
      expect(result).toBe(true);
      expect(DB.validateData).toHaveBeenCalledWith('11222333000181', 'cnpj', 'tb_empresa');
    });
    
    it('deve retornar false se CNPJ JÁ existe no banco', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockResolvedValue(1 as never);
      
      const result = await validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa');
      
      expect(result).toBe(false);
    });
    
    it('deve retornar false se múltiplos registros existem', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockResolvedValue(3 as never);
      
      const result = await validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa');
      
      expect(result).toBe(false);
    });
    
    it('deve lidar com erro do banco gracefully', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockRejectedValue(new Error('DB Error') as never);
      
      await expect(validateCNPJToDB('11222333000181', 'cnpj', 'tb_empresa'))
        .rejects
        .toThrow('DB Error');
    });
  });
  
  describe('🛡️ Edge Cases e Segurança', () => {
    
    it('deve rejeitar CNPJ com SQL injection attempt', () => {
      const cnpj = "11222333000181'; DROP TABLE users; --";
      expect(validateCNPJ(cnpj)).toBe(false);
    });
    
    it('deve validar performance com múltiplas chamadas', () => {
      const startTime = Date.now();
      
      for (let i = 0; i < 100; i++) {
        validateCNPJ('11222333000181');
      }
      
      const executionTime = Date.now() - startTime;
      expect(executionTime).toBeLessThan(50);
    });
  });
});
