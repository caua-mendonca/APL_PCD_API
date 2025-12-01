# ⚡ Guia de Referência Rápida - APL PCD API

## 🚀 Comandos Essenciais

### Instalação e Setup

```bash
# Clone
git clone https://github.com/cMendoncaaa/APL-WEB-PCD.git
cd APL_PCD_API

# Instalar
npm install

# Configurar
cp .env-preview .env

# Iniciar
npm start
```

### Desenvolvimento

```bash
# Desenvolvimento com hot reload
npm run dev

# Build
npm run build

# Testes
npm test                    # Todos os testes
npm run test:unit          # Unitários
npm run test:integration   # Integração
npm run test:coverage      # Com cobertura
npm run test:watch         # Modo watch
```

### Docker

```bash
# Build
docker-compose build

# Iniciar
docker-compose up -d

# Logs
docker-compose logs -f

# Parar
docker-compose down
```

---

## 📡 Endpoints Principais

### Autenticação

```bash
# Login Candidato
POST /api/login/candidato
{
  "email": "user@example.com",
  "senha": "senha123"
}

# Login Empresa
POST /api/login/empresa
{
  "email": "empresa@example.com",
  "senha": "senha123"
}

# Alterar Senha
POST /api/alterar-senha
{
  "email": "user@example.com",
  "senhaAtual": "senha123",
  "novaSenha": "novaSenha123"
}
```

### Candidatos

```bash
# Criar
POST /api/candidato
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123",
  "cpf": "12345678909",
  "data_nascimento": "1990-01-01",
  "telefone": "11987654321",
  "def_motora": true,
  "def_auditiva": false,
  "def_visual": false,
  "sub_tipo": "SUBT-001",
  "barreira": "BARR-001",
  "acessbilidade": "ACES-001"
}

# Buscar por ID
GET /api/candidato/:id
Authorization: Bearer TOKEN

# Buscar por Email
GET /api/candidato/email/:email
Authorization: Bearer TOKEN

# Atualizar
PUT /api/candidato/:id
Authorization: Bearer TOKEN
{
  "nome": "João Silva Atualizado",
  "telefone": "11999999999"
}

# Deletar
DELETE /api/candidato/:id
Authorization: Bearer TOKEN
```

### Empresas

```bash
# Criar
POST /api/empresa
{
  "nome": "Empresa XYZ",
  "cnpj": "12345678000190",
  "email": "contato@empresa.com",
  "senha": "senha123",
  "telefone": "1133334444",
  "endereco": "Rua ABC, 123"
}

# Buscar por ID
GET /api/empresa/:id
Authorization: Bearer TOKEN

# Atualizar
PUT /api/empresa/:id
Authorization: Bearer TOKEN

# Deletar
DELETE /api/empresa/:id
Authorization: Bearer TOKEN
```

### Vagas

```bash
# Criar Vaga
POST /api/vaga
Authorization: Bearer TOKEN
{
  "titulo": "Desenvolvedor Full Stack",
  "descricao": "Vaga para desenvolvedor...",
  "requisitos": "Node.js, React, PostgreSQL",
  "salario": 5000.00,
  "tipo_contrato": "CLT",
  "carga_horaria": "40h/semana",
  "modalidade": "Remoto",
  "cidade": "São Paulo",
  "estado": "SP"
}

# Listar Vagas
GET /api/vagas?status=ativa&page=1&limit=20
Authorization: Bearer TOKEN

# Buscar Vaga por ID
GET /api/vaga/:id
Authorization: Bearer TOKEN

# Candidatar-se
POST /api/vaga/:vagaId/candidatar
Authorization: Bearer TOKEN
{
  "candidatoId": "CAND-123456"
}

# Vagas do Candidato
GET /api/candidato/:candidatoId/vagas
Authorization: Bearer TOKEN

# Atualizar Vaga
PUT /api/vaga/:id
Authorization: Bearer TOKEN

# Deletar Vaga
DELETE /api/vaga/:id
Authorization: Bearer TOKEN
```

### Colaboradores

```bash
# Criar Colaborador
POST /api/colaborador/:empresaId
Authorization: Bearer TOKEN
{
  "nome": "Maria Santos",
  "email": "maria@empresa.com",
  "senha": "senha123",
  "cargo": "Gerente de RH",
  "telefone": "11988887777"
}

# Buscar Colaborador
GET /api/colaborador/:id
Authorization: Bearer TOKEN
```

### Calendário e Eventos

```bash
# Criar Calendário
POST /api/calendario/:empresaId
Authorization: Bearer TOKEN
{
  "nome": "Calendário de Entrevistas",
  "descricao": "Agendamento de entrevistas"
}

# Buscar Calendário
GET /api/calendario/:id
Authorization: Bearer TOKEN

# Criar Evento
POST /api/evento/:empresaId
Authorization: Bearer TOKEN
{
  "titulo": "Entrevista - João Silva",
  "descricao": "Primeira entrevista",
  "data_inicio": "2025-11-15T10:00:00",
  "data_fim": "2025-11-15T11:00:00",
  "localizacao": "Sala 101",
  "tipo": "Entrevista",
  "calendario_id": "CALENDAR-123456"
}

# Buscar Evento
GET /api/evento/:id
Authorization: Bearer TOKEN

# Deletar Evento
DELETE /api/evento/:id
Authorization: Bearer TOKEN
```

### Admin

```bash
# Criar Barreira
POST /api/admin/barreira
Authorization: Bearer TOKEN
{
  "nome": "Escadas sem rampa",
  "descricao": "Dificuldade de acesso",
  "tipo": "Arquitetônica"
}

# Criar Acessibilidade
POST /api/admin/acessibilidade
Authorization: Bearer TOKEN
{
  "nome": "Rampa de acesso",
  "descricao": "Rampa para cadeirantes",
  "tipo": "Física"
}

# Criar Subtipo de Deficiência
POST /api/admin/subtipo
Authorization: Bearer TOKEN
{
  "tipo_deficiencia_id": "DMOTO-0001",
  "nome": "Paraplegia",
  "descricao": "Paralisia dos membros inferiores",
  "grau": "Severo"
}

# Dados Analíticos
GET /api/admin/analytics
Authorization: Bearer TOKEN
```

---

## 🔑 Headers Padrão

```bash
# Request Headers
Content-Type: application/json
Authorization: Bearer SEU_TOKEN_JWT

# Response Headers (automático)
X-Powered-By: Express
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=31536000
```

---

## 📊 Códigos de Status HTTP

| Código | Status | Uso |
|--------|--------|-----|
| 200 | OK | Requisição bem-sucedida |
| 201 | Created | Recurso criado |
| 204 | No Content | Deletado com sucesso |
| 400 | Bad Request | Dados inválidos |
| 401 | Unauthorized | Não autenticado |
| 403 | Forbidden | Sem permissão |
| 404 | Not Found | Recurso não encontrado |
| 409 | Conflict | Conflito (ex: email duplicado) |
| 422 | Unprocessable | Dados não processáveis |
| 429 | Too Many Requests | Rate limit excedido |
| 500 | Internal Error | Erro no servidor |

---

## 🔐 Variáveis de Ambiente

```bash
# Banco de Dados
DB_USER=apl_user
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=senha_segura
DB_PORT=5432

# Servidor
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=sua_chave_secreta_32_caracteres_min
JWT_EXPIRES_IN=24h

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_ENABLED=false

# Segurança
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOGIN_RATE_LIMIT_MAX=5
BCRYPT_SALT_ROUNDS=12

# CORS
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

---

## 🗄️ Estrutura do Banco

```sql
-- Tabelas Principais
tb_candidato              -- Candidatos PCD
tb_empresa                -- Empresas
tb_colaborador            -- Colaboradores
tb_vaga                   -- Vagas

-- Deficiências
tb_tipo_deficiencia       -- Tipos (Motora, Visual, etc)
tb_sub_tipo_deficiencia   -- Subtipos específicos

-- Acessibilidade
tb_barreira               -- Barreiras
tb_sub_tipo_barreira      -- Subtipos de barreira
tb_acessibilidade         -- Recursos de acessibilidade

-- Calendário
tb_calendario             -- Calendários
tb_evento                 -- Eventos

-- Relacionamentos N:N
tb_candidato_vaga         -- Candidaturas
tb_empresa_vaga           -- Vagas por empresa
tb_empresa_colaborador    -- Colaboradores por empresa
tb_barreira_acessibilidade -- Soluções para barreiras
```

---

## 🆔 Sistema de IDs

```
CAND-123456    # Candidato
VAGA-123456    # Vaga
EMP-123456     # Empresa
COLAB-123456   # Colaborador
DMOTO-0001     # Deficiência Motora
DVISU-0001     # Deficiência Visual
DAUDI-0001     # Deficiência Auditiva
SUBT-123456    # Subtipo
BARR-123456    # Barreira
ACES-123456    # Acessibilidade
CALENDAR-123456 # Calendário
EVENT-123456   # Evento
```

---

## 🧪 Exemplos de Teste

```bash
# Teste com cURL
curl -X POST http://localhost:3000/api/login/candidato \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","senha":"senha123"}'

# Teste com HTTPie
http POST http://localhost:3000/api/candidato \
  nome="João Silva" \
  email="joao@example.com" \
  senha="senha123"

# Teste com JavaScript/Fetch
fetch('http://localhost:3000/api/vagas', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## 🔧 Troubleshooting Rápido

```bash
# Limpar cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build

# Verificar PostgreSQL
psql -U postgres -c "SELECT version();"

# Verificar porta
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Logs do PM2
pm2 logs apl-pcd-api --lines 100

# Logs do Docker
docker-compose logs -f --tail=100

# Testar conexão banco
psql -U apl_user -d apl_pcd_db -c "SELECT NOW();"
```

---

## 📚 Comandos Git

```bash
# Criar branch
git checkout -b feature/nova-funcionalidade

# Commit
git add .
git commit -m "feat: adiciona nova funcionalidade"

# Push
git push origin feature/nova-funcionalidade

# Pull Request
# Abra no GitHub

# Atualizar branch
git checkout develop
git pull origin develop
git checkout feature/nova-funcionalidade
git rebase develop
```

---

## 🎯 Performance

```bash
# Monitorar com PM2
pm2 monit

# Ver métricas
pm2 metrics

# Restart com zero downtime
pm2 reload apl-pcd-api

# Ver uso de memória
pm2 list

# Configurar cluster
pm2 start ecosystem.config.js -i max
```

---

## 🔍 Queries SQL Úteis

```sql
-- Total de candidatos
SELECT COUNT(*) FROM tb_candidato;

-- Vagas ativas
SELECT * FROM tb_vaga WHERE status = 'ativa';

-- Candidaturas por vaga
SELECT v.titulo, COUNT(cv.id) as total
FROM tb_vaga v
LEFT JOIN tb_candidato_vaga cv ON v.id = cv.tb_vaga_id
GROUP BY v.id, v.titulo;

-- Candidatos por deficiência
SELECT td.nome, COUNT(c.id) as total
FROM tb_tipo_deficiencia td
LEFT JOIN tb_candidato c ON td.id = c.deficiencia
GROUP BY td.id, td.nome;
```

---

## 📞 Links Rápidos

- 📖 [Documentação Completa](./WIKI.md)
- 🐛 [Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 💻 [Repositório](https://github.com/cMendoncaaa/APL-WEB-PCD)
- 📧 [Email](mailto:suporte@aplpcd.com)

---

<div align="center">

**⚡ Referência Rápida APL PCD API**

*Sempre à mão quando você precisar!*

</div>
