/**
 * 🧪 Job Test Fixtures
 * Dados de teste reutilizáveis para Vagas
 */

export const validJobData = {
  title: 'Desenvolvedor Full Stack',
  description: 'Vaga para desenvolvedor com experiência em Node.js e React',
  salary: 8000.00,
  location: 'São Paulo - SP',
  type: 'CLT',
  modality: 'Híbrido',
  requirements: 'Experiência com TypeScript, PostgreSQL e Jest',
  benefits: 'Vale transporte, vale refeição, plano de saúde',
  company_id: '660e8400-e29b-41d4-a716-446655440001',
};

export const invalidJobData = {
  missingSalary: {
    ...validJobData,
    salary: undefined,
  },
  invalidCompanyId: {
    ...validJobData,
    company_id: 'invalid-uuid',
  },
  emptyTitle: {
    ...validJobData,
    title: '',
  },
};

export const jobListMock = [
  {
    id: '770e8400-e29b-41d4-a716-446655440001',
    titulo: 'Desenvolvedor Full Stack',
    descricao: 'Vaga para desenvolvedor com experiência em Node.js e React',
    salario: 8000.00,
    localizacao: 'São Paulo - SP',
    tipo: 'CLT',
    modalidade: 'Híbrido',
    tb_empresa_id: '660e8400-e29b-41d4-a716-446655440001',
  },
  {
    id: '770e8400-e29b-41d4-a716-446655440002',
    titulo: 'Analista de QA',
    descricao: 'Vaga para analista de testes',
    salario: 6000.00,
    localizacao: 'Rio de Janeiro - RJ',
    tipo: 'CLT',
    modalidade: 'Remoto',
    tb_empresa_id: '660e8400-e29b-41d4-a716-446655440002',
  },
];

export const jobDatabaseMock = {
  rows: jobListMock,
  rowCount: jobListMock.length,
  command: 'SELECT',
  oid: 0,
  fields: [],
};
