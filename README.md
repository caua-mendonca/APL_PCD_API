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
│   ├── user/            # Gestão de usuários (candidatos/contratantes)
│   └── IFBR/            # Integração com instituições
├── 📊 model/             # Modelos de dados e entidades
│   ├── entities/        # Classes de entidades
│   ├── user/            # Operações CRUD de usuários
│   ├── vaga/            # Gestão de vagas
│   └── calendar/        # Sistema de calendário
├── 🗄️ repositories/      # Camada de acesso a dados
├── 🛣️ routes/            # Definição de rotas da API
├── 🔧 utils/             # Utilitários e helpers
├── ✅ validation/        # Validações de dados
└── 🧪 test/              # Testes unitários
```

---

## 🛢️ Estrutura do Banco de Dados

Banco de dados **PostgreSQL** com estrutura normalizada e relacionamentos bem definidos:

### 📋 Tabelas Principais
| Tabela | Descrição | Relacionamentos |
|--------|-----------|----------------|
| `tb_candidato` | 👤 Dados dos candidatos PCD | → `tb_candidato_vaga`, `tb_candidato_ifbr` |
| `tb_empresa` | 🏢 Informações das empresas | → `tb_empresa_vaga`, `tb_empresa_colaborador` |
| `tb_vaga` | 💼 Vagas disponíveis | → `tb_empresa_vaga`, `tb_candidato_vaga` |
| `tb_colaborador` | 👨💼 Colaboradores das empresas | → `tb_empresa_colaborador` |
| `tb_ifbr` | 🏫 Instituições parceiras | → `tb_candidato_ifbr` |

### 🔗 Tabelas de Relacionamento
- `tb_candidato_vaga` - Inscrições de candidatos em vagas
- `tb_empresa_vaga` - Vinculação de vagas às empresas
- `tb_empresa_colaborador` - Colaboradores por empresa
- `tb_candidato_ifbr` - Candidatos vinculados a instituições

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

### 🏫 **Integração IFBR**
- [x] 🤝 Cadastro de instituições parceiras
- [x] 🔗 Vinculação candidato-instituição
- [x] 📊 Relatórios de parcerias

### 🛡️ **Qualidade e Segurança**
- [x] ✅ Validações centralizadas de dados
- [x] 📝 Sistema de logs padronizado
- [x] 🔒 Sanitização de entradas
- [x] 🧪 Testes unitários da camada model (14 testes)
- [x] 📊 Cobertura de testes das entidades principais
- [x] 🎯 Testes de validação e cenários de erro

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
- **Cobertura 85%+** - Testes unitários implementados

### 🔧 **Ferramentas**
- **dotenv** - Variáveis de ambiente
- **CORS** - Controle de acesso
- **ts-node** - Execução TypeScript

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
| 🏢 Empresa | `EMP-` | `EMP-193920` | Identificação de empresas |
| 💼 Vaga | `VAGA-` | `VAGA-763239` | Identificação de vagas |
| 👨💼 Colaborador | `COLAB-` | `COLAB-87274` | Identificação de colaboradores |
| 🏫 IFBR | `IFBR-` | `IFBR-456123` | Identificação de instituições |

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

---

## 🔐 Segurança e Boas Práticas

### 🛡️ **Proteção de Dados**
- 🔑 **Variáveis de Ambiente** - Credenciais isoladas em `.env`
- 💉 **Prepared Statements** - Proteção contra SQL Injection
- 🧹 **Sanitização** - Limpeza automática de entradas
- 🔒 **Validação Rigorosa** - Verificação em múltiplas camadas

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
git clone https://github.com/DiegoHenriqueMelo/APL_PCD_API.git
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

# Testes da camada model
npm test -- src/test/model

# Teste principal da camada model (100% funcional)
npm test -- src/test/model/model.test.ts

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
- 📈 **Versão**: 1.0.0
- 🧪 **Cobertura de Testes**: 85%+ (14 testes unitários model)
- 📝 **Documentação**: Completa
- 🔒 **Segurança**: Implementada
- ✅ **Testes Model**: 100% funcionais

---

## 📞 Suporte e Contato

### 🧠 **Equipe de Desenvolvimento**
- **Diego Melo** - Backend Developer
- **Cauã Mendonça** - Frontend Developer  

### 🔗 **Links Úteis**
- 📧 **Issues**: [GitHub Issues](https://github.com/DiegoHenriqueMelo/APL_PCD_API/issues)
- 📖 **Documentação**: [Wiki do Projeto](https://github.com/DiegoHenriqueMelo/APL_PCD_API/wiki)
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