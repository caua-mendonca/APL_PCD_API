# 📚 Documentação APL PCD API

Bem-vindo à documentação completa do **APL PCD API** - Sistema de Gestão de Inclusão Profissional para Pessoas com Deficiência.

## 🎯 Sobre a Documentação

Esta documentação foi criada para desenvolvedores, contribuidores e usuários do sistema. Aqui você encontrará tudo que precisa para:

- ✅ Instalar e configurar o sistema
- ✅ Desenvolver novas funcionalidades
- ✅ Integrar com o frontend
- ✅ Fazer deploy em produção
- ✅ Contribuir com o projeto

## 📖 Índice da Documentação

### 🚀 Começando

| Documento | Descrição | Status |
|-----------|-----------|--------|
| **[01 - Introdução](./01-INTRODUCAO.md)** | Visão geral, arquitetura e tecnologias | ✅ Completo |
| **[02 - Instalação](./02-INSTALACAO.md)** | Guia completo de instalação | ✅ Completo |
| **[03 - Configuração](./03-CONFIGURACAO.md)** | Variáveis de ambiente e configurações | ✅ Completo |

### 🏗️ Desenvolvimento

| Documento | Descrição | Status |
|-----------|-----------|--------|
| **[04 - Arquitetura](./04-ARQUITETURA.md)** | Clean Architecture e padrões | 📝 Em progresso |
| **[05 - Banco de Dados](./05-BANCO-DE-DADOS.md)** | Modelo ER completo e queries | ✅ Completo |
| **[06 - API Reference](./06-API-REFERENCE.md)** | Documentação de todos os endpoints | 📝 Em progresso |
| **[07 - Segurança](./07-SEGURANCA.md)** | Políticas e práticas de segurança | 📝 Em progresso |

### 🧪 Testes e Deploy

| Documento | Descrição | Status |
|-----------|-----------|--------|
| **[08 - Testes](./08-TESTES.md)** | Guia completo de testes | ✅ Completo |
| **[09 - Deployment](./09-DEPLOYMENT.md)** | Deploy em produção | ✅ Completo |
| **[10 - Troubleshooting](./10-TROUBLESHOOTING.md)** | Solução de problemas | 📝 Em progresso |

### 🤝 Comunidade

| Documento | Descrição | Status |
|-----------|-----------|--------|
| **[11 - Contributing](./11-CONTRIBUTING.md)** | Como contribuir | 📝 Em progresso |
| **[12 - FAQ](./12-FAQ.md)** | Perguntas frequentes | ✅ Completo |
| **[WIKI](./WIKI.md)** | Wiki central do projeto | ✅ Completo |

---

## 🎯 Guias Rápidos

### ⚡ Quick Start

```bash
# 1. Clone e instale
git clone https://github.com/cMendoncaaa/APL-WEB-PCD.git
cd APL_PCD_API
npm install

# 2. Configure
cp .env-preview .env
# Edite o .env

# 3. Inicie
npm start
```

### 🔑 Primeiro Acesso

```bash
# Criar candidato
curl -X POST http://localhost:3000/api/candidato \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "senha123",
    "cpf": "12345678909"
  }'

# Fazer login
curl -X POST http://localhost:3000/api/login/candidato \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "senha123"
  }'
```

### 🧪 Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura
npm run test:coverage

# Apenas unitários
npm run test:unit
```

---

## 📊 Visão Geral do Sistema

### Tecnologias Principais

```
┌─────────────────────────────────────────┐
│          Frontend (Separado)            │
│         React / Vue / Angular           │
└──────────────┬──────────────────────────┘
               │ HTTP/HTTPS
               ↓
┌─────────────────────────────────────────┐
│           APL PCD API                    │
│    Node.js + TypeScript + Express       │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  Autenticação JWT                  │ │
│  │  Rate Limiting                     │ │
│  │  Input Sanitization                │ │
│  └────────────────────────────────────┘ │
└──────────────┬──────────────────────────┘
               │
               ↓
┌─────────────────────────────────────────┐
│         PostgreSQL 15+                   │
│      14 Tabelas Principais              │
│      Relacionamentos Complexos          │
└─────────────────────────────────────────┘
```

### Estatísticas

```
┌───────────────────────────────────────────┐
│  📊 Métricas do Projeto                   │
├───────────────────────────────────────────┤
│  Linhas de Código        15.000+          │
│  Cobertura de Testes     99%+             │
│  Testes Implementados    110+             │
│  Endpoints de API        50+              │
│  Tabelas no Banco        14               │
│  Tempo de Resposta       < 100ms          │
└───────────────────────────────────────────┘
```

---

## 🗺️ Roadmap da Documentação

### ✅ Completo

- [x] Introdução
- [x] Instalação
- [x] Configuração
- [x] Banco de Dados
- [x] Testes
- [x] Deployment
- [x] FAQ
- [x] WIKI

### 📝 Em Progresso

- [ ] Arquitetura detalhada
- [ ] API Reference completa
- [ ] Guia de Segurança
- [ ] Troubleshooting avançado
- [ ] Guia de Contribuição

### 📅 Planejado

- [ ] Guia de Performance
- [ ] Guia de Monitoramento
- [ ] Exemplos de Integração
- [ ] Video Tutoriais
- [ ] Documentação Interativa

---

## 🎓 Tutoriais e Exemplos

### Tutorial 1: Criar seu Primeiro Candidato

Ver [WIKI.md - Tutorial 1](./WIKI.md#tutorial-1-criar-seu-primeiro-candidato)

### Tutorial 2: Sistema de Autenticação

Ver [WIKI.md - Tutorial 2](./WIKI.md#tutorial-2-autenticação-e-busca-de-vagas)

### Tutorial 3: Integração com Frontend

Veja exemplos completos em React, Vue e Angular na pasta `examples/` (em desenvolvimento).

---

## 🔍 Busca Rápida

### Por Funcionalidade

| Funcionalidade | Onde Encontrar |
|----------------|----------------|
| Instalação | [02-INSTALACAO.md](./02-INSTALACAO.md) |
| Banco de Dados | [05-BANCO-DE-DADOS.md](./05-BANCO-DE-DADOS.md) |
| Autenticação | [06-API-REFERENCE.md](./06-API-REFERENCE.md) |
| Testes | [08-TESTES.md](./08-TESTES.md) |
| Deploy Docker | [09-DEPLOYMENT.md](./09-DEPLOYMENT.md#-deploy-com-docker) |
| Erros Comuns | [12-FAQ.md](./12-FAQ.md#-troubleshooting) |

### Por Endpoint

| Endpoint | Documentação |
|----------|--------------|
| POST /api/candidato | [06-API-REFERENCE.md](./06-API-REFERENCE.md) |
| POST /api/login | [06-API-REFERENCE.md](./06-API-REFERENCE.md) |
| GET /api/vagas | [06-API-REFERENCE.md](./06-API-REFERENCE.md) |
| POST /api/vaga/:id/candidatar | [06-API-REFERENCE.md](./06-API-REFERENCE.md) |

---

## 🛠️ Ferramentas e Recursos

### Ferramentas Recomendadas

- **VS Code** - Editor de código
- **Postman** - Teste de APIs
- **pgAdmin** - Gerenciamento PostgreSQL
- **Docker Desktop** - Containerização
- **Git** - Controle de versão

### Extensões VS Code

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "eamodio.gitlens",
    "rangav.vscode-thunder-client",
    "cweijan.vscode-postgresql-client2"
  ]
}
```

### Links Úteis

- 📂 [Repositório GitHub](https://github.com/cMendoncaaa/APL-WEB-PCD)
- 📧 [Reportar Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 💼 [LinkedIn Diego Melo](https://www.linkedin.com/in/devmelo/)
- 🌐 [Site Oficial](https://aplpcd.com) (em desenvolvimento)

---

## 🤝 Contribuindo com a Documentação

Encontrou um erro ou quer melhorar a documentação?

1. Fork o repositório
2. Edite os arquivos em `docs/`
3. Faça um Pull Request
4. Descreva as mudanças

**Áreas que precisam de ajuda:**
- [ ] Exemplos de código
- [ ] Diagramas
- [ ] Tradução para inglês
- [ ] Video tutoriais
- [ ] Casos de uso reais

---

## 📞 Suporte

### Precisa de Ajuda?

1. **Documentação** - Leia primeiro a documentação completa
2. **FAQ** - Verifique as [perguntas frequentes](./12-FAQ.md)
3. **Issues** - Abra uma [issue no GitHub](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
4. **Email** - suporte@aplpcd.com

### Reportar Problemas

Use o template de issue:

```markdown
**Descrição:**
Descreva o problema claramente

**Passos para Reproduzir:**
1. Passo 1
2. Passo 2

**Comportamento Esperado:**
O que deveria acontecer

**Comportamento Atual:**
O que está acontecendo

**Ambiente:**
- OS: Windows 10
- Node.js: 18.17.0
- PostgreSQL: 15.4

**Logs:**
```
Cole os logs aqui
```
```

---

## 📊 Status da Documentação

```
┌────────────────────────────────────────┐
│  Completude: ████████░░ 80%            │
├────────────────────────────────────────┤
│  Introdução          ████████████ 100% │
│  Instalação          ████████████ 100% │
│  Configuração        ████████████ 100% │
│  Arquitetura         ████████░░░░  80% │
│  Banco de Dados      ████████████ 100% │
│  API Reference       ██████░░░░░░  60% │
│  Segurança           ██████░░░░░░  60% │
│  Testes              ████████████ 100% │
│  Deployment          ████████████ 100% │
│  Troubleshooting     ████████░░░░  80% │
│  Contributing        ██████░░░░░░  60% │
│  FAQ                 ████████████ 100% │
│  WIKI                ████████████ 100% │
└────────────────────────────────────────┘
```

---

## 🎉 Agradecimentos

Esta documentação foi criada com ❤️ por:

- **Diego Melo** - Desenvolvedor Principal
- **Comunidade APL PCD** - Contribuidores e testadores

**Contribuidores da Documentação:**
- Ver [CONTRIBUTING.md](./11-CONTRIBUTING.md) para lista completa

---

## 📄 Licença

A documentação está sob a mesma licença do projeto: **ISC License**

---

<div align="center">

**📚 Documentação APL PCD API v2.5.0**

*Mantida pela comunidade com orgulho*

[⬆ Voltar ao topo](#-documentação-apl-pcd-api)

</div>
