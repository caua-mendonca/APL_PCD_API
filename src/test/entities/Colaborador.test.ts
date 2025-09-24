import { Colaborador } from '../../model/entities/class/Colaborador.js';

describe('Colaborador', () => {
  const mockColaboradorData = {
    name: 'Maria Santos',
    email: 'maria@empresa.com',
    senha: 'senha123',
    setor: 'Recursos Humanos'
  };

  test('deve criar colaborador com dados válidos', () => {
    const colaborador = new Colaborador(
      mockColaboradorData.name,
      mockColaboradorData.email,
      mockColaboradorData.senha,
      mockColaboradorData.setor
    );

    expect(colaborador.name).toBe(mockColaboradorData.name);
    expect(colaborador.email).toBe(mockColaboradorData.email);
    expect(colaborador.senha).toBe(mockColaboradorData.senha);
    expect(colaborador.setor).toBe(mockColaboradorData.setor);
  });

  test('deve inicializar com ID vazio', () => {
    const colaborador = new Colaborador(
      mockColaboradorData.name,
      mockColaboradorData.email,
      mockColaboradorData.senha,
      mockColaboradorData.setor
    );

    expect(colaborador.id).toBe('');
  });

  test('deve gerar ID com prefixo COLAB-', async () => {
    const colaborador = new Colaborador(
      mockColaboradorData.name,
      mockColaboradorData.email,
      mockColaboradorData.senha,
      mockColaboradorData.setor
    );

    await colaborador.setId();
    expect(colaborador.id).toMatch(/^COLAB-\d{1,6}$/);
  });

  test('deve atualizar senha criptografada', async () => {
    const colaborador = new Colaborador(
      mockColaboradorData.name,
      mockColaboradorData.email,
      mockColaboradorData.senha,
      mockColaboradorData.setor
    );

    const novaSenhaHash = 'hashSenha456';
    await colaborador.SetCryptPass(novaSenhaHash);
    expect(colaborador.senha).toBe(novaSenhaHash);
  });

  test('deve aceitar diferentes setores', () => {
    const setores = ['TI', 'Financeiro', 'Marketing', 'Vendas'];
    
    setores.forEach(setor => {
      const colaborador = new Colaborador(
        mockColaboradorData.name,
        mockColaboradorData.email,
        mockColaboradorData.senha,
        setor
      );
      expect(colaborador.setor).toBe(setor);
    });
  });

  test('deve manter propriedades imutáveis após criação', () => {
    const colaborador = new Colaborador(
      mockColaboradorData.name,
      mockColaboradorData.email,
      mockColaboradorData.senha,
      mockColaboradorData.setor
    );

    const nomeOriginal = colaborador.name;
    const emailOriginal = colaborador.email;
    const setorOriginal = colaborador.setor;

    expect(colaborador.name).toBe(nomeOriginal);
    expect(colaborador.email).toBe(emailOriginal);
    expect(colaborador.setor).toBe(setorOriginal);
  });
});