# 🚀 Guia de Deployment e Produção

Este guia fornece instruções completas para fazer o deploy do APL PCD API em ambiente de produção.

## 📋 Pré-requisitos para Produção

- Servidor Linux (Ubuntu 20.04+ recomendado)
- Node.js 18+ LTS
- PostgreSQL 15+
- Nginx (reverse proxy)
- SSL/TLS Certificado
- Domínio configurado
- Redis (opcional, mas recomendado)
- PM2 ou Docker

## 🎯 Checklist Pré-Deploy

- [ ] Código testado (99%+ cobertura)
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados otimizado
- [ ] SSL/TLS configurado
- [ ] Backup configurado
- [ ] Monitoramento configurado
- [ ] Logs centralizados
- [ ] Rate limiting ajustado
- [ ] CORS configurado
- [ ] Security headers ativos

## 🐳 Deploy com Docker

### 1. Dockerfile de Produção

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar dependências
COPY package*.json ./
COPY tsconfig.json ./

# Instalar dependências
RUN npm ci --only=production && npm cache clean --force

# Copiar código fonte
COPY src ./src

# Compilar TypeScript
RUN npm run build

# Stage de produção
FROM node:18-alpine

WORKDIR /app

# Criar usuário não-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar arquivos necessários
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/build ./build

# Mudar para usuário não-root
USER nodejs

# Expor porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicialização
CMD ["node", "build/index.js"]
```

### 2. docker-compose.yml para Produção

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: apl-pcd-api
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - PORT=3000
    env_file:
      - .env.production
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    networks:
      - apl-network
    volumes:
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s

  postgres:
    image: postgres:15-alpine
    container_name: apl-pcd-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${DB_DATABASE}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init:/docker-entrypoint-initdb.d
    networks:
      - apl-network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: apl-pcd-redis
    restart: unless-stopped
    command: redis-server --requirepass ${REDIS_PASSWORD} --maxmemory 256mb --maxmemory-policy allkeys-lru
    volumes:
      - redis_data:/data
    networks:
      - apl-network
    healthcheck:
      test: ["CMD", "redis-cli", "--raw", "incr", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  nginx:
    image: nginx:alpine
    container_name: apl-pcd-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
      - ./nginx/logs:/var/log/nginx
    depends_on:
      - app
    networks:
      - apl-network

volumes:
  postgres_data:
    driver: local
  redis_data:
    driver: local

networks:
  apl-network:
    driver: bridge
```

### 3. Comandos Docker

```bash
# Build
docker-compose build

# Iniciar em produção
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Status dos containers
docker-compose ps

# Parar containers
docker-compose down

# Parar e remover volumes
docker-compose down -v

# Rebuild completo
docker-compose down && docker-compose build --no-cache && docker-compose up -d
```

## 🔧 Deploy com PM2

### 1. Instalar PM2

```bash
# Instalar PM2 globalmente
npm install -g pm2

# Verificar instalação
pm2 --version
```

### 2. Arquivo ecosystem.config.js

```javascript
module.exports = {
  apps: [{
    name: 'apl-pcd-api',
    script: './build/index.js',
    instances: 'max', // Usa todos os CPUs
    exec_mode: 'cluster',
    
    // Variáveis de ambiente
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    
    // Logs
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    
    // Auto restart
    autorestart: true,
    max_restarts: 10,
    min_uptime: '10s',
    
    // Memory
    max_memory_restart: '500M',
    
    // Watch (desabilitar em produção)
    watch: false,
    
    // Cluster mode
    instance_var: 'INSTANCE_ID',
    
    // Graceful shutdown
    kill_timeout: 5000,
    listen_timeout: 5000,
    
    // Cron para restart
    cron_restart: '0 3 * * *' // Todo dia às 3h
  }]
};
```

### 3. Comandos PM2

```bash
# Iniciar aplicação
pm2 start ecosystem.config.js --env production

# Listar processos
pm2 list

# Monitorar
pm2 monit

# Logs
pm2 logs apl-pcd-api

# Restart
pm2 restart apl-pcd-api

# Reload (zero-downtime)
pm2 reload apl-pcd-api

# Stop
pm2 stop apl-pcd-api

# Delete
pm2 delete apl-pcd-api

# Salvar configuração
pm2 save

# Startup (autostart no boot)
pm2 startup
pm2 save
```

## 🌐 Configuração Nginx

### 1. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/apl-pcd-api

upstream apl_backend {
    least_conn;
    server localhost:3000;
    # Para múltiplas instâncias:
    # server localhost:3001;
    # server localhost:3002;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name api.aplpcd.com;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.aplpcd.com;
    
    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Logs
    access_log /var/log/nginx/apl-pcd-access.log;
    error_log /var/log/nginx/apl-pcd-error.log;
    
    # Client settings
    client_max_body_size 10M;
    client_body_timeout 60s;
    
    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;
    
    # Proxy to Node.js
    location / {
        proxy_pass http://apl_backend;
        proxy_http_version 1.1;
        
        # Headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
        
        # Cache bypass
        proxy_cache_bypass $http_upgrade;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        proxy_pass http://apl_backend/health;
    }
}
```

### 2. Ativar Configuração

```bash
# Criar symlink
sudo ln -s /etc/nginx/sites-available/apl-pcd-api /etc/nginx/sites-enabled/

# Testar configuração
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Status
sudo systemctl status nginx
```

## 🔒 SSL/TLS com Let's Encrypt

### 1. Instalar Certbot

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Verificar instalação
certbot --version
```

### 2. Obter Certificado

```bash
# Método automático (com Nginx)
sudo certbot --nginx -d api.aplpcd.com

# Método manual
sudo certbot certonly --nginx -d api.aplpcd.com

# Renovação automática
sudo certbot renew --dry-run

# Adicionar ao cron
sudo crontab -e
# Adicionar linha:
0 3 * * * certbot renew --quiet --post-hook "systemctl reload nginx"
```

## 📊 Monitoramento e Logs

### 1. PM2 Monitoring

```bash
# Instalar módulo de monitoramento
pm2 install pm2-logrotate

# Configurar
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true

# Monitoramento em tempo real
pm2 monit

# Metrics
pm2 metrics
```

### 2. Winston Logs em Produção

```typescript
// src/utils/logger.ts (produção)

import winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const transports = [
  // Console
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
    level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug'
  }),
  
  // File - Errors
  new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: '20m',
    maxFiles: '30d',
    format: logFormat
  }),
  
  // File - Combined
  new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    format: logFormat
  })
];

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false
});
```

### 3. Integração com Sistemas Externos

```bash
# Sentry (Error Tracking)
npm install @sentry/node

# New Relic (APM)
npm install newrelic

# DataDog
npm install dd-trace
```

## 🔄 CI/CD Pipeline

### 1. GitHub Actions

```yaml
# .github/workflows/deploy.yml

name: Deploy to Production

on:
  push:
    branches: [ master ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Check coverage
        run: npm run test:coverage

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Build TypeScript
        run: |
          npm ci
          npm run build
          
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build
          path: build/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            cd /var/www/apl-pcd-api
            git pull origin master
            npm ci --only=production
            npm run build
            pm2 reload ecosystem.config.js --env production
```

### 2. GitLab CI/CD

```yaml
# .gitlab-ci.yml

stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

test:
  stage: test
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm test
    - npm run test:coverage
  coverage: '/All files[^|]*\|[^|]*\s+([\d\.]+)/'

build:
  stage: build
  image: node:${NODE_VERSION}
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - build/
    expire_in: 1 hour

deploy_production:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  script:
    - ssh -o StrictHostKeyChecking=no $SERVER_USER@$SERVER_HOST "cd /var/www/apl-pcd-api && git pull && npm ci && npm run build && pm2 reload all"
  only:
    - master
```

## 💾 Backup e Restore

### 1. Backup do Banco de Dados

```bash
#!/bin/bash
# scripts/backup-db.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backup/postgres"
DB_NAME="apl_pcd_db"

# Criar diretório se não existir
mkdir -p $BACKUP_DIR

# Backup
pg_dump -U postgres -h localhost $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Manter apenas últimos 30 dias
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

### 2. Restore do Banco

```bash
#!/bin/bash
# scripts/restore-db.sh

BACKUP_FILE=$1

if [ -z "$BACKUP_FILE" ]; then
    echo "Usage: ./restore-db.sh <backup_file.sql.gz>"
    exit 1
fi

# Restore
gunzip < $BACKUP_FILE | psql -U postgres -h localhost apl_pcd_db

echo "Restore completed"
```

### 3. Cron para Backup Automático

```bash
# Editar crontab
crontab -e

# Adicionar linha (backup diário às 2h)
0 2 * * * /path/to/scripts/backup-db.sh >> /var/log/backup.log 2>&1
```

## 📈 Escalabilidade

### 1. Load Balancer

```nginx
upstream apl_backend {
    least_conn;
    server app1.aplpcd.com:3000 weight=3;
    server app2.aplpcd.com:3000 weight=2;
    server app3.aplpcd.com:3000 backup;
}
```

### 2. Database Replication

```sql
-- Master-Slave Replication
-- Master: Configure postgresql.conf
wal_level = replica
max_wal_senders = 3
```

## ✅ Checklist Final

- [ ] Aplicação buildada e testada
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] SSL/TLS configurado
- [ ] Nginx configurado
- [ ] PM2/Docker rodando
- [ ] Logs configurados
- [ ] Monitoramento ativo
- [ ] Backup automatizado
- [ ] CI/CD pipeline ativo
- [ ] Documentação atualizada

---

**Deploy Completo! 🚀**
