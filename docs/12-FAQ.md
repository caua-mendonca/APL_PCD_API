# ❓ FAQ - Perguntas Frequentes

## 📚 Índice

1. [Geral](#-geral)
2. [Instalação](#-instalação)
3. [Configuração](#️-configuração)
4. [Desenvolvimento](#-desenvolvimento)
5. [API](#-api)
6. [Segurança](#-segurança)
7. [Performance](#-performance)
8. [Deploy](#-deploy)
9. [Troubleshooting](#-troubleshooting)

---

## 🌟 Geral

### O que é o APL PCD API?

O APL PCD API é uma aplicação backend robusta desenvolvida com Node.js, TypeScript e PostgreSQL, projetada para promover a inclusão profissional de pessoas com deficiência (PCD) no mercado de trabalho brasileiro.

### Quais são os principais recursos?

- 👥 Gestão completa de candidatos PCD
- 🏢 Gestão de empresas e vagas
- 💼 Sistema de candidaturas
- 📅 Calendário e agendamento de eventos
- ♿ Gestão de acessibilidade e barreiras
- 🔐 Segurança enterprise-grade
- 🧪 110+ testes automatizados

### O projeto é open source?

Sim! O projeto está disponível no [GitHub](https://github.com/cMendoncaaa/APL-WEB-PCD) sob licença ISC.

### Qual a diferença entre candidato, empresa e colaborador?

- **Candidato**: Pessoa com deficiência buscando oportunidades
- **Empresa**: Organização que publica vagas
- **Colaborador**: Profissional de RH vinculado a uma empresa

---

## 💻 Instalação

### Quais são os pré-requisitos?

- Node.js 18+ (LTS recomendado)
- PostgreSQL 15+
- npm 9+
- Git 2.30+

### Posso usar Yarn ao invés de npm?

Sim, o projeto é compatível com Yarn:

```bash
# Instalar dependências
yarn install

# Executar
yarn start

# Testes
yarn test
```

### Como instalar em Windows?

1. Instale [Node.js](https://nodejs.org/)
2. Instale [PostgreSQL](https://www.postgresql.org/download/windows/)
3. Clone o repositório
4. Execute `npm install`
5. Configure o `.env`
6. Execute `npm start`

### É possível usar SQLite ou MySQL?

O projeto foi desenvolvido especificamente para PostgreSQL. Migrar para outros bancos exigiria alterações significativas no código.

### Preciso do Redis?

O Redis é opcional. Ele melhora a performance com cache, mas o sistema funciona sem ele.

---

## ⚙️ Configuração

### Como gerar uma chave JWT segura?

```bash
# Método 1: OpenSSL
openssl rand -base64 32

# Método 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### Onde configuro as variáveis de ambiente?

Crie um arquivo `.env` na raiz do projeto baseado no `.env-preview`:

```bash
cp .env-preview .env
# Edite o .env com suas configurações
```

### Como alterar a porta do servidor?

No arquivo `.env`:

```bash
PORT=3000  # Altere para a porta desejada
```

### Como configurar CORS para múltiplos domínios?

No arquivo `.env`:

```bash
CORS_ORIGINS=http://localhost:3000,https://meusite.com,https://app.meusite.com
```

### Quantas conexões de banco devo configurar?

Depende do seu hardware:

```bash
# Desenvolvimento
DB_POOL_MIN=2
DB_POOL_MAX=10

# Produção
DB_POOL_MIN=5
DB_POOL_MAX=20
```

---

## 👨‍💻 Desenvolvimento

### Como executar o projeto em modo desenvolvimento?

```bash
npm run start
```

### Como fazer hot reload durante desenvolvimento?

Use `nodemon` com `ts-node`:

```bash
# Instalar
npm install -D nodemon

# Adicionar script no package.json
"dev": "nodemon --exec ts-node src/index.ts"

# Executar
npm run dev
```

### Posso usar ES Modules ao invés de CommonJS?

Sim! O projeto já está configurado para ES Modules. Verifique o `package.json`:

```json
{
  "type": "module"
}
```

### Como adicionar uma nova rota?

1. Adicione a rota em `.env.routes`:
```bash
NEW_ROUTE=/api/nova-rota
```

2. Importe em `src/routes/routes.ts`:
```typescript
export const newRoute: string = String(process.env.NEW_ROUTE);
```

3. Adicione o endpoint no servidor.

### Como criar uma nova validação?

```typescript
// src/validation/validateData/validateNome.ts

export const validateNome = (nome: string): boolean => {
  // Sua lógica de validação
  if (!nome || nome.length < 3) {
    return false;
  }
  return true;
};
```

---

## 📡 API

### Como faço autenticação?

1. Faça login:
```bash
POST /api/login/candidato
{
  "email": "user@example.com",
  "senha": "senha123"
}
```

2. Use o token retornado:
```bash
Authorization: Bearer SEU_TOKEN_JWT
```

### Quanto tempo dura o token JWT?

Por padrão, 24 horas. Configure em `.env`:

```bash
JWT_EXPIRES_IN=24h  # Opções: 15m, 1h, 7d, 30d
```

### Como buscar vagas disponíveis?

```bash
GET /api/vagas?status=ativa
Authorization: Bearer SEU_TOKEN
```

### Como um candidato se candidata a uma vaga?

```bash
POST /api/vaga/:vagaId/candidatar
Authorization: Bearer SEU_TOKEN
Content-Type: application/json

{
  "candidatoId": "CAND-123456"
}
```

### Qual o formato dos IDs?

Cada entidade tem um prefixo específico:

- `CAND-123456` - Candidato
- `VAGA-123456` - Vaga
- `EMP-123456` - Empresa
- `COLAB-123456` - Colaborador
- `EVENT-123456` - Evento

### Como paginar resultados?

```bash
GET /api/vagas?page=1&limit=20
```

### A API retorna erros em português?

Sim, todas as mensagens de erro e sucesso estão em português.

---

## 🔐 Segurança

### As senhas são criptografadas?

Sim! Usamos bcrypt com 12 rounds de salt:

```typescript
const hashedPassword = await bcrypt.hash(senha, 12);
```

### Como funciona o rate limiting?

- **Global**: 100 requisições a cada 15 minutos
- **Login**: 5 tentativas a cada 15 minutos

Configure em `.env`:

```bash
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5
```

### O sistema previne SQL Injection?

Sim! Usamos:
1. Prepared statements
2. Parameterized queries
3. Input sanitization
4. Identifier validation

### Como funcionam os security headers?

Usamos Helmet.js que adiciona:
- `Strict-Transport-Security`
- `X-Frame-Options`
- `X-Content-Type-Options`
- `X-XSS-Protection`
- `Referrer-Policy`

### Posso desabilitar o rate limiting?

**Não recomendado**, mas possível em desenvolvimento:

```typescript
// Comentar em server.ts
// app.use(limiter);
```

---

## ⚡ Performance

### Qual o tempo médio de resposta?

< 100ms para a maioria dos endpoints com cache ativo.

### Como melhorar a performance?

1. **Habilitar Redis**:
```bash
REDIS_ENABLED=true
```

2. **Aumentar pool de conexões**:
```bash
DB_POOL_MAX=20
```

3. **Usar clustering** (PM2):
```bash
pm2 start ecosystem.config.js -i max
```

4. **Habilitar gzip no Nginx**

### O Redis é necessário?

Não é obrigatório, mas melhora significativamente a performance em produção.

### Como monitorar performance?

```bash
# PM2
pm2 monit

# Logs
pm2 logs apl-pcd-api

# Metrics
pm2 metrics
```

---

## 🚀 Deploy

### Qual é a melhor opção de deploy?

Depende das suas necessidades:

- **Docker**: Mais fácil e isolado
- **PM2**: Melhor performance e controle
- **Kubernetes**: Para grandes escalas

### Posso fazer deploy no Heroku?

Sim! Crie um `Procfile`:

```
web: node build/index.js
```

E configure as variáveis de ambiente no dashboard.

### Como fazer deploy no AWS?

1. EC2 + RDS + PM2
2. Elastic Beanstalk
3. ECS (Docker)

Veja o [guia de deployment](./09-DEPLOYMENT.md).

### Preciso de um servidor dedicado?

Não necessariamente. Pode usar:
- VPS (DigitalOcean, Linode)
- PaaS (Heroku, Railway)
- Cloud (AWS, Google Cloud, Azure)

### Como configurar SSL/TLS?

Use Let's Encrypt + Certbot:

```bash
sudo certbot --nginx -d api.seudominio.com
```

---

## 🐛 Troubleshooting

### Erro: "Cannot find module"

```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Connection refused" no banco

Verifique se o PostgreSQL está rodando:

```bash
# Linux
sudo systemctl status postgresql

# Windows
# Verifique Services.msc

# Docker
docker ps
```

### Erro: "JWT malformed"

O token está inválido ou expirado. Faça login novamente.

### Erro: "Too many requests"

Você atingiu o limite de rate limiting. Aguarde 15 minutos ou configure um limite maior.

### Testes falhando

```bash
# Limpar cache do Jest
npm test -- --clearCache

# Executar novamente
npm test
```

### Aplicação não inicia

Verifique:
1. ✅ Variáveis de ambiente configuradas
2. ✅ Banco de dados rodando
3. ✅ Porta disponível
4. ✅ Dependências instaladas

```bash
# Debug
NODE_ENV=development npm start
```

### Como resetar o banco de dados?

```sql
-- CUIDADO: Isso apaga todos os dados!
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Recrie as tabelas
\i database/schema.sql
```

### Erro de permissão no PostgreSQL

```sql
-- Conceder permissões
GRANT ALL PRIVILEGES ON DATABASE apl_pcd_db TO apl_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO apl_user;
```

---

## 💡 Dicas e Boas Práticas

### Como organizar meu código?

Siga a estrutura do projeto:
- Controllers: Lógica de requisição/resposta
- Models: Estrutura de dados
- Repositories: Acesso ao banco
- Services: Lógica de negócio
- Validation: Validações

### Devo commitar o .env?

**NUNCA!** O `.env` contém informações sensíveis. Use `.env-preview` como template.

### Como versionar a API?

Use prefixo nas rotas:

```typescript
app.use('/api/v1', routes);
app.use('/api/v2', routesV2);
```

### Qual editor de código usar?

Recomendamos **VS Code** com extensões:
- ESLint
- Prettier
- GitLens
- Thunder Client

### Como contribuir para o projeto?

Veja o [guia de contribuição](./11-CONTRIBUTING.md).

---

## 🆘 Ainda tem dúvidas?

- 📖 Leia a [documentação completa](./WIKI.md)
- 🐛 Abra uma [issue no GitHub](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 💬 Entre no Discord da comunidade
- 📧 Envie email: suporte@aplpcd.com

---

<div align="center">

**Documentação mantida por Diego Melo e comunidade**

*Última atualização: Novembro 2025*

</div>
