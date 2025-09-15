#!/usr/bin/env node

/**
 * Script para configurar ambiente de testes
 * Executa antes dos testes para garantir que o ambiente está pronto
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente de teste
dotenv.config({ path: '.env.test' });

const DB_NAME = process.env.DB_DATABASE || 'apl_pcd_test';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';

console.log('🔧 Configurando ambiente de testes...');

// Verificar se o arquivo .env.test existe
if (!existsSync('.env.test')) {
  console.error('❌ Arquivo .env.test não encontrado!');
  console.log('📝 Crie o arquivo .env.test com as configurações do banco de teste.');
  process.exit(1);
}

try {
  // Verificar se PostgreSQL está rodando
  console.log('🔍 Verificando conexão com PostgreSQL...');
  execSync(`psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -c "SELECT 1;" postgres`, {
    stdio: 'pipe'
  });
  console.log('✅ PostgreSQL está rodando');

  // Criar banco de teste se não existir
  console.log(`🗄️ Verificando banco de dados de teste: ${DB_NAME}`);
  try {
    execSync(`psql -h ${DB_HOST} -p ${DB_PORT} -U ${DB_USER} -c "CREATE DATABASE ${DB_NAME};" postgres`, {
      stdio: 'pipe'
    });
    console.log(`✅ Banco de dados ${DB_NAME} criado`);
  } catch (error) {
    if (error.message.includes('already exists')) {
      console.log(`✅ Banco de dados ${DB_NAME} já existe`);
    } else {
      throw error;
    }
  }

  console.log('🎉 Ambiente de testes configurado com sucesso!');
  console.log('🚀 Execute: npm test');

} catch (error) {
  console.error('❌ Erro ao configurar ambiente de testes:');
  console.error(error.message);
  console.log('\n📋 Verifique se:');
  console.log('  - PostgreSQL está instalado e rodando');
  console.log('  - As credenciais no .env.test estão corretas');
  console.log('  - O usuário tem permissões para criar bancos de dados');
  process.exit(1);
}