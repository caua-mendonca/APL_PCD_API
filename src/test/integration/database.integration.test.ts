import { setupTestDatabase, cleanTestDatabase, closeTestDatabase, testPool } from '../setup/testSetup.js';

describe('Testes de Integração - Banco de Dados', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    await cleanTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('Conexão e Estrutura do Banco', () => {
    test('deve conectar ao banco de dados', async () => {
      const result = await testPool.query('SELECT NOW()');
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].now).toBeDefined();
    });

    test('deve ter tabelas criadas corretamente', async () => {
      const tables = await testPool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_type = 'BASE TABLE'
      `);

      const tableNames = tables.rows.map(row => row.table_name);
      expect(tableNames).toContain('tb_candidato');
      expect(tableNames).toContain('tb_empresa');
      expect(tableNames).toContain('tb_vaga');
    });

    test('deve validar estrutura da tabela tb_candidato', async () => {
      const columns = await testPool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns 
        WHERE table_name = 'tb_candidato'
        ORDER BY ordinal_position
      `);

      const columnNames = columns.rows.map(row => row.column_name);
      expect(columnNames).toContain('id');
      expect(columnNames).toContain('nome');
      expect(columnNames).toContain('email');
      expect(columnNames).toContain('cpf');
      expect(columnNames).toContain('data_nascimento');
    });

    test('deve validar constraints da tabela tb_candidato', async () => {
      const constraints = await testPool.query(`
        SELECT constraint_name, constraint_type
        FROM information_schema.table_constraints 
        WHERE table_name = 'tb_candidato'
      `);

      const constraintTypes = constraints.rows.map(row => row.constraint_type);
      expect(constraintTypes).toContain('PRIMARY KEY');
      expect(constraintTypes).toContain('UNIQUE');
    });
  });

  describe('Operações Transacionais', () => {
    test('deve fazer rollback em caso de erro', async () => {
      const client = await testPool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Inserir candidato válido
        await client.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          'CAND-123456', 'João Silva', 'joao@email.com', 'hash', '11999999999',
          '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
        ]);

        // Tentar inserir candidato com CPF duplicado (deve falhar)
        await client.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          'CAND-789012', 'Maria Silva', 'maria@email.com', 'hash', '11888888888',
          '11144477735', '1985-01-01', true, 'DVISU-789012', 'Cegueira', 'Comunicacional', 'Audiodescrição'
        ]);

        await client.query('COMMIT');
        fail('Deveria ter falhado devido ao CPF duplicado');
      } catch (error) {
        await client.query('ROLLBACK');
        expect(error.code).toBe('23505'); // Violação de unique constraint
      } finally {
        client.release();
      }

      // Verificar que nenhum registro foi inserido
      const result = await testPool.query('SELECT * FROM tb_candidato');
      expect(result.rows).toHaveLength(0);
    });

    test('deve fazer commit em transação bem-sucedida', async () => {
      const client = await testPool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Inserir empresa
        await client.query(`
          INSERT INTO tb_empresa (
            id, nome_fantasia, razao_social, email, senha, cnpj, 
            telefone, status, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `, [
          'EMP-123456', 'Tech Corp', 'Tech Corp LTDA', 'contato@techcorp.com',
          'hashedPassword', '12345678000195', '1133334444', true, 'Totalmente acessível'
        ]);

        // Inserir vaga relacionada
        await client.query(`
          INSERT INTO tb_vaga (
            id, data_inicio, data_fim, status, titulo, descricao, 
            salario, localidade, acess, id_creator
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `, [
          'VAGA-123456', '2024-01-01', '2024-12-31', true, 'Desenvolvedor',
          'Vaga para desenvolvedor', 5000.00, 'São Paulo', 'Rampa', 'EMP-123456'
        ]);

        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }

      // Verificar que os registros foram inseridos
      const empresas = await testPool.query('SELECT * FROM tb_empresa');
      const vagas = await testPool.query('SELECT * FROM tb_vaga');
      
      expect(empresas.rows).toHaveLength(1);
      expect(vagas.rows).toHaveLength(1);
    });
  });

  describe('Performance e Índices', () => {
    test('deve executar consultas de forma eficiente', async () => {
      // Inserir múltiplos candidatos para teste de performance
      const candidatos = [];
      for (let i = 1; i <= 100; i++) {
        candidatos.push([
          `CAND-${i.toString().padStart(6, '0')}`,
          `Candidato ${i}`,
          `candidato${i}@email.com`,
          'hashedPassword',
          '11999999999',
          `${i.toString().padStart(11, '0')}`,
          '1990-01-01',
          true,
          `DMOTO-${i.toString().padStart(6, '0')}`,
          'Paraplegia',
          'Arquitetônica',
          'Rampa'
        ]);
      }

      // Inserir em lote
      for (const candidato of candidatos) {
        await testPool.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, candidato);
      }

      // Testar consulta com filtro
      const startTime = Date.now();
      const result = await testPool.query(`
        SELECT * FROM tb_candidato 
        WHERE status = true AND nome ILIKE $1
        LIMIT 10
      `, ['%Candidato%']);
      const endTime = Date.now();

      expect(result.rows.length).toBeGreaterThan(0);
      expect(endTime - startTime).toBeLessThan(1000); // Menos de 1 segundo
    });

    test('deve validar índices únicos', async () => {
      const indexes = await testPool.query(`
        SELECT indexname, indexdef
        FROM pg_indexes 
        WHERE tablename IN ('tb_candidato', 'tb_empresa', 'tb_vaga')
      `);

      expect(indexes.rows.length).toBeGreaterThan(0);
    });
  });

  describe('Integridade Referencial', () => {
    test('deve manter integridade entre tabelas relacionadas', async () => {
      // Inserir empresa
      await testPool.query(`
        INSERT INTO tb_empresa (
          id, nome_fantasia, razao_social, email, senha, cnpj, 
          telefone, status, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        'EMP-123456', 'Tech Corp', 'Tech Corp LTDA', 'contato@techcorp.com',
        'hashedPassword', '12345678000195', '1133334444', true, 'Totalmente acessível'
      ]);

      // Inserir vaga com referência à empresa
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        'VAGA-123456', '2024-01-01', '2024-12-31', true, 'Desenvolvedor',
        'Vaga para desenvolvedor', 5000.00, 'São Paulo', 'Rampa', 'EMP-123456'
      ]);

      // Verificar relacionamento
      const result = await testPool.query(`
        SELECT v.titulo, e.nome_fantasia
        FROM tb_vaga v
        LEFT JOIN tb_empresa e ON v.id_creator = e.id
        WHERE v.id = $1
      `, ['VAGA-123456']);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].nome_fantasia).toBe('Tech Corp');
    });
  });

  describe('Validação de Dados', () => {
    test('deve validar tipos de dados corretos', async () => {
      // Tentar inserir data inválida
      try {
        await testPool.query(`
          INSERT INTO tb_candidato (
            id, nome, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `, [
          'CAND-123456', 'João Silva', 'joao@email.com', 'hash', '11999999999',
          '11144477735', 'data_invalida', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
        ]);
        fail('Deveria ter falhado com data inválida');
      } catch (error) {
        expect(error.code).toBe('22007'); // Formato de data inválido
      }
    });

    test('deve validar campos obrigatórios', async () => {
      // Tentar inserir sem campo obrigatório
      try {
        await testPool.query(`
          INSERT INTO tb_candidato (
            id, email, senha, telefone, cpf, data_nascimento, 
            status, deficiencia, tipo_deficiencia, barreira, acessibilidade
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `, [
          'CAND-123456', 'joao@email.com', 'hash', '11999999999',
          '11144477735', '1990-01-01', true, 'DMOTO-123456', 'Paraplegia', 'Arquitetônica', 'Rampa'
        ]);
        fail('Deveria ter falhado sem campo nome');
      } catch (error) {
        expect(error.code).toBe('23502'); // Violação de NOT NULL
      }
    });
  });
});