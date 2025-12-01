/**
 * ██████╗ ███████╗███████╗████████╗    ███████╗███████╗████████╗██╗   ██╗██████╗ 
 * ██╔══██╗██╔════╝██╔════╝╚══██╔══╝    ██╔════╝██╔════╝╚══██╔══╝██║   ██║██╔══██╗
 * ██████╔╝█████╗  ███████╗   ██║       ███████╗█████╗     ██║   ██║   ██║██████╔╝
 * ██╔══██╗██╔══╝  ╚════██║   ██║       ╚════██║██╔══╝     ██║   ██║   ██║██╔═══╝ 
 * ██║  ██║███████╗███████║   ██║       ███████║███████╗   ██║   ╚██████╔╝██║     
 * ╚═╝  ╚═╝╚══════╝╚══════╝   ╚═╝       ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═╝     
 * 
 * 🧪 APL PCD API - Jest Global Setup
 * Enterprise-grade Test Configuration with 40 years of QA Best Practices
 * 
 * @author World-Class QA Engineer
 * @version 2.5.0
 * @since 2025
 */

import { jest } from '@jest/globals';

// ============================================================================
// GLOBAL TEST CONFIGURATION
// ============================================================================

// Aumentar timeout para testes de integração e performance
jest.setTimeout(30000);

// ============================================================================
// ENVIRONMENT VARIABLES SETUP
// ============================================================================

process.env.NODE_ENV = 'test';
process.env.PORT = '3001';
process.env.JWT_SECRET = 'test-jwt-secret-key-ultra-secure-2025';
process.env.JWT_EXPIRES_IN = '1h';
process.env.BCRYPT_ROUNDS = '10';
process.env.REDIS_HOST = 'localhost';
process.env.REDIS_PORT = '6379';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_NAME = 'apl_pcd_test';
process.env.DB_USER = 'test_user';
process.env.DB_PASSWORD = 'test_password';
process.env.RATE_LIMIT_WINDOW_MS = '60000';
process.env.RATE_LIMIT_MAX_REQUESTS = '100';

// Status codes para mensagens
process.env.STATUS_200 = 'Success';
process.env.STATUS_201 = 'Created';
process.env.STATUS_400 = 'Bad Request';
process.env.STATUS_401 = 'Unauthorized';
process.env.STATUS_403 = 'Forbidden';
process.env.STATUS_404 = 'Not Found';
process.env.STATUS_500 = 'Internal Server Error';

// ============================================================================
// CONSOLE CONFIGURATION
// ============================================================================

// Configurar níveis de log para testes
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Desabilitar logs desnecessários em modo silencioso
if (process.env.SILENT_TESTS === 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: originalConsole.error, // Manter errors visíveis
  };
}

// ============================================================================
// GLOBAL MOCKS
// ============================================================================

// Mock do logger para evitar poluição dos logs durante testes
jest.mock('../utils/logger.js', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    http: jest.fn(),
  },
}));

// ============================================================================
// GLOBAL TEST UTILITIES
// ============================================================================

/**
 * Sleep utility para testes assíncronos
 */
global.sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Gerar CPF válido para testes
 */
global.generateValidCPF = (): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const cpf = Array.from({ length: 9 }, randomDigit);
  
  // Calcular primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += cpf[i] * (10 - i);
  }
  const firstDigit = (sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11;
  cpf.push(firstDigit);
  
  // Calcular segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += cpf[i] * (11 - i);
  }
  const secondDigit = (sum * 10) % 11 === 10 ? 0 : (sum * 10) % 11;
  cpf.push(secondDigit);
  
  return cpf.join('');
};

/**
 * Gerar CNPJ válido para testes
 */
global.generateValidCNPJ = (): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const cnpj = Array.from({ length: 12 }, randomDigit);
  
  // Calcular primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += cnpj[i] * weights1[i];
  }
  const firstDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  cnpj.push(firstDigit);
  
  // Calcular segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  sum = 0;
  for (let i = 0; i < 13; i++) {
    sum += cnpj[i] * weights2[i];
  }
  const secondDigit = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  cnpj.push(secondDigit);
  
  return cnpj.join('');
};

/**
 * Gerar email único para testes
 */
global.generateUniqueEmail = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(7);
  return `test.${timestamp}.${random}@example.com`;
};

/**
 * Gerar telefone válido para testes
 */
global.generateValidPhone = (): string => {
  const ddd = Math.floor(Math.random() * 89) + 11; // DDDs de 11 a 99
  const prefix = 9; // Celular
  const number = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `${ddd}${prefix}${number}`;
};

/**
 * Gerar data de nascimento válida (maior de 18 anos)
 */
global.generateValidBirthDate = (): Date => {
  const today = new Date();
  const year = today.getFullYear() - Math.floor(Math.random() * 50) - 18; // 18-68 anos
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28) + 1;
  return new Date(year, month, day);
};

// ============================================================================
// GLOBAL TYPE DECLARATIONS
// ============================================================================

declare global {
  function sleep(ms: number): Promise<void>;
  function generateValidCPF(): string;
  function generateValidCNPJ(): string;
  function generateUniqueEmail(): string;
  function generateValidPhone(): string;
  function generateValidBirthDate(): Date;
  
  namespace NodeJS {
    interface Global {
      sleep: (ms: number) => Promise<void>;
      generateValidCPF: () => string;
      generateValidCNPJ: () => string;
      generateUniqueEmail: () => string;
      generateValidPhone: () => string;
      generateValidBirthDate: () => Date;
    }
  }
}

// ============================================================================
// SETUP AND TEARDOWN
// ============================================================================

/**
 * Antes de todos os testes
 */
beforeAll(async () => {
  console.log('🚀 Iniciando Test Suite - APL PCD API');
  console.log('📦 Versão: 2.5.0');
  console.log('🧪 Ambiente: TEST');
  console.log('⏰ Data:', new Date().toISOString());
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

/**
 * Depois de todos os testes
 */
afterAll(async () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Test Suite Finalizada');
  console.log('📊 Verifique o relatório de cobertura em /coverage');
  
  // Limpar todos os timers e mocks
  jest.clearAllTimers();
  jest.clearAllMocks();
});

/**
 * Antes de cada teste
 */
beforeEach(() => {
  // Limpar mocks antes de cada teste
  jest.clearAllMocks();
});

/**
 * Depois de cada teste
 */
afterEach(() => {
  // Cleanup após cada teste
  jest.restoreAllMocks();
});

// ============================================================================
// MATCHERS CUSTOMIZADOS
// ============================================================================

expect.extend({
  /**
   * Verifica se é um CPF válido
   */
  toBeValidCPF(received: string) {
    const cpfRegex = /^\d{11}$/;
    const pass = cpfRegex.test(received);
    
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid CPF`
          : `expected ${received} to be a valid CPF (11 digits)`,
    };
  },
  
  /**
   * Verifica se é um CNPJ válido
   */
  toBeValidCNPJ(received: string) {
    const cnpjRegex = /^\d{14}$/;
    const pass = cnpjRegex.test(received);
    
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid CNPJ`
          : `expected ${received} to be a valid CNPJ (14 digits)`,
    };
  },
  
  /**
   * Verifica se é um email válido
   */
  toBeValidEmail(received: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pass = emailRegex.test(received);
    
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid email`
          : `expected ${received} to be a valid email`,
    };
  },
  
  /**
   * Verifica se é um UUID v4
   */
  toBeUUID(received: string) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const pass = uuidRegex.test(received);
    
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be a valid UUID v4`
          : `expected ${received} to be a valid UUID v4`,
    };
  },
});

// ============================================================================
// EXPORTS
// ============================================================================

export {};
