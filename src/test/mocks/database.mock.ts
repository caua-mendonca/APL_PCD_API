/**
 * 🎭 Database Mock Helper
 * Mock completo do pool de conexão PostgreSQL
 */

// @ts-nocheck
import { jest } from '@jest/globals';

export const mockQueryResult = {
  rows: [],
  rowCount: 0,
  command: 'SELECT',
  oid: 0,
  fields: [],
};

export const createMockPool = () => ({
  query: jest.fn().mockResolvedValue(mockQueryResult),
  connect: jest.fn().mockResolvedValue({
    query: jest.fn().mockResolvedValue(mockQueryResult),
    release: jest.fn(),
  }),
  end: jest.fn().mockResolvedValue(undefined),
  on: jest.fn(),
});

export const mockDatabasePool = createMockPool();

/**
 * Mock do módulo de conexão do banco
 */
export const mockDBModule = {
  pool: mockDatabasePool,
};

/**
 * Reset todos os mocks do database
 */
export const resetDatabaseMocks = () => {
  mockDatabasePool.query.mockClear();
  mockDatabasePool.connect.mockClear();
  mockDatabasePool.end.mockClear();
};

/**
 * Configura resposta de sucesso para query
 */
export const mockSuccessQuery = (rows: any[] = [], rowCount?: number) => {
  mockDatabasePool.query.mockResolvedValueOnce({
    rows,
    rowCount: rowCount ?? rows.length,
    command: 'SELECT',
    oid: 0,
    fields: [],
  });
};

/**
 * Configura resposta de erro para query
 */
export const mockErrorQuery = (error: Error | string) => {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  mockDatabasePool.query.mockRejectedValueOnce(errorObj);
};

/**
 * Configura resposta de insert com sucesso
 */
export const mockInsertSuccess = (id?: string) => {
  mockDatabasePool.query.mockResolvedValueOnce({
    rows: id ? [{ id }] : [],
    rowCount: 1,
    command: 'INSERT',
    oid: 0,
    fields: [],
  });
};

/**
 * Configura resposta de update com sucesso
 */
export const mockUpdateSuccess = (rowCount: number = 1) => {
  mockDatabasePool.query.mockResolvedValueOnce({
    rows: [],
    rowCount,
    command: 'UPDATE',
    oid: 0,
    fields: [],
  });
};

/**
 * Configura resposta de delete com sucesso
 */
export const mockDeleteSuccess = (rowCount: number = 1) => {
  mockDatabasePool.query.mockResolvedValueOnce({
    rows: [],
    rowCount,
    command: 'DELETE',
    oid: 0,
    fields: [],
  });
};

/**
 * Verifica se query foi chamada com SQL específico
 */
export const expectQueryCalledWith = (sql: string | RegExp, params?: any[]) => {
  const calls = mockDatabasePool.query.mock.calls;
  const found = calls.some(([callSql, callParams]: any[]) => {
    const sqlMatches = typeof sql === 'string' 
      ? callSql.includes(sql)
      : sql.test(callSql);
    
    if (!params) return sqlMatches;
    
    return sqlMatches && JSON.stringify(callParams) === JSON.stringify(params);
  });
  
  expect(found).toBeTruthy();
};
