#!/usr/bin/env node

/**
 * 🧪 Test Runner - APL PCD API
 * Script executável para rodar todos os testes com relatórios detalhados
 * 
 * Uso:
 *   npm run test:runner
 *   npm run test:runner -- --type=security
 *   npm run test:runner -- --coverage
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// Cores para output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Banner
console.log(`
${colors.cyan}${colors.bright}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🧪 APL PCD API - Test Suite Runner                        ║
║   Enterprise-Grade Quality Assurance                        ║
║   Version: 2.5.0                                            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}
`);

// Parse argumentos
const args = process.argv.slice(2);
const testType = args.find(arg => arg.startsWith('--type='))?.split('=')[1] || 'all';
const withCoverage = args.includes('--coverage');
const verbose = args.includes('--verbose');

// Configuração de testes
const testSuites = {
  unit: {
    name: '🔬 Testes Unitários',
    command: 'jest --testPathPattern=unit',
    description: 'Testes de componentes isolados',
  },
  integration: {
    name: '🔗 Testes de Integração',
    command: 'jest --testPathPattern=integration',
    description: 'Testes de integração entre componentes',
  },
  security: {
    name: '🛡️ Testes de Segurança',
    command: 'jest --testPathPattern=security',
    description: 'Testes de vulnerabilidades e segurança',
  },
  performance: {
    name: '⚡ Testes de Performance',
    command: 'jest --testPathPattern=performance',
    description: 'Testes de carga e performance',
  },
  e2e: {
    name: '🌍 Testes E2E',
    command: 'jest --testPathPattern=e2e',
    description: 'Testes end-to-end de fluxos completos',
  },
  validation: {
    name: '✅ Testes de Validação',
    command: 'jest --testPathPattern=validation',
    description: 'Testes de validação de dados',
  },
  controllers: {
    name: '🎮 Testes de Controllers',
    command: 'jest --testPathPattern=controllers',
    description: 'Testes de controllers da API',
  },
};

// Função para executar teste
async function runTest(suite: any, coverage: boolean = false) {
  console.log(`\n${colors.blue}${colors.bright}═══════════════════════════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.bright}${suite.name}${colors.reset}`);
  console.log(`${colors.cyan}${suite.description}${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════════════════════════════${colors.reset}\n`);
  
  const startTime = Date.now();
  
  try {
    const cmd = coverage ? `${suite.command} --coverage` : suite.command;
    execSync(cmd, { stdio: 'inherit' });
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n${colors.green}${colors.bright}✅ ${suite.name} - PASSOU${colors.reset}`);
    console.log(`${colors.cyan}⏱️  Tempo: ${duration}s${colors.reset}`);
    
    return { success: true, duration: parseFloat(duration), suite: suite.name };
  } catch (error) {
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log(`\n${colors.red}${colors.bright}❌ ${suite.name} - FALHOU${colors.reset}`);
    console.log(`${colors.cyan}⏱️  Tempo: ${duration}s${colors.reset}`);
    
    return { success: false, duration: parseFloat(duration), suite: suite.name, error };
  }
}

// Função principal
async function main() {
  const startTime = Date.now();
  const results: any[] = [];
  
  console.log(`${colors.yellow}📋 Configuração:${colors.reset}`);
  console.log(`   Tipo: ${testType}`);
  console.log(`   Cobertura: ${withCoverage ? 'Sim' : 'Não'}`);
  console.log(`   Verbose: ${verbose ? 'Sim' : 'Não'}`);
  
  // Executar testes
  if (testType === 'all') {
    console.log(`\n${colors.bright}Executando TODOS os testes...${colors.reset}\n`);
    
    for (const [key, suite] of Object.entries(testSuites)) {
      const result = await runTest(suite, withCoverage);
      results.push(result);
    }
  } else {
    const suite = testSuites[testType as keyof typeof testSuites];
    
    if (!suite) {
      console.error(`${colors.red}Tipo de teste inválido: ${testType}${colors.reset}`);
      console.log(`${colors.yellow}Tipos disponíveis: ${Object.keys(testSuites).join(', ')}${colors.reset}`);
      process.exit(1);
    }
    
    const result = await runTest(suite, withCoverage);
    results.push(result);
  }
  
  // Relatório final
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(2);
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const total = results.length;
  
  console.log(`\n\n${colors.cyan}${colors.bright}╔══════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}║                   RELATÓRIO FINAL                            ║${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}╚══════════════════════════════════════════════════════════════╝${colors.reset}\n`);
  
  console.log(`${colors.bright}📊 Estatísticas:${colors.reset}`);
  console.log(`   Total de Suítes: ${total}`);
  console.log(`   ${colors.green}✅ Passou: ${passed}${colors.reset}`);
  console.log(`   ${colors.red}❌ Falhou: ${failed}${colors.reset}`);
  console.log(`   ⏱️  Tempo Total: ${totalDuration}s`);
  console.log(`   📈 Taxa de Sucesso: ${((passed / total) * 100).toFixed(1)}%\n`);
  
  // Detalhes por suíte
  console.log(`${colors.bright}📋 Detalhes por Suíte:${colors.reset}`);
  results.forEach(result => {
    const icon = result.success ? `${colors.green}✅${colors.reset}` : `${colors.red}❌${colors.reset}`;
    const time = `${colors.cyan}${result.duration.toFixed(2)}s${colors.reset}`;
    console.log(`   ${icon} ${result.suite.padEnd(40)} ${time}`);
  });
  
  // Gerar relatório JSON
  const reportPath = path.join(process.cwd(), 'test-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    totalDuration: parseFloat(totalDuration),
    total,
    passed,
    failed,
    successRate: (passed / total) * 100,
    results,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n${colors.yellow}📄 Relatório salvo em: test-report.json${colors.reset}`);
  
  // Exit code
  if (failed > 0) {
    console.log(`\n${colors.red}${colors.bright}❌ Alguns testes falharam!${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}${colors.bright}✅ Todos os testes passaram!${colors.reset}\n`);
    process.exit(0);
  }
}

// Executar
main().catch(error => {
  console.error(`${colors.red}Erro fatal: ${error.message}${colors.reset}`);
  process.exit(1);
});
