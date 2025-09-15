import dotenv from 'dotenv';

// Configurar variáveis de ambiente para testes
dotenv.config({ path: '.env.test' });

// Configurações globais para testes
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock de variáveis de ambiente padrão
process.env.NODE_ENV = 'test';
process.env.DB_DATABASE = process.env.DB_DATABASE || 'apl_pcd_test';
process.env.STATUS_200 = 'Sucesso';
process.env.STATUS_201 = 'Criado com sucesso';
process.env.STATUS_400 = 'Dados inválidos';
process.env.STATUS_404 = 'Não encontrado';
process.env.STATUS_500 = 'Erro interno do servidor';

// Timeout para testes assíncronos
jest.setTimeout(30000);