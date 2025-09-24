import { Contratante } from '../../model/entities/class/Contratante.js';

describe('Contratante', () => {
  const mockContratanteData = {
    nome_fantasia: 'Tech Solutions',
    razao_social: 'Tech Solutions Ltda',
    email: 'contato@techsolutions.com',
    confirme_email: 'contato@techsolutions.com',
    senha: 'senha123',
    confirme_senha: 'senha123',
    cnpj: '11222333000181',
    telefone: '11999999999',
    acessibilidade: 'Ambiente totalmente acessível'
  };

  test('deve criar contratante com dados válidos', () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    expect(contratante.nome_fantasia).toBe(mockContratanteData.nome_fantasia);
    expect(contratante.razao_social).toBe(mockContratanteData.razao_social);
    expect(contratante.email).toBe(mockContratanteData.email);
    expect(contratante.cnpj).toBe(mockContratanteData.cnpj);
    expect(contratante.telefone).toBe(mockContratanteData.telefone);
    expect(contratante.acessibilidade).toBe(mockContratanteData.acessibilidade);
  });

  test('deve inicializar com status ativo', () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    expect(contratante.status).toBe(true);
  });

  test('deve inicializar com ID vazio', () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    expect(contratante.id).toBe('');
  });

  test('deve gerar ID com prefixo EMP-', async () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    await contratante.setId();
    expect(contratante.id).toMatch(/^EMP-\d{1,6}$/);
  });

  test('deve atualizar senha criptografada', async () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    const novaSenhaHash = 'hashSenha789';
    await contratante.SetCryptPass(novaSenhaHash);
    expect(contratante.senha).toBe(novaSenhaHash);
  });

  test('deve validar confirmação de email', () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    expect(contratante.email).toBe(contratante.confirme_email);
  });

  test('deve validar confirmação de senha', () => {
    const contratante = new Contratante(
      mockContratanteData.nome_fantasia,
      mockContratanteData.razao_social,
      mockContratanteData.email,
      mockContratanteData.confirme_email,
      mockContratanteData.senha,
      mockContratanteData.confirme_senha,
      mockContratanteData.cnpj,
      mockContratanteData.telefone,
      mockContratanteData.acessibilidade
    );

    expect(contratante.senha).toBe(contratante.confirme_senha);
  });

  test('deve aceitar diferentes informações de acessibilidade', () => {
    const acessibilidades = [
      'Rampa de acesso',
      'Elevador adaptado',
      'Banheiro acessível',
      'Sinalização em braile'
    ];

    acessibilidades.forEach(acess => {
      const contratante = new Contratante(
        mockContratanteData.nome_fantasia,
        mockContratanteData.razao_social,
        mockContratanteData.email,
        mockContratanteData.confirme_email,
        mockContratanteData.senha,
        mockContratanteData.confirme_senha,
        mockContratanteData.cnpj,
        mockContratanteData.telefone,
        acess
      );
      expect(contratante.acessibilidade).toBe(acess);
    });
  });
});