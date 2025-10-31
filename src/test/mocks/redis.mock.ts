/**
 * 🎭 Redis Mock Helper
 * Mock completo do cliente Redis
 */

// @ts-nocheck
import { jest } from '@jest/globals';

export const mockRedisClient: any = {
  connect: jest.fn().mockResolvedValue(undefined),
  disconnect: jest.fn().mockResolvedValue(undefined),
  quit: jest.fn().mockResolvedValue(undefined),
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue('OK'),
  del: jest.fn().mockResolvedValue(1),
  exists: jest.fn().mockResolvedValue(0),
  expire: jest.fn().mockResolvedValue(1),
  ttl: jest.fn().mockResolvedValue(-1),
  keys: jest.fn().mockResolvedValue([]),
  flushdb: jest.fn().mockResolvedValue('OK'),
  incr: jest.fn().mockResolvedValue(1),
  decr: jest.fn().mockResolvedValue(0),
  setEx: jest.fn().mockResolvedValue('OK'),
  on: jest.fn(),
  isOpen: true,
  isReady: true,
};

/**
 * Reset todos os mocks do Redis
 */
export const resetRedisMocks = () => {
  Object.keys(mockRedisClient).forEach(key => {
    if (typeof mockRedisClient[key] === 'function' && mockRedisClient[key].mockClear) {
      mockRedisClient[key].mockClear();
    }
  });
};

/**
 * Configura valor no cache
 */
export const mockRedisGet = (key: string, value: any) => {
  mockRedisClient.get.mockImplementation((k: string) => {
    if (k === key) {
      return Promise.resolve(JSON.stringify(value));
    }
    return Promise.resolve(null);
  });
};

/**
 * Configura erro no Redis
 */
export const mockRedisError = (method: string, error: Error | string) => {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  mockRedisClient[method].mockRejectedValueOnce(errorObj);
};
