export const mockPool = {
  query: jest.fn(),
  connect: jest.fn(),
  end: jest.fn(),
};

export const mockDB = {
  pool: mockPool,
};

// Mock common repository functions
export const mockCommonRepository = {
  validateData: jest.fn(),
  insertData: jest.fn(),
  getData: jest.fn(),
  updateData: jest.fn(),
  deleteData: jest.fn(),
};

// Mock responses
export const mockResponses = {
  success: [200, 'Success'],
  created: [201, 'Created'],
  badRequest: [400, 'Bad Request'],
  unauthorized: [401, 'Unauthorized'],
  forbidden: [403, 'Forbidden'],
  notFound: [404, 'Not Found'],
  serverError: [500, 'Internal Server Error'],
};