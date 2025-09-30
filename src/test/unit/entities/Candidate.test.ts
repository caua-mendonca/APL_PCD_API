import { Candidate } from '../../../model/entities/class/candidate.js';

describe('Candidate Entity', () => {
  const mockCandidateData = {
    name: 'João Silva',
    email: 'joao@example.com',
    confirme_email: 'joao@example.com',
    senha: 'password123',
    confirme_senha: 'password123',
    telefone: '11999999999',
    cpf: '11144477735',
    data_nascimento: new Date('1990-01-01'),
    def_motora: false,
    def_auditiva: true,
    def_visual: false,
    sub_tipo: 'SUBT-123456',
    barreira: 'BARR-123456',
    acessbilidade: 'ACES-123456'
  };

  test('should create candidate with correct properties', () => {
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
    expect(candidate.def_auditiva).toBe(true);
    expect(candidate.def_motora).toBe(false);
    expect(candidate.def_visual).toBe(false);
    expect(candidate.status).toBe(true);
  });

  test('should set correct deficiency prefix for auditory disability', () => {
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

    expect(candidate.def).toMatch(/^DAUDI-\d{1,6}$/);
  });

  test('should set correct deficiency prefix for motor disability', () => {
    const candidate = new Candidate(
      mockCandidateData.name,
      mockCandidateData.email,
      mockCandidateData.confirme_email,
      mockCandidateData.senha,
      mockCandidateData.confirme_senha,
      mockCandidateData.telefone,
      mockCandidateData.cpf,
      mockCandidateData.data_nascimento,
      true,  // def_motora
      false, // def_auditiva
      false, // def_visual
      mockCandidateData.sub_tipo,
      mockCandidateData.barreira,
      mockCandidateData.acessbilidade
    );

    expect(candidate.def).toMatch(/^DMOTO-\d{1,6}$/);
  });

  test('should set correct deficiency prefix for visual disability', () => {
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

    expect(candidate.def).toMatch(/^DVISU-\d{1,6}$/);
  });

  test('should generate candidate ID with CAND prefix', async () => {
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
    expect(candidate.id).toMatch(/^CAND-\d{1,6}$/);
  });

  test('should update password', async () => {
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

    const newPassword = 'newPassword123';
    await candidate.SetCryptPass(newPassword);
    expect(candidate.senha).toBe(newPassword);
  });
});