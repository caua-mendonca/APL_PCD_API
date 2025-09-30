import { Contratante } from '../../../model/entities/class/Company.js';

describe('Company Entity', () => {
  const mockCompanyData = {
    nome_fantasia: 'Tech Solutions',
    razao_social: 'Tech Solutions Ltda',
    email: 'contato@techsolutions.com',
    confirme_email: 'contato@techsolutions.com',
    senha: 'password123',
    confirme_senha: 'password123',
    cnpj: '12345678000195',
    telefone: '11999999999',
    acessibilidade: 'ACES-123456'
  };

  test('should create company with correct properties', () => {
    const company = new Contratante(
      mockCompanyData.nome_fantasia,
      mockCompanyData.razao_social,
      mockCompanyData.email,
      mockCompanyData.confirme_email,
      mockCompanyData.senha,
      mockCompanyData.confirme_senha,
      mockCompanyData.cnpj,
      mockCompanyData.telefone,
      mockCompanyData.acessibilidade
    );

    expect(company.nome_fantasia).toBe(mockCompanyData.nome_fantasia);
    expect(company.razao_social).toBe(mockCompanyData.razao_social);
    expect(company.email).toBe(mockCompanyData.email);
    expect(company.cnpj).toBe(mockCompanyData.cnpj);
    expect(company.status).toBe(true);
    expect(company.id).toBe('');
  });

  test('should generate company ID with EMP prefix', async () => {
    const company = new Contratante(
      mockCompanyData.nome_fantasia,
      mockCompanyData.razao_social,
      mockCompanyData.email,
      mockCompanyData.confirme_email,
      mockCompanyData.senha,
      mockCompanyData.confirme_senha,
      mockCompanyData.cnpj,
      mockCompanyData.telefone,
      mockCompanyData.acessibilidade
    );

    await company.setId();
    expect(company.id).toMatch(/^EMP-\d{1,6}$/);
  });

  test('should update password', async () => {
    const company = new Contratante(
      mockCompanyData.nome_fantasia,
      mockCompanyData.razao_social,
      mockCompanyData.email,
      mockCompanyData.confirme_email,
      mockCompanyData.senha,
      mockCompanyData.confirme_senha,
      mockCompanyData.cnpj,
      mockCompanyData.telefone,
      mockCompanyData.acessibilidade
    );

    const newPassword = 'newPassword123';
    await company.SetCryptPass(newPassword);
    expect(company.senha).toBe(newPassword);
  });

  test('should initialize with default status true', () => {
    const company = new Contratante(
      mockCompanyData.nome_fantasia,
      mockCompanyData.razao_social,
      mockCompanyData.email,
      mockCompanyData.confirme_email,
      mockCompanyData.senha,
      mockCompanyData.confirme_senha,
      mockCompanyData.cnpj,
      mockCompanyData.telefone,
      mockCompanyData.acessibilidade
    );

    expect(company.status).toBe(true);
  });

  test('should store all provided data correctly', () => {
    const company = new Contratante(
      mockCompanyData.nome_fantasia,
      mockCompanyData.razao_social,
      mockCompanyData.email,
      mockCompanyData.confirme_email,
      mockCompanyData.senha,
      mockCompanyData.confirme_senha,
      mockCompanyData.cnpj,
      mockCompanyData.telefone,
      mockCompanyData.acessibilidade
    );

    expect(company.confirme_email).toBe(mockCompanyData.confirme_email);
    expect(company.confirme_senha).toBe(mockCompanyData.confirme_senha);
    expect(company.telefone).toBe(mockCompanyData.telefone);
    expect(company.acessibilidade).toBe(mockCompanyData.acessibilidade);
  });
});