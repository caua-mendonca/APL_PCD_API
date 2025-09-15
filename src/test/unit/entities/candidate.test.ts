import { Candidate } from '../../../model/entities/class/candidate.js';

describe('Classe Candidate', () => {
  const mockCandidateData = {
    name: 'João Silva',
    email: 'joao@email.com',
    confirme_email: 'joao@email.com',
    senha: '123456',
    confirme_senha: '123456',
    telefone: '11999999999',
    cpf: '11144477735',
    data_nascimento: new Date('1990-01-01'),
    def_motora: true,
    def_auditiva: false,
    def_visual: false,
    sub_tipo: 'Paraplegia',
    barreira: 'Arquitetônica',
    acessbilidade: 'Rampa'
  };

  test('deve criar candidato com dados válidos', () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      mockCandidateData.def_motora,
      mockCandidateData.def_auditiva,
      mockCandidateData.def_visual,
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    expect(candidate.name).toBe(mockCandidateData.name);
    expect(candidate.email).toBe(mockCandidateData.email);
    expect(candidate.cpf).toBe(mockCandidateData.cpf);
    expect(candidate.status).toBe(true);
  });

  test('deve gerar ID com prefixo CAND-', async () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      mockCandidateData.def_motora,
      mockCandidateData.def_auditiva,
      mockCandidateData.def_visual,
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    await candidate.setId();
    expect(candidate.id).toMatch(/^CAND-\d+$/);
  });

  test('deve definir deficiência motora corretamente', () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      true, // def_motora
      false, // def_auditiva
      false, // def_visual
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    expect(candidate.def_motora).toBe(true);
    expect(candidate.def).toMatch(/^DMOTO-\d+$/);
  });

  test('deve definir deficiência auditiva corretamente', () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      false, // def_motora
      true,  // def_auditiva
      false, // def_visual
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    expect(candidate.def_auditiva).toBe(true);
    expect(candidate.def).toMatch(/^DAUDI-\d+$/);
  });

  test('deve definir deficiência visual corretamente', () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      false, // def_motora
      false, // def_auditiva
      true,  // def_visual
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    expect(candidate.def_visual).toBe(true);
    expect(candidate.def).toMatch(/^DVISU-\d+$/);
  });

  test('deve atualizar senha criptografada', async () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      mockCandidateData.def_motora,
      mockCandidateData.def_auditiva,
      mockCandidateData.def_visual,
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    const novaSenha = 'senha_criptografada_hash';
    await candidate.SetCryptPass(novaSenha);
    expect(candidate.senha).toBe(novaSenha);
  });
});