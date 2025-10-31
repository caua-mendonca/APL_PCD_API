/**
 * 🛠️ Test Helper Utilities
 * Funções auxiliares para facilitar os testes
 */

import { jest } from '@jest/globals';
import type { Request, Response, NextFunction } from 'express';

/**
 * Cria um mock de Request do Express
 */
export const createMockRequest = (overrides?: Partial<Request>): any => {
  return {
    body: {},
    params: {},
    query: {},
    headers: {},
    cookies: {},
    get: jest.fn(),
    ...overrides,
  };
};

/**
 * Cria um mock de Response do Express
 */
export const createMockResponse = (): any => {
  const res: any = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    sendStatus: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    setHeader: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
    clearCookie: jest.fn().mockReturnThis(),
  };
  return res;
};

/**
 * Cria um mock de NextFunction
 */
export const createMockNext = (): NextFunction => {
  return jest.fn() as unknown as NextFunction;
};

/**
 * Gera token JWT fake para testes
 */
export const generateMockJWT = (payload: object = {}): string => {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify({
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'test@example.com',
    role: 'CAND',
    ...payload,
  })).toString('base64');
  const signature = 'mock-signature';
  return `${header}.${body}.${signature}`;
};

/**
 * Simula delay assíncrono
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Gera ID único para testes
 */
export const generateTestId = (): string => {
  return `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Gera UUID v4 fake para testes
 */
export const generateMockUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Limpa todas as variáveis de ambiente de teste
 */
export const cleanTestEnv = () => {
  const testKeys = Object.keys(process.env).filter(key => key.startsWith('TEST_'));
  testKeys.forEach(key => delete process.env[key]);
};

/**
 * Configura variáveis de ambiente para teste
 */
export const setupTestEnv = (env: Record<string, string>) => {
  Object.entries(env).forEach(([key, value]) => {
    process.env[key] = value;
  });
};

/**
 * Captura console.log durante teste
 */
export const captureConsoleLog = (): {
  logs: string[];
  restore: () => void;
} => {
  const logs: string[] = [];
  const originalLog = console.log;
  
  console.log = (...args: any[]) => {
    logs.push(args.map(arg => String(arg)).join(' '));
  };
  
  return {
    logs,
    restore: () => {
      console.log = originalLog;
    },
  };
};

/**
 * Verifica se objeto tem todas as propriedades esperadas
 */
export const expectObjectToHaveProperties = (obj: any, properties: string[]) => {
  properties.forEach(prop => {
    expect(obj).toHaveProperty(prop);
  });
};

/**
 * Verifica se array contém objetos com propriedades específicas
 */
export const expectArrayToContainObjectsWithProps = (arr: any[], properties: string[]) => {
  expect(Array.isArray(arr)).toBe(true);
  arr.forEach(item => {
    expectObjectToHaveProperties(item, properties);
  });
};

/**
 * Mede tempo de execução de função
 */
export const measureExecutionTime = async (fn: () => Promise<any>): Promise<number> => {
  const start = Date.now();
  await fn();
  return Date.now() - start;
};

/**
 * Retry de função com backoff
 */
export const retryWithBackoff = async (
  fn: () => Promise<any>,
  maxRetries: number = 3,
  baseDelay: number = 100
): Promise<any> => {
  let lastError: any;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await delay(baseDelay * Math.pow(2, i));
      }
    }
  }
  
  throw lastError;
};
