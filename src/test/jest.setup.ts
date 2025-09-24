import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env' });

// Global test timeout
jest.setTimeout(30000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock process.env for tests
process.env.NODE_ENV = 'test';
process.env.SECRET_CAND = 'test-secret-cand';
process.env.SECRET_EMP = 'test-secret-emp';
process.env.SECRET_ADM = 'test-secret-adm';
process.env.STATUS_200 = 'Success';
process.env.STATUS_201 = 'Created';
process.env.STATUS_400 = 'Bad Request';
process.env.STATUS_401 = 'Unauthorized';
process.env.STATUS_403 = 'Forbidden';
process.env.STATUS_404 = 'Not Found';
process.env.STATUS_500 = 'Internal Server Error';