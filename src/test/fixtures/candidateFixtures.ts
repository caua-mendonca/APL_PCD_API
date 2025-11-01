/**
 * 🧪 Candidate Test Fixtures
 * Dados de teste reutilizáveis para Candidatos
 */

export const validCandidateData = {
  name: 'João da Silva',
  email: 'joao.silva@example.com',
  confirm_email: 'joao.silva@example.com',
  password: 'SecurePass@123',
  confirm_password: 'SecurePass@123',
  phone: '11987654321',
  cpf: '12345678901',
  birth_date: new Date('1990-01-15'),
  motor_disability: false,
  hearing_disability: true,
  visual_disability: false,
  sub_type: 'Parcial',
  barrier: 'Comunicação',
  accessibility: 'Libras',
};

export const invalidCandidateData = {
  invalidEmail: {
    ...validCandidateData,
    email: 'invalid-email',
  },
  invalidCPF: {
    ...validCandidateData,
    cpf: '12345',
  },
  underage: {
    ...validCandidateData,
    birth_date: new Date('2010-01-15'),
  },
  passwordMismatch: {
    ...validCandidateData,
    confirm_password: 'DifferentPass@123',
  },
  emailMismatch: {
    ...validCandidateData,
    confirm_email: 'different@example.com',
  },
};

export const candidateListMock = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    nome: 'João da Silva',
    email: 'joao@example.com',
    cpf: '12345678901',
    deficiencia: 'Auditiva',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    nome: 'Maria Santos',
    email: 'maria@example.com',
    cpf: '98765432100',
    deficiencia: 'Visual',
  },
];

export const candidateDatabaseMock = {
  rows: candidateListMock,
  rowCount: candidateListMock.length,
  command: 'SELECT',
  oid: 0,
  fields: [],
};
