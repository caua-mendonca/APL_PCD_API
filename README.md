# 📘 APL-WEB-PCD - API REST

## 🔍 Visão Geral

A **APL-WEB-PCD API** é uma interface RESTful desenvolvida com o objetivo de **gerenciar dados de acessibilidade digital para pessoas com deficiência (PcD)**. Este projeto faz parte de um trabalho interdisciplinar do curso de **Engenharia de Software**, com foco em promover **inclusão social através de soluções tecnológicas**.

> 📌 Esta API é estritamente acadêmica, **sem fins lucrativos** e **não está disponível para uso público ou comercial**.

---

## ⚙️ Tecnologias Utilizadas

- **Backend:** Node.js, Express.js  
- **Banco de Dados:** Oracle  
- **Frontend (Integrado separadamente):** HTML5, CSS3, JavaScript  
- **Outras:** Middleware personalizados, serviços RESTful, validações, autenticação básica

---

## 📁 Endpoints Principais

> Todos os endpoints retornam dados no formato JSON e seguem as convenções REST.

### 🔐 Autenticação

`POST /api/auth/login`  
Autentica um usuário e retorna um token de sessão.

**Request body:**
```json
{
  "email": "usuario@exemplo.com",
  "senha": "senha123"
}
