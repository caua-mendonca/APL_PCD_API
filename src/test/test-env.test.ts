import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Caminho absoluto para o arquivo .env na raiz do projeto
const envPath = path.resolve(process.cwd(), '.env');

// Verifica se o arquivo .env existe e mostra o conteúdo
try {
  const fileContent = fs.readFileSync(envPath, { encoding: 'utf8' });
  console.log(`✅ .env encontrado em: ${envPath}`);
  console.log('Conteúdo do .env:');
  console.log(fileContent);
} catch (error) {
  console.error(`❌ Não foi possível ler o arquivo .env em ${envPath}:`, error);
  process.exit(1); // Finaliza o processo para evitar falhas silenciosas
}

// Carrega as variáveis do .env explicitamente
dotenv.config({ path: envPath });

// Exibe as variáveis de ambiente no console
console.log('--- Variáveis de ambiente carregadas ---');
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_PORT:', process.env.DB_PORT);
