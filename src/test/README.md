# 🧪 Guia de Testes - APL PCD API

## 📋 Estrutura de Testes

```
src/test/
├── setup/                    # Configuração dos testes
│   └── testSetup.ts         # Setup do banco de dados de teste
├── unit/                    # Testes unitários
│   ├── validation/          # Testes de validação
│   ├── entities/           # Testes das classes de entidade
│   ├── models/             # Testes dos models
│   └── repositories/       # Testes dos repositórios
├── integration/            # Testes de integração
│   ├── candidate.integration.test.ts
│   ├── vaga.integration.test.ts
│   └── database.integration.test.ts
├── jest.setup.ts           # Configuração global do Jest
└── README.md              # Este arquivo
```

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar testes em modo watch
```bash
npm run test:watch
```

### Executar testes com cobertura
```bash
npm run test:coverage
```

### Executar apenas testes unitários
```bash
npm test -- --testPathPattern=unit
```

### Executar apenas testes de integração
```bash
npm test -- --testPathPattern=integration
```

## 🔧 Configuração do Ambiente de Teste

### 1. Banco de Dados de Teste
Crie um banco de dados separado para testes:
```sql
CREATE DATABASE apl_pcd_test;
```

### 2. Variáveis de Ambiente
Configure o arquivo `.env.test` com as credenciais do banco de teste.

### 3. Estrutura das Tabelas
Os testes criam automaticamente as tabelas necessárias no banco de teste.

## 📊 Cobertura de Testes

### Metas de Cobertura
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

### Arquivos Excluídos da Cobertura
- `src/test/**` - Arquivos de teste
- `src/**/*.d.ts` - Arquivos de definição TypeScript
- `src/index.ts` - Arquivo principal

## 🧪 Tipos de Testes

### Testes Unitários
Testam componentes isolados:
- **Validações**: CPF, idade, email
- **Entidades**: Classes de domínio
- **Models**: Lógica de negócio
- **Repositórios**: Operações de banco de dados

### Testes de Integração
Testam a integração entre componentes:
- **Candidatos**: CRUD completo
- **Vagas**: Operações e relacionamentos
- **Banco de Dados**: Integridade e performance

## 📝 Convenções de Nomenclatura

### Arquivos de Teste
- Testes unitários: `*.test.ts`
- Testes de integração: `*.integration.test.ts`

### Estrutura dos Testes
```typescript
describe('Componente/Funcionalidade', () => {
  beforeEach(() => {
    // Setup antes de cada teste
  });

  describe('método/função', () => {
    test('deve fazer algo específico', () => {
      // Arrange
      // Act
      // Assert
    });

    test('deve tratar erro específico', () => {
      // Teste de cenário de erro
    });
  });
});
```

## 🔍 Mocks e Stubs

### Mocking de Dependências
```typescript
jest.mock('../../../repositories/queryTools.js');
```

### Mocking de Variáveis de Ambiente
```typescript
process.env.STATUS_200 = 'Sucesso';
```

### Mocking do Pool de Conexão
```typescript
const mockPool = pool as jest.Mocked<typeof pool>;
mockPool.query.mockResolvedValue({ rows: [], rowCount: 1 });
```

## 🛠️ Utilitários de Teste

### Setup do Banco de Teste
- `setupTestDatabase()`: Cria estrutura das tabelas
- `cleanTestDatabase()`: Limpa dados entre testes
- `closeTestDatabase()`: Fecha conexões

### Dados de Teste
Utilize dados consistentes e válidos:
```typescript
const validCandidateData = {
  name: 'João Silva',
  email: 'joao@email.com',
  cpf: '11144477735', // CPF válido
  // ...
};
```

## 🐛 Debugging de Testes

### Executar teste específico
```bash
npm test -- --testNamePattern="deve criar candidato"
```

### Modo verbose
```bash
npm test -- --verbose
```

### Debug com breakpoints
```bash
npm test -- --runInBand --detectOpenHandles
```

## 📈 Métricas de Qualidade

### Indicadores Importantes
- **Cobertura de código**: >70%
- **Tempo de execução**: <30s para suite completa
- **Flakiness**: 0% (testes devem ser determinísticos)
- **Manutenibilidade**: Testes legíveis e bem estruturados

### Relatórios
- **HTML**: `coverage/lcov-report/index.html`
- **LCOV**: `coverage/lcov.info`
- **Console**: Saída direta no terminal

## 🔄 CI/CD Integration

### GitHub Actions (exemplo)
```yaml
- name: Run Tests
  run: |
    npm test
    npm run test:coverage
```

### Pre-commit Hooks
```json
{
  "pre-commit": "npm test"
}
```

## 📚 Recursos Adicionais

### Documentação
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Node.js Applications](https://nodejs.org/en/docs/guides/testing/)

### Boas Práticas
- Testes devem ser independentes
- Use dados de teste realistas
- Teste cenários de sucesso e erro
- Mantenha testes simples e focados
- Documente testes complexos

---

**💡 Dica**: Execute `npm run test:coverage` regularmente para monitorar a cobertura de testes e identificar áreas que precisam de mais testes.