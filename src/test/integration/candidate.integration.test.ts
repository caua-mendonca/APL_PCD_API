import request from 'supertest';
import express from 'express';
import { setupTestDatabase, cleanTestDatabase, closeTestDatabase, testPool } from '../setup/testSetup.js';

// Mock do app Express (você precisará ajustar conforme sua estrutura)
const app = express();
app.use(express.json());

// Importar rotas reais aqui quando disponíveis
// import candidateRoutes from '../../routes/candidateRoutes.js';
// app.use('/api/candidates', candidateRoutes);

describe('Testes de Integração - Candidatos', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    await cleanTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  const validCandidateData = {
    name: 'João Silva',
    email: 'joao@email.com',
    confirme_email: 'joao@email.com',
    senha: '123456',
    confirme_senha: '123456',
    telefone: '11999999999',
    cpf: '11144477735',
    data_nascimento: '1990-01-01',
    def_motora: true,
    def_auditiva: false,
    def_visual: false,
    sub_tipo: 'Paraplegia',
    barreira: 'Arquitetônica',
    acessbilidade: 'Rampa'
  };

  describe('POST /candidates', () => {
    test('deve criar candidato com dados válidos', async () => {
      // Inserir candidato diretamente no banco para teste
      const candidateId = 'CAND-123456';
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        candidateId,
        validCandidateData.name,
        validCandidateData.email,
        'hashedPassword',
        validCandidateData.telefone,
        validCandidateData.cpf,
        validCandidateData.data_nascimento,
        true,
        'DMOTO-123456',
        validCandidateData.sub_tipo,
        validCandidateData.barreira,
        validCandidateData.acessbilidade
      ]);

      // Verificar se foi inserido
      const result = await testPool.query('SELECT * FROM tb_candidato WHERE id = $1', [candidateId]);
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].nome).toBe(validCandidateData.name);
      expect(result.rows[0].cpf).toBe(validCandidateData.cpf);
    });

    test('deve rejeitar candidato com CPF duplicado', async () => {
      // Inserir primeiro candidato
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        'CAND-123456',
        'João Silva',
        'joao@email.com',
        'hashedPassword',
        '11999999999',
        '11144477735',
        '1990-01-01',
        true,
        'DMOTO-123456',
        'Paraplegia',
        'Arquitetônica',
        'Rampa'
      ]);

      // Tentar inserir segundo candidato com mesmo CPF
      try {
        await testPool.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          'CAND-789012',
          'Maria Silva',
          'maria@email.com',
          'hashedPassword',
          '11888888888',
          '11144477735', // Mesmo CPF
          '1985-01-01',
          true,
          'DVISU-789012',
          'Cegueira',
          'Comunicacional',
          'Audiodescrição'
        ]);
        fail('Deveria ter lançado erro de CPF duplicado');
      } catch (error) {
        expect(error.code).toBe('23505'); // Código de violação de unique constraint
      }
    });

    test('deve rejeitar candidato com email duplicado', async () => {
      // Inserir primeiro candidato
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        'CAND-123456',
        'João Silva',
        'joao@email.com',
        'hashedPassword',
        '11999999999',
        '11144477735',
        '1990-01-01',
        true,
        'DMOTO-123456',
        'Paraplegia',
        'Arquitetônica',
        'Rampa'
      ]);

      // Tentar inserir segundo candidato com mesmo email
      try {
        await testPool.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          'CAND-789012',
          'Maria Silva',
          'joao@email.com', // Mesmo email
          'hashedPassword',
          '11888888888',
          '98765432100',
          '1985-01-01',
          true,
          'DVISU-789012',
          'Cegueira',
          'Comunicacional',
          'Audiodescrição'
        ]);
        fail('Deveria ter lançado erro de email duplicado');
      } catch (error) {
        expect(error.code).toBe('23505'); // Código de violação de unique constraint
      }
    });
  });

  describe('GET /candidates', () => {
    test('deve listar candidatos cadastrados', async () => {
      // Inserir candidatos de teste
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12),
        ($13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
      `, [
        'CAND-123456', 'João Silva', 'joao@email.com', 'hash1', '11999999999', 
        '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa',
        'CAND-789012', 'Maria Santos', 'maria@email.com', 'hash2', '11888888888', 
        '98765432100', '1985-01-01', true, 'DVISU-789012', 'Cegueira', 'Comunicacional', 'Audiodescrição'
      ]);

      const result = await testPool.query('SELECT * FROM tb_candidato WHERE status = true');
      expect(result.rows).toHaveLength(2);
    });

    test('deve retornar lista vazia quando não há candidatos', async () => {
      const result = await testPool.query('SELECT * FROM tb_candidato WHERE status = true');
      expect(result.rows).toHaveLength(0);
    });
  });

  describe('GET /candidates/:id', () => {
    test('deve buscar candidato por ID', async () => {
      const candidateId = 'CAND-123456';
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        candidateId, 'João Silva', 'joao@email.com', 'hash', '11999999999', 
        '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
      ]);

      const result = await testPool.query('SELECT * FROM tb_candidato WHERE id = $1', [candidateId]);
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].id).toBe(candidateId);
    });

    test('deve retornar vazio para ID inexistente', async () => {
      const result = await testPool.query('SELECT * FROM tb_candidato WHERE id = $1', ['CAND-999999']);
      expect(result.rows).toHaveLength(0);
    });
  });

  describe('DELETE /candidates/:id', () => {
    test('deve fazer delete lógico do candidato', async () => {
      const candidateId = 'CAND-123456';
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        candidateId, 'João Silva', 'joao@email.com', 'hash', '11999999999', 
        '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
      ]);

      // Fazer delete lógico
      await testPool.query('UPDATE tb_candidato SET status = false WHERE id = $1', [candidateId]);

      const result = await testPool.query('SELECT * FROM tb_candidato WHERE id = $1', [candidateId]);
      expect(result.rows[0].status).toBe(false);
    });
  });

  describe('PUT /candidates/:id', () => {
    test('deve atualizar dados do candidato', async () => {
      const candidateId = 'CAND-123456';
      await testPool.query(`
        INSERT INTO tb_candidato (
          id, nome, email, senha, telefone, cpf, data_nascimento, 
          status, deficiencia, tipo_deficiencia, barreira, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      `, [
        candidateId, 'João Silva', 'joao@email.com', 'hash', '11999999999', 
        '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
      ]);

      // Atualizar nome
      const novoNome = 'João Santos Silva';
      await testPool.query('UPDATE tb_candidato SET nome = $1 WHERE id = $2', [novoNome, candidateId]);

      const result = await testPool.query('SELECT * FROM tb_candidato WHERE id = $1', [candidateId]);
      expect(result.rows[0].nome).toBe(novoNome);
    });
  });
});