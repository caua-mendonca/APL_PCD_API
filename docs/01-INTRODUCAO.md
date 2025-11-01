# 📘 Introdução ao APL PCD API

## 🎯 Visão Geral

O **APL PCD API** é uma aplicação backend robusta e escalável desenvolvida com **Node.js**, **TypeScript** e **PostgreSQL**, projetada especificamente para promover a **inclusão profissional de pessoas com deficiência (PCD)** no mercado de trabalho brasileiro.

## 🌟 Missão do Projeto

Criar uma plataforma tecnológica que:

- ✅ Facilite a **conexão entre candidatos PCD e empresas**
- ✅ Garanta **conformidade com a legislação brasileira** (Lei de Cotas)
- ✅ Promova **acessibilidade e inclusão** no processo de recrutamento
- ✅ Ofereça **segurança e privacidade** dos dados (LGPD)
- ✅ Forneça **ferramentas de gestão** para empresas e colaboradores

## 🏗️ Arquitetura de Alto Nível

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                    │
│                  (Frontend / API Clients)                    │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE SEGURANÇA                        │
│     Rate Limiting │ Helmet │ CORS │ JWT Authentication      │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APLICAÇÃO                       │
│                    (Express.js Router)                       │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ Controllers  │  Middleware  │      Validation          │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE NEGÓCIO                          │
│                   (Business Logic)                           │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │   Models     │  Entities    │      Services            │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE DADOS                            │
│                   (Data Access Layer)                        │
│  ┌──────────────┬──────────────┬──────────────────────────┐ │
│  │ Repositories │ Pool Manager │  Query Builder           │ │
│  └──────────────┴──────────────┴──────────────────────────┘ │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                   CAMADA DE PERSISTÊNCIA                     │
│                      PostgreSQL 15+                          │
│           (14 Tabelas + Relacionamentos)                     │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Funcionalidades Principais

### 1. 👥 Gestão de Candidatos PCD
- Cadastro completo com validações rigorosas
- Sistema de deficiências (motora, visual, auditiva)
- Gestão de barreiras e acessibilidade
- Perfil personalizado

### 2. 🏢 Gestão de Empresas
- Cadastro com validação de CNPJ
- Vinculação de colaboradores
- Publicação de vagas
- Sistema de calendário e eventos

### 3. 💼 Sistema de Vagas
- Criação e gestão de oportunidades
- Inscrição de candidatos
- Controle de status
- Relacionamento empresa-vaga

### 4. 📅 Calendário e Eventos
- Agendamento de entrevistas
- Eventos corporativos
- Notificações e lembretes

### 5. ♿ Acessibilidade
- Cadastro de tipos de deficiência
- Gestão de barreiras
- Recursos de acessibilidade
- Subtipos personalizados

### 6. 🛡️ Segurança Enterprise
- Autenticação JWT
- Rate Limiting
- Criptografia bcrypt
- Input sanitization
- CORS configurado
- Helmet security headers

## 📊 Estatísticas do Projeto

| Métrica | Valor |
|---------|-------|
| **Linhas de Código** | ~15.000+ |
| **Cobertura de Testes** | 99%+ |
| **Testes Implementados** | 110+ |
| **Endpoints de API** | 32 |
| **Tabelas no Banco** | 14 principais |
| **Tempo de Resposta Médio** | < 100ms |
| **Uptime Target** | 99.9% |

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js 18+** - Runtime JavaScript/TypeScript
- **TypeScript 5.0+** - Tipagem estática e type safety
- **Express.js 5.1+** - Framework web minimalista

### Banco de Dados
- **PostgreSQL 15+** - SGBD relacional robusto
- **pg** - Driver PostgreSQL para Node.js
- **Connection Pool** - Gerenciamento otimizado de conexões

### Segurança
- **bcrypt 6.0+** - Hash de senhas com salt
- **jsonwebtoken 9.0+** - Autenticação JWT stateless
- **express-rate-limit** - Proteção contra força bruta
- **helmet 8.1+** - Security headers HTTP
- **CORS** - Controle de origens permitidas

### Testes
- **Jest 29+** - Framework de testes
- **Supertest 6.3+** - Testes de API HTTP
- **ts-jest** - Suporte TypeScript no Jest

### Ferramentas
- **Winston 3.18+** - Sistema de logs estruturados
- **Redis 5.9+** - Cache e sessões (opcional)
- **dotenv 17.2+** - Gerenciamento de variáveis de ambiente

## 🎓 Para Quem é Este Sistema?

### 🧑‍💼 Gestores de RH
- Gerenciar processos seletivos inclusivos
- Cumprir legislação de cotas PCD
- Monitorar candidaturas e vagas

### 👨‍💻 Desenvolvedores
- API RESTful bem documentada
- Código limpo e manutenível
- Arquitetura escalável

### 🏢 Empresas
- Publicar vagas acessíveis
- Gerenciar colaboradores
- Organizar calendário de eventos

### 👥 Candidatos PCD
- Cadastro simplificado
- Busca de oportunidades
- Acompanhamento de candidaturas

## 📖 Estrutura da Documentação

Esta documentação está organizada em módulos para facilitar a navegação:

1. **[Introdução](./01-INTRODUCAO.md)** - Visão geral do sistema (você está aqui)
2. **[Instalação](./02-INSTALACAO.md)** - Guia completo de instalação
3. **[Configuração](./03-CONFIGURACAO.md)** - Configuração do ambiente
4. **[Arquitetura](./04-ARQUITETURA.md)** - Detalhes da arquitetura
5. **[Banco de Dados](./05-BANCO-DE-DADOS.md)** - Modelo e estrutura do BD
6. **[API Reference](./06-API-REFERENCE.md)** - Documentação de endpoints
7. **[Segurança](./07-SEGURANCA.md)** - Políticas e práticas de segurança
8. **[Testes](./08-TESTES.md)** - Guia de testes
9. **[Deployment](./09-DEPLOYMENT.md)** - Deploy e produção
10. **[Troubleshooting](./10-TROUBLESHOOTING.md)** - Solução de problemas
11. **[Contributing](./11-CONTRIBUTING.md)** - Como contribuir
12. **[FAQ](./12-FAQ.md)** - Perguntas frequentes

## 🔗 Links Úteis

- 📂 **Repositório**: [GitHub](https://github.com/cMendoncaaa/APL-WEB-PCD)
- 📧 **Issues**: [GitHub Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 💼 **LinkedIn Diego**: [Dev Melo](https://www.linkedin.com/in/devmelo/)
- 🐙 **GitHub Diego**: [DiegoHenriqueMelo](https://github.com/DiegoHenriqueMelo)

## ⚖️ Conformidade Legal

O sistema foi desenvolvido em conformidade com:

- 🇧🇷 **Lei de Cotas (Lei 8.213/91)** - Contratação de PCD
- 🔒 **LGPD (Lei 13.709/2018)** - Proteção de dados pessoais
- ♿ **LBI (Lei 13.146/2015)** - Estatuto da Pessoa com Deficiência
- 🌐 **WCAG 2.1** - Diretrizes de acessibilidade web

## 🎯 Próximos Passos

Para começar a usar o sistema:

1. ✅ Leia a [documentação de instalação](./02-INSTALACAO.md)
2. ✅ Configure seu [ambiente de desenvolvimento](./03-CONFIGURACAO.md)
3. ✅ Explore a [referência da API](./06-API-REFERENCE.md)
4. ✅ Execute os [testes](./08-TESTES.md)

---

<div align="center">

**Desenvolvido com ❤️ para promover a inclusão profissional**

</div>
