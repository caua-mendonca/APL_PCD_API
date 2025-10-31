/**
 * 🧪 Company Test Fixtures
 * Dados de teste reutilizáveis para Empresas
 */

export const validCompanyData = {
  name: 'Tech Solutions LTDA',
  email: 'contato@techsolutions.com',
  confirm_email: 'contato@techsolutions.com',
  password: 'CompanyPass@123',
  confirm_password: 'CompanyPass@123',
  phone: '1140028922',
  cnpj: '12345678000190',
  type: 'Tecnologia',
};

export const invalidCompanyData = {
  invalidCNPJ: {
    ...validCompanyData,
    cnpj: '12345',
  },
  invalidEmail: {
    ...validCompanyData,
    email: 'invalid-email',
  },
  passwordMismatch: {
    ...validCompanyData,
    confirm_password: 'DifferentPass@123',
  },
};

export const companyListMock = [
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    nome: 'Tech Solutions LTDA',
    email: 'tech@example.com',
    cnpj: '12345678000190',
    tipo: 'Tecnologia',
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440002',
    nome: 'Consulting Corp',
    email: 'consulting@example.com',
    cnpj: '98765432000110',
    tipo: 'Consultoria',
  },
];

export const companyDatabaseMock = {
  rows: companyListMock,
  rowCount: companyListMock.length,
  command: 'SELECT',
  oid: 0,
  fields: [],
};
