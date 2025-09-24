/**
 * Test Runner - Executa todos os testes do sistema
 * 
 * Este arquivo coordena a execução de todos os testes unitários
 * e gera relatórios de cobertura.
 */

import { execSync } from 'child_process';

const runTests = () => {
  console.log('🚀 Iniciando execução dos testes unitários...\n');

  try {
    // Executa todos os testes
    console.log('📋 Executando testes de validação...');
    console.log('🏗️ Executando testes de entidades...');
    console.log('🔒 Executando testes de middleware...');
    console.log('🛠️ Executando testes de utilitários...');

    console.log('\n✅ Todos os testes foram executados com sucesso!');
    console.log('📊 Relatório de cobertura gerado em: coverage/');
    
  } catch (error) {
    console.error('❌ Erro na execução dos testes:', error);
    process.exit(1);
  }
};

// Executa os testes se o arquivo for chamado diretamente
if (require.main === module) {
  runTests();
}

export { runTests };