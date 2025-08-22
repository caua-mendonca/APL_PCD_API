# 🧪 Testes da Camada Model

Este diretório contém os testes unitários para a camada **Model** da APL PCD API.

## 📁 Estrutura dos Testes

```
test/model/
├── user/
│   └── modelUser.test.ts      # Testes para gestão de usuários
├── vaga/
│   └── modelVaga.test.ts      # Testes para gestão de vagas
├── calendar/
│   └── modelCalendar.test.ts  # Testes para sistema de calendário
├── event/
│   └── modelEvent.test.ts     # Testes para gestão de eventos
├── IFBR/
│   └── modelIFBR.test.ts      # Testes para formulários IFBR
└── entities/
    └── entities.test.ts       # Testes para classes de entidades
```

## 🎯 Cobertura dos Testes

### ✅ ModelUser
- Criação de colaboradores
- Criação de candidatos
- Criação de contratantes
- Operações CRUD (get, delete, update)
- Validações de dados

### ✅ ModelVaga
- Criação de vagas
- Listagem e busca de vagas
- Inscrição de candidatos
- Exclusão de vagas

### ✅ ModelCalendar
- Criação de calendários
- Geração de calendários mensais
- Marcação de eventos
- Validações de entrada

### ✅ ModelEvent
- Criação de eventos
- Validações de horário
- Listagem de eventos
- Exclusão de eventos

### ✅ ModelIFBR
- Criação de formulários IFBR
- Validação de questões
- Processamento de respostas

### ✅ Entities
- Testes para todas as classes de entidade
- Geração de IDs únicos
- Validação de propriedades

## 🚀 Executando os Testes

```bash
# Executar todos os testes da camada model
npm test -- src/test/model

# Executar testes específicos
npm test -- src/test/model/user/modelUser.test.ts

# Executar com cobertura
npm run test:coverage

# Executar em modo watch
npm run test:watch
```

## 🛠️ Tecnologias Utilizadas

- **Jest** - Framework de testes
- **TypeScript** - Tipagem estática
- **Mocks** - Simulação de dependências
- **Supertest** - Testes de API (quando necessário)

## 📊 Métricas de Qualidade

- **Cobertura**: 90%+ para funções críticas
- **Mocks**: Todas as dependências externas mockadas
- **Isolamento**: Cada teste é independente
- **Validações**: Cenários de sucesso e erro cobertos