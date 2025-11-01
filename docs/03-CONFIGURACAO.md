# ⚙️ Guia de Configuração

Este documento descreve todas as configurações necessárias para executar o APL PCD API.

## 📁 Arquivos de Configuração

### 1. `.env` - Variáveis de Ambiente Principais

Este é o arquivo principal de configuração. **NUNCA** commite este arquivo no Git.

```bash
# ====================================
# CONFIGURAÇÕES DO BANCO DE DADOS
# ====================================

# Usuário do PostgreSQL
DB_USER=apl_user

# Host do banco (localhost para desenvolvimento, IP/hostname para produção)
DB_HOST=localhost

# Nome do banco de dados
DB_DATABASE=apl_pcd_db

# Senha do banco de dados
DB_PASSWORD=sua_senha_super_segura

# Porta do PostgreSQL (padrão: 5432)
DB_PORT=5432

# Pool de conexões
DB_POOL_MIN=2
DB_POOL_MAX=10

# ====================================
# CONFIGURAÇÕES DO SERVIDOR
# ====================================

# Porta onde o servidor irá rodar
PORT=3000

# Ambiente de execução
# Valores: development | production | test
NODE_ENV=development

# URL base da API (usado para CORS e links)
API_BASE_URL=http://localhost:3000

# ====================================
# CONFIGURAÇÕES JWT (Autenticação)
# ====================================

# Chave secreta para assinar tokens JWT
# IMPORTANTE: Use uma chave forte com mínimo 32 caracteres
# Gere com: openssl rand -base64 32
JWT_SECRET=sua_chave_secreta_super_segura_aqui_min_32_caracteres

# Tempo de expiração do token
# Exemplos: 15m, 1h, 24h, 7d, 30d
JWT_EXPIRES_IN=24h

# Tempo de expiração do refresh token
JWT_REFRESH_EXPIRES_IN=7d

# ====================================
# CONFIGURAÇÕES REDIS (Cache)
# ====================================

# Host do Redis
REDIS_HOST=localhost

# Porta do Redis (padrão: 6379)
REDIS_PORT=6379

# Senha do Redis (deixe vazio se não tiver)
REDIS_PASSWORD=

# TTL padrão do cache (em segundos)
REDIS_TTL=3600

# Habilitar Redis
REDIS_ENABLED=false

# ====================================
# CONFIGURAÇÕES DE SEGURANÇA
# ====================================

# Rate Limiting - Janela de tempo (ms)
# 900000ms = 15 minutos
RATE_LIMIT_WINDOW_MS=900000

# Rate Limiting - Máximo de requests por janela
RATE_LIMIT_MAX_REQUESTS=100

# Rate Limiting para Login - Máximo de tentativas
LOGIN_RATE_LIMIT_MAX=5

# Bcrypt - Rounds de salt (maior = mais seguro, mas mais lento)
# Recomendado: 10-12
BCRYPT_SALT_ROUNDS=12

# CORS - Origens permitidas (separadas por vírgula)
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# ====================================
# CONFIGURAÇÕES DE LOGS
# ====================================

# Nível de log
# Valores: error | warn | info | debug
LOG_LEVEL=info

# Formato do log
# Valores: json | simple
LOG_FORMAT=json

# Diretório de logs
LOG_DIR=./logs

# Máximo de arquivos de log
LOG_MAX_FILES=14d

# Tamanho máximo de cada arquivo de log
LOG_MAX_SIZE=20m

# ====================================
# CONFIGURAÇÕES DE EMAIL (Opcional)
# ====================================

# SMTP Server
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu_email@gmail.com
SMTP_PASSWORD=sua_senha_app

# Email remetente
EMAIL_FROM=noreply@aplpcd.com

# ====================================
# CONFIGURAÇÕES DE UPLOAD (Opcional)
# ====================================

# Diretório de uploads
UPLOAD_DIR=./uploads

# Tamanho máximo de arquivo (bytes)
# 5MB = 5242880
MAX_FILE_SIZE=5242880

# Tipos de arquivo permitidos
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

# ====================================
# CONFIGURAÇÕES DE PAGINAÇÃO
# ====================================

# Limite padrão de itens por página
DEFAULT_PAGE_SIZE=20

# Limite máximo de itens por página
MAX_PAGE_SIZE=100
```

### 2. `.env-preview` - Template de Configuração

Este arquivo serve como template e deve ser commitado no Git.

```bash
# Este é um arquivo de exemplo
# Copie para .env e configure com seus valores

DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=sua_senha
DB_PORT=5432

PORT=3000
NODE_ENV=development

JWT_SECRET=gere_uma_chave_segura_aqui
JWT_EXPIRES_IN=24h

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5
BCRYPT_SALT_ROUNDS=12
```

### 3. `.env.routes` - Rotas da API

```bash
# ====================================
# ROTAS - CANDIDATO
# ====================================
CREATE_CANDIDATO=/api/candidato
GET_CANDIDATO=/api/candidato/:id
GET_CANDIDATO_BY_EMAIL=/api/candidato/email/:email
DELETE_CANDIDATO=/api/candidato/:id
UPDATE_CANDIDATO=/api/candidato/:id

# ====================================
# ROTAS - EMPRESA
# ====================================
CREATE_CONTRATANTE=/api/empresa
GET_CONTRATANTE=/api/empresa/:id
GET_CONTRATANTE_BY_EMAIL=/api/empresa/email/:email
DELETE_CONTRATANTE=/api/empresa/:id
UPDATE_CONTRATANTE=/api/empresa/:id

# ====================================
# ROTAS - COLABORADOR
# ====================================
CREATE_COLABORADOR=/api/colaborador/:empresaId
GET_COLABORADOR=/api/colaborador/:id

# ====================================
# ROTAS - VAGA
# ====================================
CREATE_VAGA=/api/vaga
REGISTER_VAGA=/api/vaga/:vagaId/candidatar
GET_VAGAS=/api/vagas
GET_VAGAS_BY_ID=/api/vaga/:id
GET_VAGA_BY_CANDIDATE=/api/candidato/:candidatoId/vagas
DELETE_VAGA=/api/vaga/:id
UPDATE_VAGA=/api/vaga/:id

# ====================================
# ROTAS - EVENTO
# ====================================
CREATE_EVENTO=/api/evento/:empresaId
GET_EVENTO=/api/evento/:id
DELETE_EVENTO=/api/evento/:id

# ====================================
# ROTAS - CALENDÁRIO
# ====================================
CREATE_CALENDARIO=/api/calendario/:empresaId
GET_CALENDARIO=/api/calendario/:id

# ====================================
# ROTAS - LOGIN
# ====================================
LOGIN_CAND=/api/login/candidato
LOGIN_EMP=/api/login/empresa
LOGIN_ADM=/api/login/admin

# ====================================
# ROTAS - ALTERAÇÃO DE SENHA
# ====================================
CHANGE_PASSWORD=/api/alterar-senha

# ====================================
# ROTAS - ADMIN
# ====================================
CREATE_BARREIRA=/api/admin/barreira
CREATE_ACESSIBILIDADE=/api/admin/acessibilidade
CREATE_SUBTIPO=/api/admin/subtipo
GET_DADOS_ANALITICOS=/api/admin/analytics
```

### 4. `.env.status` - Mensagens de Status HTTP

```bash
# Status HTTP Messages
STATUS_200=Operação realizada com sucesso
STATUS_201=Recurso criado com sucesso
STATUS_204=Operação realizada sem conteúdo de retorno
STATUS_400=Requisição inválida
STATUS_401=Não autorizado
STATUS_403=Acesso negado
STATUS_404=Recurso não encontrado
STATUS_409=Conflito - Recurso já existe
STATUS_422=Dados não processáveis
STATUS_429=Muitas requisições - Tente novamente mais tarde
STATUS_500=Erro interno do servidor
STATUS_503=Serviço indisponível
```

## 🔐 Configurações de Segurança

### Gerar Chave JWT Segura

```bash
# Método 1: OpenSSL (Linux/Mac)
openssl rand -base64 32

# Método 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Método 3: Online
# Use: https://generate-secret.vercel.app/32
```

### Configurar bcrypt Salt Rounds

```javascript
// Referência de performance:
// 10 rounds: ~65 ms
// 12 rounds: ~260 ms (RECOMENDADO)
// 14 rounds: ~1040 ms
// 16 rounds: ~4160 ms

BCRYPT_SALT_ROUNDS=12
```

### Rate Limiting Recomendado

```bash
# Produção - Mais restritivo
RATE_LIMIT_WINDOW_MS=900000  # 15 minutos
RATE_LIMIT_MAX_REQUESTS=100   # 100 requests
LOGIN_RATE_LIMIT_MAX=5        # 5 tentativas de login

# Desenvolvimento - Mais permissivo
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=1000
LOGIN_RATE_LIMIT_MAX=10
```

## 🗄️ Configurações do Banco de Dados

### Pool de Conexões (connect.ts)

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  
  // Pool configuration
  min: parseInt(process.env.DB_POOL_MIN || '2'),
  max: parseInt(process.env.DB_POOL_MAX || '10'),
  
  // Connection timeouts
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  
  // SSL para produção
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
});
```

### Otimizações PostgreSQL

```sql
-- postgresql.conf

# Conexões
max_connections = 100

# Memória
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB

# WAL
wal_buffers = 16MB
checkpoint_completion_target = 0.9

# Performance
random_page_cost = 1.1
effective_io_concurrency = 200
```

## 🚀 Configurações por Ambiente

### Desenvolvimento

```bash
NODE_ENV=development
PORT=3000
LOG_LEVEL=debug
REDIS_ENABLED=false
RATE_LIMIT_MAX_REQUESTS=1000
```

### Staging/Homologação

```bash
NODE_ENV=staging
PORT=3000
LOG_LEVEL=info
REDIS_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=500
```

### Produção

```bash
NODE_ENV=production
PORT=80
LOG_LEVEL=warn
REDIS_ENABLED=true
RATE_LIMIT_MAX_REQUESTS=100
BCRYPT_SALT_ROUNDS=12
JWT_EXPIRES_IN=1h
```

## 🔧 Configurações Avançadas

### CORS Detalhado

```typescript
// src/config/cors.ts
import cors from 'cors';

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [
  'http://localhost:3000',
  'http://localhost:3001'
];

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  maxAge: 86400 // 24 horas
};
```

### Helmet Security Headers

```typescript
// src/config/security.ts
import helmet from 'helmet';

export const helmetOptions = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  frameguard: {
    action: 'deny'
  },
  xssFilter: true,
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});
```

### Winston Logger

```typescript
// src/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // Console
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    // File - Errors
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5
    }),
    // File - All
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 5242880,
      maxFiles: 5
    })
  ]
});
```

## ✅ Checklist de Configuração

- [ ] Arquivo `.env` criado e configurado
- [ ] JWT_SECRET gerado com segurança
- [ ] Banco de dados configurado
- [ ] Pool de conexões otimizado
- [ ] Rate limiting configurado
- [ ] CORS configurado
- [ ] Helmet security headers ativos
- [ ] Sistema de logs funcionando
- [ ] Redis configurado (se aplicável)
- [ ] Variáveis de ambiente validadas

## 🔍 Validar Configurações

Execute o script de validação:

```bash
# Criar script de validação
npm run validate-env

# Ou manualmente
node -e "
const fs = require('fs');
const dotenv = require('dotenv');
const config = dotenv.parse(fs.readFileSync('.env'));

const required = ['DB_USER', 'DB_PASSWORD', 'JWT_SECRET'];
const missing = required.filter(key => !config[key]);

if (missing.length) {
  console.error('Missing required env vars:', missing);
  process.exit(1);
}
console.log('✅ All required environment variables are set');
"
```

## 📚 Próximos Passos

- Leia sobre a [Arquitetura do Sistema](./04-ARQUITETURA.md)
- Explore o [Modelo do Banco de Dados](./05-BANCO-DE-DADOS.md)
- Consulte a [Referência da API](./06-API-REFERENCE.md)

---

**Configuração concluída! 🎉**
