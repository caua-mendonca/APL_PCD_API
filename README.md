# 🧠 APL PCD API - Sistema de Gestão de Inclusão Profissional

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Jest](https://img.shields.io/badge/Jest-29+-red.svg)](https://jestjs.io/)

Bem-vindo ao repositório da **APL PCD API**, uma aplicação robusta construída com **Node.js + TypeScript + PostgreSQL** que tem como missão promover a inclusão profissional de pessoas com deficiência no mercado de trabalho. A API realiza a intermediação entre **candidatos, empresas, vagas e colaboradores**, oferecendo um controle padronizado, validado e seguro.

---

## 📊 Objetivo do Projeto

O projeto visa a criação de uma **plataforma back-end** completa para:

- 👥 **Gestão de candidatos PCD** com validações rigorosas
- 🏢 **Criação e vinculação de vagas** com empresas
- 👨💼 **Cadastro de colaboradores** responsáveis
- 🔗 **Controle de relacionamentos** entre entidades (empresa ↔ vaga, candidato ↔ vaga)
- ⚖️ **Aderência total às normas legais** de contratação PCD
- 🚫 **Sem funcionalidades** relacionadas a triagens psicológicas

---

## 🧱 Arquitetura do Sistema

Arquitetura baseada em **padrões MVC desacoplados** com foco em escalabilidade e manutenibilidade:

```
src/
├── 🔧 config/           # Configurações do banco e ambiente
├── 🎮 controller/        # Controladores da aplicação
│   └── user/            # Gestão de usuários (candidatos/contratantes)
├── 🛡️ middleware/        # Middlewares da aplicação
├── 📊 model/             # Modelos de dados e entidades
│   ├── calendar/        # Sistema de calendário
│   ├── entities/        # Classes de entidades
│   │   └── class/       # Classes de domínio
│   ├── event/           # Gestão de eventos
│   ├── user/            # Operações CRUD de usuários
│   └── vaga/            # Gestão de vagas
├── 🗄️ repositories/      # Camada de acesso a dados
├── 🛣️ routes/            # Definição de rotas da API
├── 🧪 test/              # Testes unitários (em desenvolvimento)
├── 🔧 utils/             # Utilitários e helpers
└── ✅ validation/        # Validações de dados
```

---

## 🛢️ Estrutura do Banco de Dados

Banco de dados **PostgreSQL** com estrutura normalizada e relacionamentos bem definidos:

### 📋 Tabelas Principais
| Tabela | Descrição | Relacionamentos |
|--------|-----------|----------------|
| `tb_candidato` | 👤 Dados dos candidatos PCD | → `tb_candidato_vaga` |
| `tb_vaga` | 💼 Vagas disponíveis | → `tb_empresa_vaga`, `tb_candidato_vaga` |
| `tb_colaborador` | 👨💼 Colaboradores das empresas | → `tb_empresa_colaborador` |
| `tb_tipo_deficiencia` | 🦽 Tipos de deficiências | → `tb_sub_tipo_deficiencia` |
| `tb_sub_tipo_deficiencia` | 📋 Subtipos de deficiências | → `tb_tipo_deficiencia` |
| `tb_acessibilidade` | ♿ Recursos de acessibilidade | → `tb_barreira_acessibilidade` |
| `tb_barreira` | 🚧 Barreiras identificadas | → `tb_sub_tipo_barreira`, `tb_barreira_acessibilidade` |
| `tb_sub_tipo_barreira` | 🚧 Subtipos de barreiras | → `tb_barreira` |
| `tb_calendario` | 📅 Sistema de calendário | → `tb_evento` |
| `tb_evento` | 📅 Eventos do sistema | → `tb_calendario` |

### 🔗 Tabelas de Relacionamento
- `tb_candidato_vaga` - Inscrições de candidatos em vagas
- `tb_empresa_vaga` - Vinculação de vagas às empresas
- `tb_empresa_colaborador` - Colaboradores por empresa
- `tb_barreira_acessibilidade` - Relacionamento entre barreiras e acessibilidade

### 📋 Lista Completa de Tabelas
- `tb_acessibilidade`
- `tb_barreira`
- `tb_barreira_acessibilidade`
- `tb_calendario`
- `tb_candidato`
- `tb_candidato_vaga`
- `tb_colaborador`
- `tb_empresa_colaborador`
- `tb_empresa_vaga`
- `tb_evento`
- `tb_sub_tipo_barreira`
- `tb_sub_tipo_deficiencia`
- `tb_tipo_deficiencia`
- `tb_vaga`

---

## ✅ Funcionalidades Implementadas

### 👥 **Gestão de Candidatos**
- [x] 📝 Cadastro completo com validação de CPF
- [x] 🎂 Validação de idade mínima
- [x] 🔍 Busca e listagem de candidatos
- [x] ✏️ Atualização de dados pessoais
- [x] 🗑️ Exclusão de registros

### 🏢 **Gestão de Empresas**
- [x] 🏭 Cadastro de empresas contratantes
- [x] 👨💼 Vinculação de colaboradores
- [x] 📊 Controle de vagas por empresa
- [x] 🔗 Relacionamentos empresa-colaborador

### 💼 **Sistema de Vagas**
- [x] 📋 Criação e publicação de vagas
- [x] 🎯 Inscrição de candidatos
- [x] 📈 Controle de status das vagas
- [x] 🔄 Gestão do ciclo de vida das oportunidades

### ♿ **Gestão de Deficiências**
- [x] 🦽 Cadastro de tipos de deficiências
- [x] 📋 Gestão de subtipos de deficiências
- [x] ♿ Sistema de acessibilidade
- [x] 🚧 Identificação de barreiras
- [x] 🚧 Gestão de subtipos de barreiras
- [x] 📅 Sistema de calendário e eventos

### 🛡️ **Qualidade e Segurança**
- [x] ✅ Validações centralizadas de dados
- [x] 📝 Sistema de logs padronizado
- [x] 🔒 Sanitização de entradas
- [x] 🔐 Criptografia de senhas com bcrypt
- [x] 🎫 Autenticação JWT (JSON Web Token)
- [ ] 🧪 Testes unitários da camada model (em desenvolvimento)
- [ ] 📊 Cobertura de testes das entidades principais
- [ ] 🎯 Testes de validação e cenários de erro

---

## 🛠️ Stack Tecnológico

### 🚀 **Backend**
- **Node.js 18+** - Runtime JavaScript
- **TypeScript 5.0+** - Tipagem estática
- **Express.js** - Framework web

### 🗄️ **Banco de Dados**
- **PostgreSQL 15+** - Banco relacional
- **Prepared Statements** - Segurança SQL

### 🧪 **Testes e Qualidade**
- **Jest 29+** - Framework de testes
- **Supertest** - Testes de API
- **TypeScript** - Verificação de tipos
- **Cobertura 0%** - Testes em desenvolvimento

### 🔧 **Ferramentas**
- **dotenv** - Variáveis de ambiente
- **CORS** - Controle de acesso
- **ts-node** - Execução TypeScript
- **bcrypt** - Criptografia de senhas
- **jsonwebtoken** - Autenticação JWT

### 🏗️ **Arquitetura**
- **MVC Pattern** - Separação de responsabilidades
- **Repository Pattern** - Abstração de dados
- **Dependency Injection** - Inversão de controle

---

## 🆔 Sistema de Identificação

Todos os registros utilizam **IDs únicos** com prefixos semânticos:

| Entidade | Prefixo | Exemplo | Descrição |
|----------|---------|---------|----------|
| 👤 Candidato | `CAND-` | `CAND-563829` | Identificação de candidatos PCD |
| 💼 Vaga | `VAGA-` | `VAGA-763239` | Identificação de vagas |
| 👨💼 Colaborador | `COLAB-` | `COLAB-87274` | Identificação de colaboradores |
| 🦾 Deficiencia Motora | `DMOTO-` | `DMOTO-901234` | Identificação de deficiencia motora|
| 👁️ Deficiencia Visual | `DVISU-` | `DVISU-963334` | Identificação de deficiencia visual |
| 🦻 Deficiencia Auditiva | `DAUDI-` | `DAUDI-32514` | Identificação de deficiencia auditiva |
| 📋 Subtipo Deficiência | `SUBT-` | `SUBT-901234` | Identificação de subtipos de deficiências |
| ♿ Acessibilidade | `ACES-` | `ACES-567890` | Identificação de recursos de acessibilidade |
| 🚧 Barreira | `BARR-` | `BARR-234567` | Identificação de barreiras |
| 📅 Calendário | `CALENDAR-` | `CALENDAR-456789` | Identificação de calendários |
| 📅 Evento | `EVEVENTT-` | `EVENT-567890` | Identificação de eventos |

### 🔒 **Características dos IDs**
- ✅ **Únicos** - Garantia de unicidade no sistema
- 🏷️ **Semânticos** - Prefixo identifica o tipo de entidade
- 🔢 **Numéricos** - Sufixo aleatório de 6 dígitos
- 🛡️ **Validados** - Verificação automática de formato

---

## 🧪 Sistema de Validações

### 📋 **Validações de Dados Pessoais**
- 🆔 **CPF** - Algoritmo oficial com dígitos verificadores
- 📧 **E-mail** - Formato e domínio válidos
- 🎂 **Idade** - Validação de idade mínima (16 anos)
- 📱 **Telefone** - Formato brasileiro padronizado

### 🏢 **Validações Empresariais**
- 🏭 **CNPJ** - Algoritmo oficial de validação
- 📅 **Datas** - Formato e consistência temporal
- 💼 **Vagas** - Status e dados obrigatórios

### 🔧 **Validações Técnicas**
- 🆔 **IDs Customizados** - Formato por entidade
- 📝 **Campos Obrigatórios** - Verificação de presença
- 🛡️ **Sanitização** - Limpeza de dados de entrada
- 📊 **Logs** - Registro de erros e validações
- 🔐 **Senhas Seguras** - Hash bcrypt com salt
- 🎫 **Tokens JWT** - Autenticação stateless

---

## 🔐 Segurança e Boas Práticas

### 🛡️ **Proteção de Dados**
- 🔑 **Variáveis de Ambiente** - Credenciais isoladas em `.env`
- 💉 **Prepared Statements** - Proteção contra SQL Injection
- 🧹 **Sanitização** - Limpeza automática de entradas
- 🔒 **Validação Rigorosa** - Verificação em múltiplas camadas
- 🔐 **Criptografia bcrypt** - Hash seguro de senhas
- 🎫 **JWT Authentication** - Tokens seguros para autenticação

### 📊 **Monitoramento**
- 📝 **Logs Estruturados** - Rastreamento de operações
- ⚠️ **Tratamento de Erros** - Captura e registro de falhas
- 🔍 **Auditoria** - Histórico de alterações

### ⚖️ **Conformidade Legal**
- 📋 **LGPD** - Proteção de dados pessoais
- 🏢 **Lei de Cotas PCD** - Aderência às normas trabalhistas
- 🚫 **Não Discriminação** - Foco apenas em requisitos legais

---

## 🚀 Instalação e Execução

### 📋 **Pré-requisitos**
- Node.js 18+ instalado
- PostgreSQL 15+ configurado
- Git para clonagem

### ⚡ **Instalação Rápida**
```bash
# 1. Clone o repositório
git clone https://github.com/cMendoncaaa/APL-WEB-PCD.git
cd APL_PCD_API

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env-preview .env
# Edite o .env com suas configurações

# 4. Execute o servidor
npm run start
```

### 🔧 **Configuração do .env**
```bash
# Configurações do Banco PostgreSQL
DB_USER=seu_usuario
DB_HOST=localhost
DB_DATABASE=apl_pcd_db
DB_PASSWORD=sua_senha
DB_PORT=5432
```

### 🧪 **Executar Testes**
```bash
# Todos os testes
npm test

# Testes com cobertura
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### 🏗️ **Build para Produção**
```bash
# Compilar TypeScript
npm run build

# Executar versão compilada
node build/index.js
```

---

## 🤝 Como Contribuir

### 📋 **Processo de Contribuição**
1. 🍴 **Fork** o projeto
2. 🌿 **Crie uma branch** para sua feature
   ```bash
   git checkout -b feat/minha-funcionalidade
   ```
3. ✅ **Execute os testes** antes de commitar
   ```bash
   npm test
   ```
4. 📝 **Commit** seguindo o padrão Conventional Commits
   ```bash
   git commit -m "feat: adiciona validação de CNPJ"
   ```
5. 🚀 **Push** para sua branch
   ```bash
   git push origin feat/minha-funcionalidade
   ```
6. 🎯 **Abra um Pull Request** detalhado

### 📝 **Padrões de Commit**
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `test:` Testes
- `refactor:` Refatoração
- `style:` Formatação

### 🧪 **Requisitos para PR**
- ✅ Testes passando
- 📝 Documentação atualizada
- 🔍 Code review aprovado
- 📋 Descrição clara das mudanças

---

## 📊 Status do Projeto

- 🚀 **Status**: Em desenvolvimento ativo
- 📈 **Versão**: 2.1.0
- 🧪 **Cobertura de Testes**: 0% (testes em desenvolvimento)
- 📝 **Documentação**: Completa
- 🔒 **Segurança**: Implementada
- ⏳ **Testes**: Em desenvolvimento

---

## 📞 Suporte e Contato

### 🧠 **Equipe de Desenvolvimento**
- **Diego Melo** - Backend Developer
- **Cauã Mendonça** - Frontend Developer

### 🔗 **Links Úteis**
- 📧 **Issues**: [GitHub Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/cMendoncaaa/APL-WEB-PCD/wiki)
- 💼 **LinkedIn**: [Dev Melo](https://www.linkedin.com/in/devmelo/)
- 🐙 **GitHub**: [DiegoHenriqueMelo](https://github.com/DiegoHenriqueMelo)

---

## 📄 Licença

Este projeto está sob a licença **ISC**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

<div align="center">

**🌟 Se este projeto te ajudou, considere dar uma estrela! ⭐**

*Desenvolvido com ❤️ para promover a inclusão profissional de pessoas com deficiência*

</div>