# Testes Unitários - APL PCD API

## 📋 Sobre os Testes

Os testes unitários foram criados para a função `conectServ` do arquivo `logger.ts`, que é responsável por:

- Inicializar o servidor Express
- Configurar middlewares (JSON, CORS)
- Registrar todas as rotas da API
- Configurar middlewares de validação

## 🧪 Arquivos de Teste

- `logger.unit.test.ts` - Testes focados na inicialização do servidor e registro de rotas
- `logger.test.ts` - Testes mais abrangentes com simulação de requisições HTTP

## 🚀 Como Executar

### Instalar Dependências
```bash
npm install
```

### Executar Todos os Testes
```bash
npm test
```

### Executar Testes em Modo Watch
```bash
npm run test:watch
```

### Executar com Cobertura
```bash
npm run test:coverage
```

## 📊 Cobertura dos Testes

Os testes cobrem:

✅ Inicialização do servidor na porta correta  
✅ Configuração de middlewares Express  
✅ Registro de todas as rotas CRUD:
- Candidato (POST, GET, PUT, DELETE)
- Contratante (POST, GET, PUT, DELETE)  
- Vaga (POST, GET, DELETE)
- Evento (POST, GET, DELETE)
- Calendário (POST, GET)
- IFBR e Colaborador

✅ Middlewares de validação de ID  
✅ Conversão de porta string para number  
✅ Logs de inicialização do servidor

## 🛠️ Tecnologias Utilizadas

- **Jest** - Framework de testes
- **Supertest** - Testes de requisições HTTP
- **TypeScript** - Tipagem estática
- **Mocking** - Simulação de dependências externas

## 📝 Estrutura dos Testes

```typescript
describe('conectServ Function', () => {
  test('should initialize server on specified port', () => {
    // Testa se o servidor inicia na porta correta
  });
  
  test('should register all routes', () => {
    // Testa se todas as rotas são registradas
  });
});
```

## 🔧 Configuração

O Jest está configurado para:
- Suporte a TypeScript e ES Modules
- Mocking automático de dependências
- Relatórios de cobertura em HTML e LCOV
- Execução apenas de arquivos `.test.ts` e `.spec.ts`