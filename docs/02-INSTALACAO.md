# 📦 Guia de Instalação

Este guia fornece instruções detalhadas para instalar e configurar o APL PCD API em diferentes ambientes.

## 📋 Pré-requisitos

Antes de iniciar a instalação, certifique-se de ter os seguintes softwares instalados:

### Obrigatórios

| Software | Versão Mínima | Versão Recomendada | Download |
|----------|---------------|-------------------|----------|
| **Node.js** | 18.0.0 | 18.17.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9.0.0 | 9.8.0+ | Incluído com Node.js |
| **PostgreSQL** | 15.0 | 15.4+ | [postgresql.org](https://www.postgresql.org/) |
| **Git** | 2.30+ | 2.40+ | [git-scm.com](https://git-scm.com/) |

### Opcionais (Recomendados)

| Software | Versão | Propósito |
|----------|---------|-----------|
| **Redis** | 7.0+ | Cache e sessões |
| **Docker** | 20.10+ | Containerização |
| **Docker Compose** | 2.0+ | Orquestração de containers |
| **Postman** | Latest | Testes de API |

## 🔍 Verificar Instalações

Execute os comandos abaixo para verificar se os pré-requisitos estão instalados:

```bash
# Verificar Node.js
node --version
# Deve retornar: v18.x.x ou superior

# Verificar npm
npm --version
# Deve retornar: 9.x.x ou superior

# Verificar PostgreSQL
psql --version
# Deve retornar: psql (PostgreSQL) 15.x ou superior

# Verificar Git
git --version
# Deve retornar: git version 2.x.x ou superior
```

## 🚀 Instalação Passo a Passo

### 1️⃣ Clonar o Repositório

```bash
# Clone o repositório
git clone https://github.com/cMendoncaaa/APL-WEB-PCD.git

# Entre na pasta do projeto
cd APL_PCD_API

# Verifique se está na branch correta
git branch
# Deve mostrar: * develop
```

### 2️⃣ Instalar Dependências

```bash
# Instalar todas as dependências do projeto
npm install

# Ou usando npm clean install (recomendado para CI/CD)
npm ci
```

**O que será instalado:**

#### Dependências de Produção
- `express` - Framework web
- `bcrypt` - Criptografia de senhas
- `jsonwebtoken` - Autenticação JWT
- `pg` - Driver PostgreSQL
- `winston` - Sistema de logs
- `redis` - Cliente Redis
- `helmet` - Security headers
- `express-rate-limit` - Rate limiting
- `cors` - CORS middleware
- `dotenv` - Variáveis de ambiente

#### Dependências de Desenvolvimento
- `typescript` - Compilador TypeScript
- `ts-node` - Executor TypeScript
- `jest` - Framework de testes
- `ts-jest` - Suporte TypeScript no Jest
- `supertest` - Testes HTTP
- `@types/*` - Definições de tipos TypeScript

### 3️⃣ Configurar Banco de Dados PostgreSQL

#### Opção A: Instalação Local

##### Windows

1. **Baixar PostgreSQL**
   - Acesse [postgresql.org/download/windows](https://www.postgresql.org/download/windows/)
   - Baixe o instalador para Windows

2. **Instalar PostgreSQL**
   ```
   - Execute o instalador
   - Porta padrão: 5432
   - Defina uma senha para o usuário postgres
   - Mantenha as configurações padrão
   ```

3. **Criar Banco de Dados**
   ```bash
   # Abrir prompt SQL (psql)
   # Usuário: postgres
   # Senha: [sua senha definida]

   # No prompt do psql:
   CREATE DATABASE apl_pcd_db;
   
   # Criar usuário (opcional)
   CREATE USER apl_user WITH PASSWORD 'senha_segura';
   
   # Conceder privilégios
   GRANT ALL PRIVILEGES ON DATABASE apl_pcd_db TO apl_user;
   
   # Verificar
   \l  # Listar databases
   \q  # Sair
   ```

##### Linux (Ubuntu/Debian)

```bash
# Atualizar repositórios
sudo apt update

# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar banco de dados
sudo -u postgres psql

# No prompt do PostgreSQL:
CREATE DATABASE apl_pcd_db;
CREATE USER apl_user WITH PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE apl_pcd_db TO apl_user;
\q
```

##### macOS

```bash
# Usando Homebrew
brew install postgresql@15

# Iniciar serviço
brew services start postgresql@15

# Criar banco de dados
psql postgres

# No prompt do PostgreSQL:
CREATE DATABASE apl_pcd_db;
CREATE USER apl_user WITH PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE apl_pcd_db TO apl_user;
\q
```

#### Opção B: Docker (Recomendado)

```bash
# Criar container PostgreSQL
docker run --name apl-pcd-postgres \
  -e POSTGRES_DB=apl_pcd_db \
  -e POSTGRES_USER=apl_user \
  -e POSTGRES_PASSWORD=senha_segura \
  -p 5432:5432 \
  -d postgres:15

# Verificar se está rodando
docker ps

# Acessar o container (se necessário)
docker exec -it apl-pcd-postgres psql -U apl_user -d apl_pcd_db
```

#### Opção C: Docker Compose

Crie um arquivo `docker-compose.yml` na raiz do projeto:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: apl-pcd-postgres
    environment:
      POSTGRES_DB: apl_pcd_db
      POSTGRES_USER: apl_user
      POSTGRES_PASSWORD: senha_segura
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U apl_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: apl-pcd-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
  redis_data:
```

```bash
# Iniciar serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

### 4️⃣ Criar as Tabelas do Banco de Dados

Execute o script SQL para criar todas as tabelas necessárias:

```sql
-- ================================================
-- SCRIPT DE CRIAÇÃO DAS TABELAS
-- APL PCD API - Sistema de Gestão de Inclusão
-- ================================================

-- Tabela de Candidatos
CREATE TABLE tb_candidato (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    status BOOLEAN DEFAULT TRUE,
    deficiencia VARCHAR(50),
    tipo_deficiencia VARCHAR(50),
    barreira VARCHAR(50),
    acessibilidade VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Empresas
CREATE TABLE tb_empresa (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(20),
    endereco TEXT,
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Colaboradores
CREATE TABLE tb_colaborador (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo VARCHAR(100),
    telefone VARCHAR(20),
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vagas
CREATE TABLE tb_vaga (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    requisitos TEXT,
    salario DECIMAL(10, 2),
    tipo_contrato VARCHAR(50),
    carga_horaria VARCHAR(50),
    localizacao VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Tipos de Deficiência
CREATE TABLE tb_tipo_deficiencia (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Subtipos de Deficiência
CREATE TABLE tb_sub_tipo_deficiencia (
    id VARCHAR(50) PRIMARY KEY,
    tipo_deficiencia_id VARCHAR(50) REFERENCES tb_tipo_deficiencia(id),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Barreiras
CREATE TABLE tb_barreira (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Subtipos de Barreira
CREATE TABLE tb_sub_tipo_barreira (
    id VARCHAR(50) PRIMARY KEY,
    barreira_id VARCHAR(50) REFERENCES tb_barreira(id),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Acessibilidade
CREATE TABLE tb_acessibilidade (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Calendário
CREATE TABLE tb_calendario (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    empresa_id VARCHAR(50) REFERENCES tb_empresa(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Eventos
CREATE TABLE tb_evento (
    id VARCHAR(50) PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP,
    localizacao VARCHAR(255),
    tipo VARCHAR(50),
    calendario_id VARCHAR(50) REFERENCES tb_calendario(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Relacionamento: Candidato-Vaga
CREATE TABLE tb_candidato_vaga (
    id SERIAL PRIMARY KEY,
    tb_candidato_id VARCHAR(50) REFERENCES tb_candidato(id) ON DELETE CASCADE,
    tb_vaga_id VARCHAR(50) REFERENCES tb_vaga(id) ON DELETE CASCADE,
    hora_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'pendente',
    UNIQUE(tb_candidato_id, tb_vaga_id)
);

-- Tabela de Relacionamento: Empresa-Vaga
CREATE TABLE tb_empresa_vaga (
    id SERIAL PRIMARY KEY,
    tb_empresa_id VARCHAR(50) REFERENCES tb_empresa(id) ON DELETE CASCADE,
    tb_vaga_id VARCHAR(50) REFERENCES tb_vaga(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tb_empresa_id, tb_vaga_id)
);

-- Tabela de Relacionamento: Empresa-Colaborador
CREATE TABLE tb_empresa_colaborador (
    id SERIAL PRIMARY KEY,
    tb_empresa_id VARCHAR(50) REFERENCES tb_empresa(id) ON DELETE CASCADE,
    tb_colaborador_id VARCHAR(50) REFERENCES tb_colaborador(id) ON DELETE CASCADE,
    data_vinculacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tb_empresa_id, tb_colaborador_id)
);

-- Tabela de Relacionamento: Barreira-Acessibilidade
CREATE TABLE tb_barreira_acessibilidade (
    id SERIAL PRIMARY KEY,
    tb_barreira_id VARCHAR(50) REFERENCES tb_barreira(id) ON DELETE CASCADE,
    tb_acessibilidade_id VARCHAR(50) REFERENCES tb_acessibilidade(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(tb_barreira_id, tb_acessibilidade_id)
);

-- Índices para melhor performance
CREATE INDEX idx_candidato_email ON tb_candidato(email);
CREATE INDEX idx_candidato_cpf ON tb_candidato(cpf);
CREATE INDEX idx_empresa_cnpj ON tb_empresa(cnpj);
CREATE INDEX idx_empresa_email ON tb_empresa(email);
CREATE INDEX idx_vaga_status ON tb_vaga(status);
CREATE INDEX idx_candidato_vaga_candidato ON tb_candidato_vaga(tb_candidato_id);
CREATE INDEX idx_candidato_vaga_vaga ON tb_candidato_vaga(tb_vaga_id);
CREATE INDEX idx_evento_calendario ON tb_evento(calendario_id);

-- Comentários nas tabelas
COMMENT ON TABLE tb_candidato IS 'Armazena dados dos candidatos PCD';
COMMENT ON TABLE tb_empresa IS 'Armazena dados das empresas contratantes';
COMMENT ON TABLE tb_vaga IS 'Armazena informações das vagas de emprego';
COMMENT ON TABLE tb_candidato_vaga IS 'Relaciona candidatos com vagas que se candidataram';
```

**Para executar o script:**

```bash
# Método 1: Via psql
psql -U apl_user -d apl_pcd_db -f database/schema.sql

# Método 2: Via Docker
docker exec -i apl-pcd-postgres psql -U apl_user -d apl_pcd_db < database/schema.sql

# Método 3: Copiar e colar no psql
psql -U apl_user -d apl_pcd_db
# Cole o conteúdo do script SQL
```

### 5️⃣ Configurar Variáveis de Ambiente

Crie o arquivo `.env` na raiz do projeto:

```bash
# Copiar arquivo de exemplo
cp .env-preview .env

# Editar com seu editor favorito
nano .env
# ou
code .env
```

**Conteúdo do arquivo `.env`:**

```bash
# ====================================
# CONFIGURAÇÕES DO BANCO DE DADOS
# ====================================
DB_USER=apl_user
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=senha_segura
DB_PORT=5432

# ====================================
# CONFIGURAÇÕES DO SERVIDOR
# ====================================
PORT=3000
NODE_ENV=development

# ====================================
# CONFIGURAÇÕES JWT
# ====================================
JWT_SECRET=sua_chave_secreta_super_segura_aqui_min_32_caracteres
JWT_EXPIRES_IN=24h

# ====================================
# CONFIGURAÇÕES REDIS (OPCIONAL)
# ====================================
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# ====================================
# CONFIGURAÇÕES DE SEGURANÇA
# ====================================
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5
BCRYPT_SALT_ROUNDS=12
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` no Git! Ele já está no `.gitignore`.

### 6️⃣ Compilar TypeScript

```bash
# Compilar o projeto
npm run build

# Verificar se a pasta build foi criada
ls build/

# Deve mostrar:
# config/  controller/  middleware/  model/  repositories/  
# routes/  utils/  validation/  index.js
```

### 7️⃣ Executar a Aplicação

```bash
# Modo desenvolvimento (com ts-node)
npm run start

# Modo produção (compilado)
npm run build
node build/index.js

# Você deve ver:
# [INFO] Server running on port 3000
# [INFO] Database connected successfully
```

### 8️⃣ Verificar Instalação

```bash
# Testar conexão com a API
curl http://localhost:3000/health

# Resposta esperada:
# {"status":"ok","timestamp":"2025-11-01T..."}

# Executar testes
npm test

# Deve executar 110+ testes com sucesso
```

## 🐳 Instalação com Docker (Método Completo)

### Criar Dockerfile

Crie um arquivo `Dockerfile` na raiz:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código fonte
COPY . .

# Compilar TypeScript
RUN npm run build

# Expor porta
EXPOSE 3000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicialização
CMD ["node", "build/index.js"]
```

### Executar com Docker

```bash
# Build da imagem
docker build -t apl-pcd-api .

# Executar container
docker run -d \
  --name apl-pcd-api \
  -p 3000:3000 \
  --env-file .env \
  --network apl-network \
  apl-pcd-api

# Ver logs
docker logs -f apl-pcd-api
```

## ✅ Checklist de Instalação

- [ ] Node.js 18+ instalado
- [ ] PostgreSQL 15+ instalado e rodando
- [ ] Repositório clonado
- [ ] Dependências instaladas (`npm install`)
- [ ] Banco de dados criado
- [ ] Tabelas criadas no banco
- [ ] Arquivo `.env` configurado
- [ ] Projeto compilado (`npm run build`)
- [ ] Servidor iniciado com sucesso
- [ ] Testes executados com sucesso (`npm test`)
- [ ] API respondendo em `http://localhost:3000`

## 🆘 Problemas Comuns

Consulte o guia de [Troubleshooting](./10-TROUBLESHOOTING.md) para soluções de problemas comuns durante a instalação.

## 📚 Próximos Passos

Após a instalação bem-sucedida:

1. ✅ Leia o [Guia de Configuração](./03-CONFIGURACAO.md)
2. ✅ Explore a [Referência da API](./06-API-REFERENCE.md)
3. ✅ Execute os [Testes](./08-TESTES.md)
4. ✅ Configure o [Deployment](./09-DEPLOYMENT.md)

---

**Instalação concluída com sucesso! 🎉**
