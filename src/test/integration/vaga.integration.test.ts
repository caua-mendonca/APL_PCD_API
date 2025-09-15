import { setupTestDatabase, cleanTestDatabase, closeTestDatabase, testPool } from '../setup/testSetup.js';

describe('Testes de Integração - Vagas', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    await cleanTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  const validVagaData = {
    id: 'VAGA-123456',
    data_inicio: '2024-01-01',
    data_fim: '2024-12-31',
    status: true,
    titulo: 'Desenvolvedor Frontend',
    descricao: 'Vaga para desenvolvedor frontend com experiência em React',
    salario: 5000.00,
    localidade: 'São Paulo, SP',
    acess: 'Rampa de acesso, elevador',
    id_creator: 'EMP-123456'
  };

  describe('Operações CRUD - Vagas', () => {
    test('deve criar vaga com dados válidos', async () => {
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        validVagaData.id,
        validVagaData.data_inicio,
        validVagaData.data_fim,
        validVagaData.status,
        validVagaData.titulo,
        validVagaData.descricao,
        validVagaData.salario,
        validVagaData.localidade,
        validVagaData.acess,
        validVagaData.id_creator
      ]);

      const result = await testPool.query('SELECT * FROM tb_vaga WHERE id = $1', [validVagaData.id]);
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].titulo).toBe(validVagaData.titulo);
      expect(result.rows[0].salario).toBe('5000.00');
    });

    test('deve listar vagas ativas', async () => {
      // Inserir múltiplas vagas
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20),
        ($21, $22, $23, $24, $25, $26, $27, $28, $29, $30)
      `, [
        'VAGA-123456', '2024-01-01', '2024-12-31', true, 'Dev Frontend', 'Descrição 1', 
        5000.00, 'São Paulo', 'Rampa', 'EMP-123456',
        'VAGA-789012', '2024-02-01', '2024-11-30', true, 'Dev Backend', 'Descrição 2', 
        6000.00, 'Rio de Janeiro', 'Elevador', 'EMP-789012',
        'VAGA-345678', '2024-03-01', '2024-10-31', false, 'Designer', 'Descrição 3', 
        4000.00, 'Belo Horizonte', 'Acessível', 'EMP-345678'
      ]);

      const result = await testPool.query('SELECT * FROM tb_vaga WHERE status = true');
      expect(result.rows).toHaveLength(2);
    });

    test('deve buscar vaga por ID', async () => {
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        validVagaData.id,
        validVagaData.data_inicio,
        validVagaData.data_fim,
        validVagaData.status,
        validVagaData.titulo,
        validVagaData.descricao,
        validVagaData.salario,
        validVagaData.localidade,
        validVagaData.acess,
        validVagaData.id_creator
      ]);

      const result = await testPool.query('SELECT * FROM tb_vaga WHERE id = $1', [validVagaData.id]);
      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].id).toBe(validVagaData.id);
    });

    test('deve atualizar status da vaga', async () => {
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        validVagaData.id,
        validVagaData.data_inicio,
        validVagaData.data_fim,
        validVagaData.status,
        validVagaData.titulo,
        validVagaData.descricao,
        validVagaData.salario,
        validVagaData.localidade,
        validVagaData.acess,
        validVagaData.id_creator
      ]);

      // Desativar vaga
      await testPool.query('UPDATE tb_vaga SET status = false WHERE id = $1', [validVagaData.id]);

      const result = await testPool.query('SELECT * FROM tb_vaga WHERE id = $1', [validVagaData.id]);
      expect(result.rows[0].status).toBe(false);
    });

    test('deve validar datas da vaga', async () => {
      const vagaComDataInvalida = {
        ...validVagaData,
        id: 'VAGA-999999',
        data_inicio: '2024-12-31',
        data_fim: '2024-01-01' // Data fim antes do início
      };

      // Este teste verifica se a lógica de validação de datas funciona
      // Na implementação real, isso deveria ser validado antes da inserção
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        vagaComDataInvalida.id,
        vagaComDataInvalida.data_inicio,
        vagaComDataInvalida.data_fim,
        vagaComDataInvalida.status,
        vagaComDataInvalida.titulo,
        vagaComDataInvalida.descricao,
        vagaComDataInvalida.salario,
        vagaComDataInvalida.localidade,
        vagaComDataInvalida.acess,
        vagaComDataInvalida.id_creator
      ]);

      const result = await testPool.query(`
        SELECT *, 
        CASE WHEN data_fim < data_inicio THEN true ELSE false END as data_invalida
        FROM tb_vaga WHERE id = $1
      `, [vagaComDataInvalida.id]);

      expect(result.rows[0].data_invalida).toBe(true);
    });

    test('deve filtrar vagas por localidade', async () => {
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
      `, [
        'VAGA-123456', '2024-01-01', '2024-12-31', true, 'Dev Frontend', 'Descrição 1', 
        5000.00, 'São Paulo', 'Rampa', 'EMP-123456',
        'VAGA-789012', '2024-02-01', '2024-11-30', true, 'Dev Backend', 'Descrição 2', 
        6000.00, 'Rio de Janeiro', 'Elevador', 'EMP-789012'
      ]);

      const result = await testPool.query(`
        SELECT * FROM tb_vaga WHERE localidade ILIKE $1 AND status = true
      `, ['%São Paulo%']);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].localidade).toBe('São Paulo');
    });

    test('deve filtrar vagas por faixa salarial', async () => {
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10),
        ($11, $12, $13, $14, $15, $16, $17, $18, $19, $20),
        ($21, $22, $23, $24, $25, $26, $27, $28, $29, $30)
      `, [
        'VAGA-123456', '2024-01-01', '2024-12-31', true, 'Dev Junior', 'Descrição 1', 
        3000.00, 'São Paulo', 'Rampa', 'EMP-123456',
        'VAGA-789012', '2024-02-01', '2024-11-30', true, 'Dev Pleno', 'Descrição 2', 
        6000.00, 'Rio de Janeiro', 'Elevador', 'EMP-789012',
        'VAGA-345678', '2024-03-01', '2024-10-31', true, 'Dev Senior', 'Descrição 3', 
        10000.00, 'Belo Horizonte', 'Acessível', 'EMP-345678'
      ]);

      const result = await testPool.query(`
        SELECT * FROM tb_vaga 
        WHERE salario BETWEEN $1 AND $2 AND status = true
        ORDER BY salario
      `, [5000, 8000]);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].titulo).toBe('Dev Pleno');
    });
  });

  describe('Relacionamentos - Vagas', () => {
    test('deve validar existência do criador da vaga', async () => {
      // Primeiro inserir uma empresa
      await testPool.query(`
        INSERT INTO tb_empresa (
          id, nome_fantasia, razao_social, email, senha, cnpj, 
          telefone, status, acessibilidade
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      `, [
        'EMP-123456', 'Tech Corp', 'Tech Corp LTDA', 'contato@techcorp.com',
        'hashedPassword', '12345678000195', '1133334444', true, 'Totalmente acessível'
      ]);

      // Inserir vaga com criador válido
      await testPool.query(`
        INSERT INTO tb_vaga (
          id, data_inicio, data_fim, status, titulo, descricao, 
          salario, localidade, acess, id_creator
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      `, [
        validVagaData.id,
        validVagaData.data_inicio,
        validVagaData.data_fim,
        validVagaData.status,
        validVagaData.titulo,
        validVagaData.descricao,
        validVagaData.salario,
        validVagaData.localidade,
        validVagaData.acess,
        'EMP-123456'
      ]);

      // Verificar se a vaga foi criada e tem o criador correto
      const result = await testPool.query(`
        SELECT v.*, e.nome_fantasia 
        FROM tb_vaga v
        LEFT JOIN tb_empresa e ON v.id_creator = e.id
        WHERE v.id = $1
      `, [validVagaData.id]);

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].nome_fantasia).toBe('Tech Corp');
    });
  });
});