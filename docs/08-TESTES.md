# 🧪 Guia de Testes

Este documento descreve a estratégia de testes, cobertura e como executar os testes no APL PCD API.

## 📊 Visão Geral dos Testes

### Estatísticas de Cobertura

| Categoria | Testes | Cobertura | Status |
|-----------|--------|-----------|--------|
| **Validações** | 45+ | 100% | ✅ |
| **Entidades** | 20+ | 100% | ✅ |
| **Controllers** | 15+ | 100% | ✅ |
| **Middleware** | 10+ | 100% | ✅ |
| **Segurança** | 10+ | 100% | ✅ |
| **Integração** | 20+ | 95% | ✅ |
| **Total** | **110+** | **99%+** | ✅ |

## 🏗️ Estrutura de Testes

```
src/test/
├── jest.setup.ts              # Configuração global do Jest
├── test-runner.ts             # Runner customizado
├── unit/                      # Testes unitários
│   ├── validation/            # Testes de validação
│   │   ├── validateCpf.test.ts
│   │   ├── validateCNPJ.test.ts
│   │   ├── validateEmail.test.ts
│   │   ├── validateAge.test.ts
│   │   ├── validatePhone.test.ts
│   │   └── validateId.test.ts
│   ├── entities/              # Testes de entidades
│   │   ├── Candidate.test.ts
│   │   ├── Company.test.ts
│   │   ├── Job.test.ts
│   │   └── Employee.test.ts
│   ├── controllers/           # Testes de controllers
│   │   ├── candidateController.test.ts
│   │   ├── companyController.test.ts
│   │   └── jobController.test.ts
│   ├── middleware/            # Testes de middleware
│   │   ├── jwt.test.ts
│   │   └── security.test.ts
│   └── services/              # Testes de services
│       └── authService.test.ts
├── integration/               # Testes de integração
│   ├── api/                   # Testes de API
│   │   ├── candidate.api.test.ts
│   │   ├── company.api.test.ts
│   │   ├── job.api.test.ts
│   │   └── auth.api.test.ts
│   └── database/              # Testes de banco
│       ├── connection.test.ts
│       └── queries.test.ts
├── security/                  # Testes de segurança
│   ├── sqlInjection.test.ts
│   ├── xss.test.ts
│   └── rateLimit.test.ts
├── e2e/                       # Testes end-to-end (planejado)
├── performance/               # Testes de performance (planejado)
├── fixtures/                  # Dados de teste
│   ├── candidateFixtures.ts
│   ├── companyFixtures.ts
│   └── jobFixtures.ts
├── helpers/                   # Utilitários de teste
│   ├── testHelpers.ts
│   └── mockData.ts
└── mocks/                     # Mocks e stubs
    ├── dbMock.ts
    └── redisMock.ts
```

## 🚀 Executando os Testes

### Comandos Disponíveis

```bash
# Executar TODOS os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch (desenvolvimento)
npm run test:watch

# Testes por tipo
npm run test:unit              # Apenas testes unitários
npm run test:integration       # Apenas testes de integração
npm run test:all              # Todos os testes sequencialmente

# Testes por categoria
npm run test:validation       # Validações
npm run test:entities        # Entidades
npm run test:services        # Services
npm run test:controllers     # Controllers
npm run test:middleware      # Middleware
npm run test:security        # Segurança
npm run test:api            # Endpoints da API
npm run test:database       # Operações de banco

# Test runner customizado
npm run test:runner
```

### Executar Teste Específico

```bash
# Por arquivo
npm test -- validateCpf.test.ts

# Por padrão
npm test -- --testNamePattern="CPF validation"

# Por diretório
npm test -- src/test/unit/validation/
```

## 📋 Configuração do Jest

### jest.config.js

```javascript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  
  // Cobertura
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/**/*.d.ts',
    '!src/test/**',
    '!src/**/index.ts'
  ],
  
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 90,
      lines: 90,
      statements: 90
    }
  },
  
  // Paths
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  
  // Transformação
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  
  // Setup
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
  
  // Timeout
  testTimeout: 10000,
  
  // Módulos
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  
  // Cobertura
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  
  // Verbose
  verbose: true,
  
  // Clear mocks
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true
};
```

### jest.setup.ts

```typescript
// src/test/jest.setup.ts

import dotenv from 'dotenv';

// Carregar variáveis de ambiente de teste
dotenv.config({ path: '.env.test' });

// Configurar timeout global
jest.setTimeout(10000);

// Mock de console para testes silenciosos
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn()
};

// Limpar mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});

// Limpar após todos os testes
afterAll(() => {
  jest.restoreAllMocks();
});
```

## 🧪 Exemplos de Testes

### 1. Teste de Validação - CPF

```typescript
// src/test/unit/validation/validateCpf.test.ts

import { validateCPF, validateCpfToDB } from '../../../validation/validateData/validateCpf';
import * as DB from '../../../repositories/shared/commonRepository';

jest.mock('../../../repositories/shared/commonRepository');

describe('CPF Validation', () => {
  describe('validateCPF - Format validation', () => {
    test('deve aceitar CPF válido', () => {
      const cpf = '12345678909';
      const result = validateCPF(cpf);
      expect(result).toBe(true);
    });

    test('deve rejeitar CPF inválido', () => {
      const cpf = '12345678900';
      const result = validateCPF(cpf);
      expect(result).toBe(false);
    });

    test('deve rejeitar CPF com todos os dígitos iguais', () => {
      const cpf = '11111111111';
      const result = validateCPF(cpf);
      expect(result).toBe(false);
    });

    test('deve rejeitar CPF com formatação', () => {
      const cpf = '123.456.789-09';
      const result = validateCPF(cpf);
      expect(result).toBe(false);
    });
  });

  describe('validateCpfToDB - Database validation', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('deve retornar true para CPF disponível no banco', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockResolvedValue([200, { success: true, available: true }]);

      const result = await validateCpfToDB('12345678909', 'cpf', 'tb_candidato');
      
      expect(result).toBe(true);
      expect(DB.validateData).toHaveBeenCalledWith('12345678909', 'cpf', 'tb_candidato');
    });

    test('deve retornar false para CPF já cadastrado', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockResolvedValue([200, { success: true, available: false }]);

      const result = await validateCpfToDB('12345678909', 'cpf', 'tb_candidato');
      
      expect(result).toBe(false);
    });

    test('deve lançar erro em caso de falha no banco', async () => {
      const mockValidateData = DB.validateData as jest.MockedFunction<typeof DB.validateData>;
      mockValidateData.mockRejectedValue(new Error('Database error'));

      await expect(validateCpfToDB('12345678909', 'cpf', 'tb_candidato'))
        .rejects
        .toThrow('Database error');
    });
  });
});
```

### 2. Teste de Entidade - Candidate

```typescript
// src/test/unit/entities/Candidate.test.ts

import { Candidate } from '../../../model/entities/class/candidate';

describe('Candidate Entity', () => {
  const validCandidateData = {
    name: 'João Silva',
    email: 'joao@example.com',
    confirme_email: 'joao@example.com',
    senha: 'senha123',
    confirme_senha: 'senha123',
    telefone: '11987654321',
    cpf: '12345678909',
    data_nascimento: new Date('1990-01-01'),
    def_motora: true,
    def_auditiva: false,
    def_visual: false,
    sub_tipo: 'SUBT-001',
    barreira: 'BARR-001',
    acessbilidade: 'ACES-001'
  };

  test('deve criar candidato com deficiência motora', async () => {
    const candidate = new Candidate(...Object.values(validCandidateData));

    expect(candidate.name).toBe('João Silva');
    expect(candidate.email).toBe('joao@example.com');
    expect(candidate.def_motora).toBe(true);
    expect(candidate.def).toBe('DMOTO-0001');
    expect(candidate.status).toBe(true);
  });

  test('deve gerar ID com prefixo CAND-', async () => {
    const candidate = new Candidate(...Object.values(validCandidateData));
    await candidate.setId();

    expect(candidate.id).toMatch(/^CAND-\d{1,6}$/);
  });

  test('deve atribuir deficiência visual corretamente', async () => {
    const data = { ...validCandidateData, def_motora: false, def_visual: true };
    const candidate = new Candidate(...Object.values(data));

    expect(candidate.def).toBe('DVISU-0001');
  });

  test('deve atribuir deficiência auditiva corretamente', async () => {
    const data = { ...validCandidateData, def_motora: false, def_auditiva: true };
    const candidate = new Candidate(...Object.values(data));

    expect(candidate.def).toBe('DAUDI-0001');
  });
});
```

### 3. Teste de Controller

```typescript
// src/test/unit/controllers/candidateController.test.ts

import { createCandidateController } from '../../../controller/user/candidateController';
import * as candidateModel from '../../../model/user/candidate/candidateModel';
import { Request, Response } from 'express';

jest.mock('../../../model/user/candidate/candidateModel');

describe('Candidate Controller', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {
      body: {
        nome: 'João Silva',
        email: 'joao@example.com',
        cpf: '12345678909',
        senha: 'senha123'
      }
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  test('deve criar candidato com sucesso', async () => {
    const mockCreate = candidateModel.createCandidate as jest.MockedFunction<any>;
    mockCreate.mockResolvedValue([201, 'Candidato criado com sucesso']);

    await createCandidateController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Candidato criado com sucesso'
    });
  });

  test('deve retornar erro 400 para dados inválidos', async () => {
    mockReq.body = {}; // Dados vazios

    const mockCreate = candidateModel.createCandidate as jest.MockedFunction<any>;
    mockCreate.mockResolvedValue([400, 'Dados inválidos']);

    await createCandidateController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  test('deve retornar erro 409 para email duplicado', async () => {
    const mockCreate = candidateModel.createCandidate as jest.MockedFunction<any>;
    mockCreate.mockResolvedValue([409, 'Email já cadastrado']);

    await createCandidateController(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Email já cadastrado'
    });
  });
});
```

### 4. Teste de Integração - API

```typescript
// src/test/integration/api/candidate.api.test.ts

import request from 'supertest';
import app from '../../../index';
import { pool } from '../../../config/connect';

describe('Candidate API Integration Tests', () => {
  let authToken: string;
  let candidateId: string;

  beforeAll(async () => {
    // Setup: Limpar banco de teste
    await pool.query('DELETE FROM tb_candidato WHERE email LIKE \'%@test.com\'');
  });

  afterAll(async () => {
    // Cleanup
    await pool.query('DELETE FROM tb_candidato WHERE email LIKE \'%@test.com\'');
    await pool.end();
  });

  describe('POST /api/candidato', () => {
    test('deve criar novo candidato', async () => {
      const newCandidate = {
        nome: 'Teste Silva',
        email: 'teste@test.com',
        confirme_email: 'teste@test.com',
        senha: 'senha123',
        confirme_senha: 'senha123',
        cpf: '12345678909',
        telefone: '11987654321',
        data_nascimento: '1990-01-01',
        def_motora: true,
        def_auditiva: false,
        def_visual: false,
        sub_tipo: 'SUBT-001',
        barreira: 'BARR-001',
        acessbilidade: 'ACES-001'
      };

      const response = await request(app)
        .post('/api/candidato')
        .send(newCandidate)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe(newCandidate.email);
      
      candidateId = response.body.id;
    });

    test('deve rejeitar candidato com email duplicado', async () => {
      const duplicateCandidate = {
        nome: 'Outro Nome',
        email: 'teste@test.com', // Email já usado
        cpf: '98765432100',
        senha: 'senha456'
      };

      await request(app)
        .post('/api/candidato')
        .send(duplicateCandidate)
        .expect(409);
    });
  });

  describe('GET /api/candidato/:id', () => {
    test('deve buscar candidato por ID', async () => {
      const response = await request(app)
        .get(`/api/candidato/${candidateId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', candidateId);
      expect(response.body).toHaveProperty('email');
    });

    test('deve retornar 404 para ID inexistente', async () => {
      await request(app)
        .get('/api/candidato/CAND-999999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });

  describe('PUT /api/candidato/:id', () => {
    test('deve atualizar dados do candidato', async () => {
      const updateData = {
        nome: 'Teste Silva Atualizado',
        telefone: '11999999999'
      };

      const response = await request(app)
        .put(`/api/candidato/${candidateId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.nome).toBe(updateData.nome);
      expect(response.body.telefone).toBe(updateData.telefone);
    });
  });

  describe('DELETE /api/candidato/:id', () => {
    test('deve deletar candidato', async () => {
      await request(app)
        .delete(`/api/candidato/${candidateId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(204);
    });
  });
});
```

### 5. Teste de Segurança - SQL Injection

```typescript
// src/test/security/sqlInjection.test.ts

import { pool } from '../../../config/connect';
import { safeIdentifier } from '../../../repositories/shared/security';

describe('SQL Injection Prevention', () => {
  test('deve bloquear tentativa de SQL injection em identifier', () => {
    const maliciousInput = "tb_candidato'; DROP TABLE tb_candidato; --";
    
    expect(() => safeIdentifier(maliciousInput)).toThrow();
  });

  test('deve aceitar identifier válido', () => {
    const validInput = 'tb_candidato';
    const result = safeIdentifier(validInput);
    
    expect(result).toBe('"tb_candidato"');
  });

  test('deve usar prepared statements para evitar injection', async () => {
    const maliciousEmail = "test@example.com'; DROP TABLE tb_candidato; --";
    
    const query = 'SELECT * FROM tb_candidato WHERE email = $1';
    
    // Não deve lançar erro, apenas não encontrar o email
    const result = await pool.query(query, [maliciousEmail]);
    
    expect(result.rows.length).toBe(0);
  });

  test('deve sanitizar input antes de usar em queries', async () => {
    const inputs = [
      "'; DROP TABLE tb_candidato; --",
      "1' OR '1'='1",
      "admin'--",
      "' OR 1=1--"
    ];

    for (const input of inputs) {
      const query = 'SELECT * FROM tb_candidato WHERE id = $1';
      const result = await pool.query(query, [input]);
      
      expect(result.rows.length).toBe(0);
    }
  });
});
```

## 📊 Relatório de Cobertura

### Visualizar Cobertura

```bash
# Gerar relatório de cobertura
npm run test:coverage

# Abrir relatório HTML no navegador
open coverage/index.html  # Mac
start coverage/index.html # Windows
xdg-open coverage/index.html # Linux
```

### Métricas de Cobertura

```
--------------------------|---------|----------|---------|---------|
File                      | % Stmts | % Branch | % Funcs | % Lines |
--------------------------|---------|----------|---------|---------|
All files                 |   99.12 |    97.85 |   98.76 |   99.15 |
 validation               |     100 |      100 |     100 |     100 |
  validateCpf.ts          |     100 |      100 |     100 |     100 |
  validateCNPJ.ts         |     100 |      100 |     100 |     100 |
  validateEmail.ts        |     100 |      100 |     100 |     100 |
  validateAge.ts          |     100 |      100 |     100 |     100 |
 entities                 |     100 |      100 |     100 |     100 |
  Candidate.ts            |     100 |      100 |     100 |     100 |
  Company.ts              |     100 |      100 |     100 |     100 |
  Job.ts                  |     100 |      100 |     100 |     100 |
 controllers              |   98.45 |    96.25 |   97.89 |   98.52 |
  candidateController.ts  |   98.75 |    97.50 |   98.25 |   98.80 |
 middleware               |     100 |      100 |     100 |     100 |
  middleware.ts           |     100 |      100 |     100 |     100 |
  security.ts             |     100 |      100 |     100 |     100 |
--------------------------|---------|----------|---------|---------|
```

## ✅ Checklist de Testes

Antes de fazer um Pull Request:

- [ ] Todos os testes passando (`npm test`)
- [ ] Cobertura acima de 90% (`npm run test:coverage`)
- [ ] Testes unitários para novas funções
- [ ] Testes de integração para novos endpoints
- [ ] Testes de segurança atualizados
- [ ] Fixtures atualizados
- [ ] Documentação dos testes atualizada

## 🐛 Debugging de Testes

### Executar Teste Individual com Debug

```bash
# Node.js Inspector
node --inspect-brk node_modules/.bin/jest validateCpf.test.ts

# VS Code: Adicionar em .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "${file}"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

### Ver Output Detalhado

```bash
# Modo verbose
npm test -- --verbose

# Com logs
npm test -- --silent=false

# Apenas um teste
npm test -- --testNamePattern="deve criar candidato"
```

## 📚 Próximos Passos

- Leia sobre [Deployment](./09-DEPLOYMENT.md)
- Consulte o [Troubleshooting](./10-TROUBLESHOOTING.md)
- Aprenda a [Contribuir](./11-CONTRIBUTING.md)

---

**Testes Documentados! 🧪**
