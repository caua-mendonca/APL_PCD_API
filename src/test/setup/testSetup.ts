import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const testPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: `${process.env.DB_DATABASE}_test`,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const setupTestDatabase = async () => {
  try {
    await testPool.query(`
      CREATE TABLE IF NOT EXISTS tb_candidato (
        id VARCHAR(20) PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        telefone VARCHAR(20),
        cpf VARCHAR(14) UNIQUE NOT NULL,
        data_nascimento DATE NOT NULL,
        status BOOLEAN DEFAULT true,
        deficiencia VARCHAR(20),
        tipo_deficiencia VARCHAR(255),
        barreira VARCHAR(255),
        acessibilidade VARCHAR(255)
      );
    `);

    await testPool.query(`
      CREATE TABLE IF NOT EXISTS tb_empresa (
        id VARCHAR(20) PRIMARY KEY,
        nome_fantasia VARCHAR(255) NOT NULL,
        razao_social VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL,
        cnpj VARCHAR(18) UNIQUE NOT NULL,
        telefone VARCHAR(20),
        status BOOLEAN DEFAULT true,
        acessibilidade VARCHAR(255)
      );
    `);

    await testPool.query(`
      CREATE TABLE IF NOT EXISTS tb_vaga (
        id VARCHAR(20) PRIMARY KEY,
        data_inicio DATE NOT NULL,
        data_fim DATE NOT NULL,
        status BOOLEAN DEFAULT true,
        titulo VARCHAR(255) NOT NULL,
        descricao TEXT,
        salario DECIMAL(10,2),
        localidade VARCHAR(255),
        acess VARCHAR(255),
        id_creator VARCHAR(20)
      );
    `);
  } catch (error) {
    console.error('Erro ao configurar banco de teste:', error);
    throw error;
  }
};

export const cleanTestDatabase = async () => {
  try {
    await testPool.query('DELETE FROM tb_candidato');
    await testPool.query('DELETE FROM tb_empresa');
    await testPool.query('DELETE FROM tb_vaga');
  } catch (error) {
    console.error('Erro ao limpar banco de teste:', error);
    throw error;
  }
};

export const closeTestDatabase = async () => {
  await testPool.end();
};