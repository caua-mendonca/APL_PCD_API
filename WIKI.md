# 📚 Wiki - APL PCD API

## 📖 Índice

1. [🏠 Home](#-home)
2. [🚀 Início Rápido](#-início-rápido)
3. [🏗️ Arquitetura](#️-arquitetura)
4. [🗄️ Banco de Dados](#️-banco-de-dados)
5. [🔐 Autenticação](#-autenticação)
6. [📡 API Endpoints](#-api-endpoints)
7. [🧪 Testes](#-testes)
8. [🔧 Configuração](#-configuração)
9. [🚀 Deploy](#-deploy)
10. [🤝 Contribuição](#-contribuição)
11. [❓ FAQ](#-faq)

---

## 🏠 Home

### Sobre o Projeto
A **APL PCD API** é uma solução completa para gestão de inclusão profissional de pessoas com deficiência, desenvolvida com **Node.js + TypeScript + PostgreSQL**.

### Principais Funcionalidades
- 👥 Gestão completa de candidatos PCD
- 🏢 Sistema de empresas e colaboradores
- 💼 Controle de vagas e inscrições
- ♿ Gestão de acessibilidade e barreiras
- 📅 Sistema de calendário e eventos
- 🔐 Autenticação JWT segura
- 🎯 Sistema de inscrições candidato-vaga
- 🏢 Gestão completa de empresas

### Stack Tecnológico
- **Backend**: Node.js 18+, TypeScript 5.0+, Express.js
- **Banco**: PostgreSQL 15+
- **Testes**: Jest 29+ (23 testes unitários)
- **Segurança**: bcrypt, JWT, Prepared Statements

---

## 🚀 Início Rápido

### Pré-requisitos
```bash
Node.js 18+
PostgreSQL 15+
Git
```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/cMendoncaaa/APL-WEB-PCD.git
cd APL_PCD_API

# Instale dependências
npm install

# Configure ambiente
cp .env.preview .env
# Edite .env com suas configurações

# Execute
npm run start
```

### Primeiro Teste
```bash
# Teste a API
curl http://localhost:3000/health

# Execute testes
npm test
```

---

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── config/           # Configurações (DB, ambiente)
├── controller/       # Controladores MVC
├── middleware/       # Middlewares Express
├── model/           # Modelos e entidades
├── repositories/    # Camada de dados
├── routes/          # Definição de rotas
├── test/            # Testes (23 unitários)
├── utils/           # Utilitários
└── validation/      # Validações
```

### Padrões Arquiteturais
- **MVC Pattern**: Separação clara de responsabilidades
- **Repository Pattern**: Abstração da camada de dados
- **Dependency Injection**: Inversão de controle
- **Clean Architecture**: Baixo acoplamento

### Fluxo de Dados
```
Request → Routes → Controller → Model → Repository → Database
                     ↓
Response ← Validation ← Business Logic ← Data Access
```

---

## 🗄️ Banco de Dados

### Schema Principal
```sql
-- Tabelas principais
tb_candidato          # Candidatos PCD
tb_vaga              # Vagas disponíveis
tb_colaborador       # Colaboradores
tb_tipo_deficiencia  # Tipos de deficiências
tb_acessibilidade    # Recursos de acessibilidade
tb_barreira          # Barreiras identificadas
tb_calendario        # Sistema de calendário
tb_evento            # Eventos do sistema
```

### Relacionamentos
```sql
-- Relacionamentos N:N
tb_candidato_vaga         # Candidato ↔ Vaga
tb_empresa_vaga           # Empresa ↔ Vaga
tb_empresa_colaborador    # Empresa ↔ Colaborador
tb_barreira_acessibilidade # Barreira ↔ Acessibilidade
```

### Configuração do Banco
```bash
# PostgreSQL
createdb apl_pcd_db

# Configurar .env
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=sua_senha
DB_PORT=5432
```

### Migrations
```bash
# Executar scripts SQL
psql -d apl_pcd_db -f scripts/create_tables.sql
```

---

## 🔐 Autenticação

### JWT Implementation
```typescript
// Gerar token
const token = jwt.sign(
  { userId: user.id, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Verificar token
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

### Middleware de Autenticação
```typescript
// Proteger rotas
app.use('/api/protected', authenticateToken);

// Header necessário
Authorization: Bearer <token>
```

### Criptografia de Senhas
```typescript
// Hash da senha
const hashedPassword = await bcrypt.hash(password, 10);

// Verificar senha
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

## 📡 API Endpoints

### Candidatos
```http
GET    /api/candidatos           # Listar candidatos
POST   /api/candidatos           # Criar candidato
GET    /api/candidatos/:id       # Buscar por ID
PUT    /api/candidatos/:id       # Atualizar candidato
DELETE /api/candidatos/:id       # Excluir candidato
```

### Vagas
```http
GET    /api/vagas               # Listar vagas
POST   /api/vagas               # Criar vaga
GET    /api/vagas/:id           # Buscar vaga
PUT    /api/vagas/:id           # Atualizar vaga
POST   /api/vagas/:id/inscrever # Inscrever candidato
```

### Empresas
```http
GET    /api/empresas            # Listar empresas
POST   /api/empresas            # Criar empresa
GET    /api/empresas/:id        # Buscar empresa
PUT    /api/empresas/:id        # Atualizar empresa
```

### Calendário
```http
GET    /api/calendario/:id      # Buscar calendário por empresa
POST   /api/calendario/:id      # Criar calendário para empresa
```

### Eventos
```http
GET    /api/evento/:id          # Listar eventos por empresa
POST   /api/evento/:id          # Criar evento
DELETE /api/evento/:id          # Excluir evento
```

### Autenticação
```http
POST   /api/login/candidato     # Login candidato
POST   /api/login/empresa       # Login empresa
```

### Exemplos de Requisições
```bash
# Criar candidato
curl -X POST http://localhost:3000/api/candidatos \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "idade": 25
  }'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@email.com",
    "password": "senha123"
  }'
```

---

## 🧪 Testes

### Estrutura de Testes
```
src/test/
├── unit/              # 23 testes unitários ✅
│   ├── validation/    # Testes de validação
│   └── entities/      # Testes de entidades
├── integration/       # Testes de integração
└── setup/            # Configuração de testes
```

### Executar Testes
```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes com cobertura
npm run test:coverage

# Modo watch
npm run test:watch
```

### Cobertura de Testes
- **Validações**: 100% cobertura (CPF, email, idade)
- **Entidades**: 84-100% cobertura (Candidate class)
- **Total**: 23 testes unitários ✅
- **Frameworks**: Jest + Supertest

### Exemplo de Teste
```typescript
describe('CPF Validation', () => {
  test('should validate correct CPF', () => {
    expect(validateCPF('12345678901')).toBe(true);
  });

  test('should reject invalid CPF', () => {
    expect(validateCPF('11111111111')).toBe(false);
  });
});
```

---

## 🔧 Configuração

### Variáveis de Ambiente
```bash
# .env
NODE_ENV=development
PORT=3000

# Database
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=sua_senha
DB_PORT=5432

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro
JWT_EXPIRES_IN=24h

# Logs
LOG_LEVEL=info
```

### Configuração do TypeScript
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true
  }
}
```

### Scripts NPM
```json
{
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "ts-node --watch src/index.ts",
    "build": "tsc",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 🚀 Deploy

### Build para Produção
```bash
# Compilar TypeScript
npm run build

# Executar versão compilada
node build/index.js
```

### Docker (Opcional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["node", "build/index.js"]
```

### Variáveis de Produção
```bash
NODE_ENV=production
PORT=3000
DB_SSL=true
LOG_LEVEL=error
```

---

## 🤝 Contribuição

### Processo de Contribuição
1. **Fork** o projeto
2. **Crie branch**: `git checkout -b feat/nova-funcionalidade`
3. **Execute testes**: `npm test`
4. **Commit**: `git commit -m "feat: adiciona nova funcionalidade"`
5. **Push**: `git push origin feat/nova-funcionalidade`
6. **Pull Request** com descrição detalhada

### Padrões de Código
- **TypeScript**: Tipagem obrigatória
- **ESLint**: Seguir configuração do projeto
- **Prettier**: Formatação automática
- **Conventional Commits**: Padrão de commits

### Padrões de Commit
```bash
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
test:     Testes
refactor: Refatoração
style:    Formatação
```

### Requisitos para PR
- ✅ Testes passando
- 📝 Documentação atualizada
- 🔍 Code review aprovado
- 📋 Descrição clara

---

## ❓ FAQ

### Como configurar o banco de dados?
1. Instale PostgreSQL 15+
2. Crie database: `createdb apl_pcd_db`
3. Configure `.env` com credenciais
4. Execute migrations se disponíveis

### Como executar em modo desenvolvimento?
```bash
npm run dev  # Modo watch com ts-node
```

### Como resolver erro de conexão com banco?
1. Verifique se PostgreSQL está rodando
2. Confirme credenciais no `.env`
3. Teste conexão: `psql -h localhost -U postgres`

### Como adicionar novos endpoints?
1. Crie controller em `src/controller/`
2. Adicione rota em `src/routes/`
3. Implemente validações necessárias
4. Adicione testes unitários

### Como funciona o sistema de IDs?
Todos os IDs usam prefixos semânticos:
- `CAND-123456` - Candidatos
- `VAGA-123456` - Vagas
- `COLAB-123456` - Colaboradores
- `CALENDAR-123456` - Calendários
- `EVENT-123456` - Eventos
- `DMOTO-123456` - Deficiência Motora
- `DVISU-123456` - Deficiência Visual
- `DAUDI-123456` - Deficiência Auditiva

### Posso usar sem PostgreSQL?
Não, o sistema foi projetado especificamente para PostgreSQL com prepared statements para segurança.

### Como contribuir com testes?
1. Adicione testes em `src/test/unit/`
2. Execute `npm test` para verificar
3. Mantenha cobertura alta (>80%)

### Onde encontrar logs?
Logs são exibidos no console em desenvolvimento. Em produção, configure um sistema de logs externo.

---

## 📞 Suporte

### Contatos
- **Issues**: [GitHub Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- **Documentação**: Esta Wiki
- **LinkedIn**: [Dev Melo](https://www.linkedin.com/in/devmelo/)

### Links Úteis
- [README Principal](README.md)
- [Guia de Testes](TESTING_SUMMARY.md)
- [Guia Frontend](API_FRONTEND_GUIDE.md)

---

<div align="center">

**🌟 Desenvolvido com ❤️ para inclusão profissional PCD**

*Versão da Wiki: 1.0 | Última atualização: 2024*

</div>