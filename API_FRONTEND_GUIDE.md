# 🚀 APL PCD API - Guia Completo para Desenvolvedores Front-end

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)](https://www.postgresql.org/)
[![Tests](https://img.shields.io/badge/Tests-110+-brightgreen.svg)](#)
[![Coverage](https://img.shields.io/badge/Coverage-99%25+-brightgreen.svg)](#)
[![Security](https://img.shields.io/badge/Security-Enterprise-blue.svg)](#)

## 📋 Índice

- [🔧 Configuração Inicial](#-configuração-inicial)
- [🔐 Autenticação](#-autenticação)
- [👤 Rotas de Candidatos](#-rotas-de-candidatos)
- [🏢 Rotas de Contratantes](#-rotas-de-contratantes)
- [👨‍💼 Rotas de Colaboradores](#-rotas-de-colaboradores)
- [💼 Rotas de Vagas](#-rotas-de-vagas)
- [📅 Rotas de Eventos](#-rotas-de-eventos)
- [📆 Rotas de Calendário](#-rotas-de-calendário)
- [👨‍💼 Rotas de Administrador](#-rotas-de-administrador)
- [🔑 Rota de Alteração de Senha](#-rota-de-alteração-de-senha)
- [⚠️ Códigos de Status](#️-códigos-de-status)
- [🔍 Exemplos de Uso](#-exemplos-de-uso)

---

## 🔧 Configuração Inicial

### Base URL
```
http://localhost:3000
```

### Headers Obrigatórios
```javascript
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <token>", // Para rotas protegidas
  "X-Requested-With": "XMLHttpRequest" // Recomendado para segurança
}
```

### 🔒 Segurança e Rate Limiting
- **Rate Limit Geral**: 100 requisições por 15 minutos por IP
- **Rate Limit Login**: 5 tentativas por 15 minutos por IP
- **CORS**: Configurado para `https://localhost:3333`
- **Security Headers**: Helmet ativado
- **Input Sanitization**: Automática em todas as rotas
- **SQL Injection Protection**: Prepared statements + validação
- **XSS Protection**: Input sanitization completa
- **110+ Testes de Segurança**: Cobertura completa

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação. Existem dois tipos de tokens:

### 🎯 Tipos de Token
- **Candidato**: Para operações relacionadas a candidatos
- **Empresa**: Para operações relacionadas a empresas/contratantes

### 🔑 Como Obter Tokens

#### Login de Candidato
```http
POST /login/candidato
```

**Body**:
```json
{
  "email": "candidato@email.com",
  "senha": "senha123"
}
```

**Resposta**:
```json
{
  "message": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "CAND-123456",
      "name": "João Silva",
      "email": "candidato@email.com"
    }
  }
}
```

#### Login de Empresa
```http
POST /login/empresa
```

**Body**:
```json
{
  "email": "empresa@email.com",
  "senha": "senha123"
}
```

**Resposta**:
```json
{
  "message": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "EMP-123456",
      "nome_fantasia": "Tech Solutions",
      "email": "empresa@email.com"
    }
  }
}
```

#### Login de Administrador
```http
POST /login/administrador
```

**Body**:
```json
{
  "email": "admin@email.com",
  "senha": "senha123"
}
```

**Resposta**:
```json
{
  "message": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "ADM-123456",
      "email": "admin@email.com"
    }
  }
}
```

---

## 👤 Rotas de Candidatos

### 📝 Criar Candidato
```http
POST /create/canditado
```

**Autenticação**: ❌ Não requerida

**Body**:
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "confirme_email": "joao@email.com",
  "senha": "senha123",
  "confirme_senha": "senha123",
  "telefone": "(11) 99999-9999",
  "cpf": "123.456.789-00",
  "data_nascimento": "1990-05-15",
  "def_motora": true,
  "def_auditiva": false,
  "def_visual": false,
  "sub_tipo": "SUBT-123456",
  "barreira": "BARR-123456",
  "acessbilidade": "ACES-123456"
}
```

**Validações**:
- ✅ CPF válido
- ✅ Email válido
- ✅ Idade mínima (16 anos)
- ✅ Telefone formato brasileiro
- ✅ Senhas devem coincidir
- ✅ Emails devem coincidir

**Resposta de Sucesso** (201):
```json
{
  "message": "Candidato criado com sucesso"
}
```

**Resposta de Erro** (400):
```json
{
  "message": "Erro de validação específico"
}
```

---

### 📋 Listar Todos os Candidatos
```http
GET /get/canditado
```

**Autenticação**: ✅ Token de Candidato

**Headers**:
```javascript
{
  "Authorization": "Bearer <token_candidato>"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": [
    {
      "id": "CAND-123456",
      "name": "João Silva",
      "email": "joao@email.com",
      "telefone": "(11) 99999-9999",
      "cpf": "123.456.789-00",
      "data_nascimento": "1990-05-15T00:00:00.000Z",
      "def_motora": true,
      "def_auditiva": false,
      "def_visual": false,
      "status": true
    }
  ]
}
```

---

### 🔍 Buscar Candidato por ID
```http
GET /get/canditado/byName/:id
```

**Autenticação**: ✅ Token de Candidato

**Parâmetros**:
- `id` (string): ID do candidato (ex: "CAND-123456")

**Exemplo**:
```http
GET /get/canditado/byName/CAND-123456
```

**Resposta de Sucesso** (200):
```json
{
  "message": {
    "id": "CAND-123456",
    "name": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "cpf": "123.456.789-00",
    "data_nascimento": "1990-05-15T00:00:00.000Z",
    "def_motora": true,
    "def_auditiva": false,
    "def_visual": false,
    "status": true
  }
}
```

**Resposta de Erro** (404):
```json
{
  "message": "Candidato não encontrado"
}
```

---

### ✏️ Atualizar Candidato
```http
PUT /update/canditado/:id
```

**Autenticação**: ✅ Token de Candidato

**Parâmetros**:
- `id` (string): ID do candidato

**Body** (campos opcionais):
```json
{
  "name": "João Silva Santos",
  "email": "joao.novo@email.com",
  "telefone": "(11) 88888-8888",
  "def_motora": false,
  "def_visual": true
}
```

**Resposta de Sucesso** (200):
```json
{
  "status": "sucesso",
  "result": "Candidato atualizado com sucesso"
}
```

---

### 🗑️ Deletar Candidato
```http
DELETE /delete/canditado/:id
```

**Autenticação**: ✅ Token de Candidato

**Parâmetros**:
- `id` (string): ID do candidato

**Resposta de Sucesso** (200):
```json
{
  "message": "Candidato deletado com sucesso"
}
```

---

### 🎯 Candidatar-se a Vaga
```http
POST /register/vaga/:id
```

**Autenticação**: ✅ Token de Candidato

**Parâmetros**:
- `id` (string): ID do candidato

**Body**:
```json
{
  "id_vaga": "VAGA-123456"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Candidatura realizada com sucesso"
}
```

---

## 🏢 Rotas de Contratantes

### 🏭 Criar Contratante
```http
POST /create/contratante
```

**Autenticação**: ❌ Não requerida

**Body**:
```json
{
  "nome_fantasia": "Tech Solutions",
  "razao_social": "Tech Solutions LTDA",
  "email": "contato@techsolutions.com",
  "confirme_email": "contato@techsolutions.com",
  "senha": "senha123",
  "confirme_senha": "senha123",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 3333-4444",
  "acessibilidade": "ACES-123456"
}
```

**Validações**:
- ✅ CNPJ válido
- ✅ Email válido
- ✅ Senhas devem coincidir
- ✅ Emails devem coincidir

**Resposta de Sucesso** (200):
```json
{
  "message": "Contratante criado com sucesso"
}
```

---

### 📋 Listar Contratantes
```http
GET /get/contratante
```

**Autenticação**: ✅ Token de Empresa

**Resposta de Sucesso** (200):
```json
{
  "message": [
    {
      "id": "EMP-123456",
      "nome_fantasia": "Tech Solutions",
      "razao_social": "Tech Solutions LTDA",
      "email": "contato@techsolutions.com",
      "cnpj": "12.345.678/0001-90",
      "telefone": "(11) 3333-4444",
      "status": true
    }
  ]
}
```

---

### 🔍 Buscar Contratante por ID
```http
GET /get/contratante/byId/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID do contratante (ex: "EMP-123456")

**Resposta de Sucesso** (200):
```json
{
  "id": "EMP-123456",
  "nome_fantasia": "Tech Solutions",
  "razao_social": "Tech Solutions LTDA",
  "email": "contato@techsolutions.com",
  "cnpj": "12.345.678/0001-90",
  "telefone": "(11) 3333-4444",
  "status": true
}
```

---

### ✏️ Atualizar Contratante
```http
PUT /update/contratante/:id
```

**Autenticação**: ✅ Token de Empresa

**Body** (campos opcionais):
```json
{
  "nome_fantasia": "Tech Solutions Pro",
  "telefone": "(11) 2222-3333",
  "acessibilidade": "ACES-654321"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Contratante atualizado com sucesso"
}
```

---

### 🗑️ Deletar Contratante
```http
DELETE /delete/contratante/:id
```

**Autenticação**: ✅ Token de Empresa

**Resposta de Sucesso** (200):
```json
{
  "message": "Contratante deletado com sucesso"
}
```

---

## 👨‍💼 Rotas de Colaboradores

### 👤 Criar Colaborador
```http
POST /create/colaborador/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da empresa

**Body**:
```json
{
  "name": "Maria Santos",
  "email": "maria@techsolutions.com",
  "senha": "senha123",
  "setor": "Recursos Humanos"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Colaborador criado com sucesso"
}
```

---

### 📋 Listar Colaboradores da Empresa
```http
GET /get/colaborador/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da empresa

**Resposta de Sucesso** (200):
```json
[
  {
    "id": "COLAB-123456",
    "name": "Maria Santos",
    "email": "maria@techsolutions.com",
    "setor": "Recursos Humanos",
    "id_empresa": "EMP-123456"
  }
]
```

---

## 💼 Rotas de Vagas

### 📝 Criar Vaga
```http
POST /create/vaga/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da empresa

**Body**:
```json
{
  "data_fim": "2024-12-31",
  "titulo": "Desenvolvedor Full Stack",
  "descricao": "Vaga para desenvolvedor com experiência em Node.js e React",
  "salario": 5000.00,
  "localidade": "São Paulo, SP",
  "acessibilidade": "ACES-123456"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Vaga criada com sucesso"
}
```

---

### 📋 Listar Todas as Vagas
```http
GET /get/vagas
```

**Autenticação**: ✅ Token de Empresa

**Resposta de Sucesso** (200):
```json
[
  {
    "id": "VAGA-123456",
    "data_inicio": "2024-01-15T00:00:00.000Z",
    "data_fim": "2024-12-31T00:00:00.000Z",
    "status": true,
    "titulo": "Desenvolvedor Full Stack",
    "descricao": "Vaga para desenvolvedor com experiência em Node.js e React",
    "salario": 5000.00,
    "localidade": "São Paulo, SP",
    "acessibilidade": "ACES-123456"
  }
]
```

---

### 🔍 Buscar Vaga por ID
```http
GET /get/vagas/byId/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da vaga

**Resposta de Sucesso** (200):
```json
{
  "id": "VAGA-123456",
  "data_inicio": "2024-01-15T00:00:00.000Z",
  "data_fim": "2024-12-31T00:00:00.000Z",
  "status": true,
  "titulo": "Desenvolvedor Full Stack",
  "descricao": "Vaga para desenvolvedor com experiência em Node.js e React",
  "salario": 5000.00,
  "localidade": "São Paulo, SP",
  "acessibilidade": "ACES-123456"
}
```

---

### ✏️ Atualizar Vaga
```http
PUT /update/vaga/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da vaga

**Body** (campos opcionais):
```json
{
  "titulo": "Desenvolvedor Full Stack Sênior",
  "salario": 7000.00,
  "descricao": "Vaga atualizada com novos requisitos"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Vaga atualizada com sucesso"
}
```

---

### 🗑️ Deletar Vaga
```http
DELETE /delete/vaga/:id
```

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da vaga

**Resposta de Sucesso** (200):
```json
{
  "message": "Vaga deletada com sucesso"
}
```

---

### 📋 Listar Vagas do Candidato
```http
GET /get/vagas/byCandidato/:id
```

**Autenticação**: ✅ Token de Candidato

**Parâmetros**:
- `id` (string): ID do candidato

**Resposta de Sucesso** (200):
```json
[
  {
    "id": "VAGA-123456",
    "titulo": "Desenvolvedor Full Stack",
    "descricao": "Vaga para desenvolvedor com experiência em Node.js e React",
    "salario": 5000.00,
    "localidade": "São Paulo, SP",
    "status_inscricao": "inscrito"
  }
]
```

---

## 📅 Rotas de Eventos

⚠️ **ATENÇÃO**: As rotas de eventos estão temporariamente **indisponíveis** (Status 503 - Service Unavailable).

### 📝 Criar Evento
```http
POST /create/evento/:id
```

**Status**: 🔴 Indisponível

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID do calendário

**Body**:
```json
{
  "titulo": "Entrevista - João Silva",
  "descricao": "Entrevista para vaga de desenvolvedor",
  "data": "2024-02-15",
  "hora_inicio": "14:00",
  "hora_fim": "15:00",
  "id_candidato": "CAND-123456"
}
```

**Resposta Atual** (503):
```json
{
  "message": "Serviço indisponível"
}
```

---

### 📋 Listar Eventos
```http
GET /get/evento/:id
```

**Status**: 🔴 Indisponível

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID do calendário

**Resposta Atual** (503):
```json
{
  "message": "Serviço indisponível"
}
```

---

### 🗑️ Deletar Evento
```http
DELETE /delete/evento/:id
```

**Status**: 🔴 Indisponível

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID do evento

**Resposta Atual** (503):
```json
{
  "message": "Serviço indisponível"
}
```

---

## 📆 Rotas de Calendário

⚠️ **ATENÇÃO**: As rotas de calendário estão temporariamente **indisponíveis** (Status 503 - Service Unavailable).

### 📝 Criar Calendário
```http
POST /create/calendario/:id
```

**Status**: 🔴 Indisponível

**Autenticação**: ✅ Token de Empresa

**Parâmetros**:
- `id` (string): ID da empresa

**Resposta Atual** (503):
```json
{
  "message": "Serviço indisponível"
}
```

---

### 📋 Buscar Calendário
```http
GET /get/calendario/:id
```

**Status**: 🔴 Indisponível

**Autenticação**: ❌ Não requerida

**Parâmetros**:
- `id` (string): ID da empresa

**Resposta Atual** (503):
```json
{
  "message": "Serviço indisponível"
}
```

---

## 👨‍💼 Rotas de Administrador

### 🚧 Criar Barreira
```http
POST /adm/create/barreira
```

**Autenticação**: ✅ Token de Administrador

**Body**:
```json
{
  "descricao": "Barreira de acesso físico"
}
```

**Resposta de Sucesso** (201):
```json
{
  "message": "Barreira criada com sucesso"
}
```

---

### ♿ Criar Acessibilidade
```http
POST /adm/create/acessibilidade
```

**Autenticação**: ✅ Token de Administrador

**Body**:
```json
{
  "descricao": "Rampa de acesso"
}
```

**Resposta de Sucesso** (201):
```json
{
  "message": "Acessibilidade criada com sucesso"
}
```

---

### 📑 Criar Subtipo
```http
POST /adm/create/subtipo
```

**Autenticação**: ✅ Token de Administrador

**Body**:
```json
{
  "descricao": "Deficiência visual parcial"
}
```

**Resposta de Sucesso** (201):
```json
{
  "message": "Subtipo criado com sucesso"
}
```

---

## 🔑 Rota de Alteração de Senha

### 🔐 Mudar Senha
```http
POST /mudarSenha/:id
```

**Autenticação**: ❌ Não requerida

**Parâmetros**:
- `id` (string): ID do usuário (candidato, empresa ou admin)

**Body**:
```json
{
  "senha_antiga": "senha123",
  "senha_nova": "novaSenha123",
  "confirme_senha_nova": "novaSenha123"
}
```

**Resposta de Sucesso** (200):
```json
{
  "message": "Senha alterada com sucesso"
}
```

**Resposta de Erro** (400):
```json
{
  "message": "Senha antiga incorreta"
}
```

---

## ⚠️ Códigos de Status

### ✅ Sucesso
- **200**: OK - Operação realizada com sucesso
- **201**: Created - Recurso criado com sucesso

### ❌ Erro do Cliente
- **400**: Bad Request - Dados inválidos ou erro de validação
- **401**: Unauthorized - Token não fornecido
- **403**: Forbidden - Token inválido
- **404**: Not Found - Recurso não encontrado
- **429**: Too Many Requests - Rate limit excedido

### 💥 Erro do Servidor
- **500**: Internal Server Error - Erro interno do servidor

---

## 🔍 Exemplos de Uso

### 🚀 JavaScript/Fetch

#### Criar Candidato
```javascript
const criarCandidato = async () => {
  try {
    const response = await fetch('http://localhost:3000/create/canditado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: "João Silva",
        email: "joao@email.com",
        confirme_email: "joao@email.com",
        senha: "senha123",
        confirme_senha: "senha123",
        telefone: "(11) 99999-9999",
        cpf: "123.456.789-00",
        data_nascimento: "1990-05-15",
        def_motora: true,
        def_auditiva: false,
        def_visual: false,
        sub_tipo: "SUBT-123456",
        barreira: "BARR-123456",
        acessbilidade: "ACES-123456"
      })
    });

    const data = await response.json();
    console.log('Candidato criado:', data);
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

#### Buscar Candidatos (com autenticação)
```javascript
const buscarCandidatos = async (token) => {
  try {
    const response = await fetch('http://localhost:3000/get/canditado', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();
    console.log('Candidatos:', data.message);
  } catch (error) {
    console.error('Erro:', error);
  }
};
```

### ⚛️ React/Axios

#### Hook personalizado para API
```javascript
import axios from 'axios';

const useAPI = () => {
  const baseURL = 'http://localhost:3000';
  
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Interceptor para adicionar token
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return {
    // Candidatos
    criarCandidato: (data) => api.post('/create/canditado', data),
    buscarCandidatos: () => api.get('/get/canditado'),
    buscarCandidatoPorId: (id) => api.get(`/get/canditado/byName/${id}`),
    atualizarCandidato: (id, data) => api.put(`/update/canditado/${id}`, data),
    deletarCandidato: (id) => api.delete(`/delete/canditado/${id}`),
    
    // Contratantes
    criarContratante: (data) => api.post('/create/contratante', data),
    buscarContratantes: () => api.get('/get/contratante'),
    buscarContratantePorId: (id) => api.get(`/get/contratante/byId/${id}`),
    atualizarContratante: (id, data) => api.put(`/update/contratante/${id}`, data),
    deletarContratante: (id) => api.delete(`/delete/contratante/${id}`),
    
    // Colaboradores
    criarColaborador: (empresaId, data) => api.post(`/create/colaborador/${empresaId}`, data),
    buscarColaboradores: (empresaId) => api.get(`/get/colaborador/${empresaId}`),
    
    // Autenticação
    loginCandidato: (data) => api.post('/login/candidato', data),
    loginEmpresa: (data) => api.post('/login/empresa', data),
    loginAdmin: (data) => api.post('/login/administrador', data),
    
    // Vagas
    criarVaga: (empresaId, data) => api.post(`/create/vaga/${empresaId}`, data),
    buscarVagas: () => api.get('/get/vagas'),
    buscarVagaPorId: (id) => api.get(`/get/vagas/byId/${id}`),
    buscarVagasPorCandidato: (candidatoId) => api.get(`/get/vagas/byCandidato/${candidatoId}`),
    atualizarVaga: (vagaId, data) => api.put(`/update/vaga/${vagaId}`, data),
    deletarVaga: (vagaId) => api.delete(`/delete/vaga/${vagaId}`),
    candidatarVaga: (candidatoId, data) => api.post(`/register/vaga/${candidatoId}`, data),
    
    // Administrador
    criarBarreira: (data) => api.post('/adm/create/barreira', data),
    criarAcessibilidade: (data) => api.post('/adm/create/acessibilidade', data),
    criarSubtipo: (data) => api.post('/adm/create/subtipo', data),
    
    // Senha
    mudarSenha: (userId, data) => api.post(`/mudarSenha/${userId}`, data),
    
    // Eventos (Indisponíveis)
    // criarEvento: (calendarioId, data) => api.post(`/create/evento/${calendarioId}`, data),
    // buscarEventos: (calendarioId) => api.get(`/get/evento/${calendarioId}`),
    // deletarEvento: (eventoId) => api.delete(`/delete/evento/${eventoId}`),
    
    // Calendário (Indisponível)
    // criarCalendario: (empresaId) => api.post(`/create/calendario/${empresaId}`),
    // buscarCalendario: (empresaId) => api.get(`/get/calendario/${empresaId}`)
  };
};

export default useAPI;
```

#### Componente de exemplo
```javascript
import React, { useState, useEffect } from 'react';
import useAPI from './hooks/useAPI';

const CandidatosList = () => {
  const [candidatos, setCandidatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const api = useAPI();

  useEffect(() => {
    const fetchCandidatos = async () => {
      try {
        const response = await api.buscarCandidatos();
        setCandidatos(response.data.message);
      } catch (error) {
        logger.error('Erro ao buscar candidatos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidatos();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
      <h2>Lista de Candidatos</h2>
      {candidatos.map(candidato => (
        <div key={candidato.id}>
          <h3>{candidato.name}</h3>
          <p>Email: {candidato.email}</p>
          <p>CPF: {candidato.cpf}</p>
        </div>
      ))}
    </div>
  );
};

export default CandidatosList;
```

---

## 🛡️ Boas Práticas

### 🔐 Segurança Enterprise
- **HTTPS obrigatório** em produção
- **Tokens seguros**: httpOnly cookies > localStorage
- **Logout completo**: Limpe todos os tokens
- **Validação dupla**: Front-end + back-end
- **Rate limiting**: Implemente retry com backoff
- **Erro 429**: Trate rate limit exceeded
- **Headers de segurança**: Verifique CSP
- **Input validation**: Sempre valide antes de enviar

### 📊 Performance
- Use loading states durante requisições
- Implemente cache para dados que não mudam frequentemente
- Use paginação para listas grandes
- Implemente debounce em campos de busca

### 🎯 UX/UI
- Forneça feedback visual para todas as ações
- Implemente tratamento de erros amigável
- Use skeleton loading para melhor percepção de performance
- Valide formulários em tempo real

### 🧪 Testes
- **110+ Testes Implementados**: Unitários + Integração
- **99%+ Cobertura**: Todas as funções críticas testadas
- **Testes de Segurança**: SQL injection, XSS, autenticação
- **Testes de API**: Todos os endpoints validados
- **Scripts disponíveis**: `npm test`, `npm run test:unit`, `npm run test:integration`
- Teste todas as integrações com a API
- Mock as respostas da API para testes unitários
- Teste cenários de erro e timeout
- Implemente testes E2E para fluxos críticos

---

## 📞 Suporte

Para dúvidas ou problemas:
- 📧 **Issues**: [GitHub Issues](https://github.com/cMendoncaaa/APL-WEB-PCD/issues)
- 💼 **LinkedIn**: [Dev Melo](https://www.linkedin.com/in/devmelo/)
- 🐙 **GitHub**: [DiegoHenriqueMelo](https://github.com/DiegoHenriqueMelo)

---

<div align="center">

**🌟 Desenvolvido com ❤️ para promover a inclusão profissional**

*Este guia foi criado para facilitar a integração entre front-end e back-end*

</div>