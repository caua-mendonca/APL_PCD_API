# 🗄️ Modelo de Banco de Dados

Este documento detalha a estrutura completa do banco de dados PostgreSQL utilizado no APL PCD API.

## 📊 Visão Geral

O banco de dados é composto por **14 tabelas principais** organizadas para:
- Gerenciar usuários (candidatos, empresas, colaboradores)
- Controlar vagas e candidaturas
- Administrar deficiências e acessibilidade
- Organizar calendários e eventos

### Estatísticas do Banco

| Métrica | Valor |
|---------|-------|
| **Total de Tabelas** | 14 principais |
| **Tabelas de Relacionamento** | 4 (N:N) |
| **Total de Índices** | 12+ |
| **Chaves Estrangeiras** | 10+ |
| **Triggers** | Planejado (audit log) |

## 📋 Diagrama Entidade-Relacionamento (ER)

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│  tb_candidato   │────┬────│ tb_candidato_vaga│────┬────│    tb_vaga      │
│                 │    │    └──────────────────┘    │    │                 │
│ • id (PK)       │    │                            │    │ • id (PK)       │
│ • nome          │    │    ┌──────────────────┐    │    │ • titulo        │
│ • email (UK)    │    └────│  tb_empresa_vaga │────┘    │ • descricao     │
│ • senha         │         └──────────────────┘         │ • salario       │
│ • cpf (UK)      │                  │                   │ • status        │
│ • deficiencia   │──┐               │                   └─────────────────┘
└─────────────────┘  │               │
                     │               │
                     │         ┌─────┴──────────┐
                     │         │   tb_empresa   │
┌──────────────────┐ │         │                │
│tb_tipo_deficienc │─┘         │ • id (PK)      │
│                  │           │ • nome         │
│ • id (PK)        │           │ • cnpj (UK)    │
│ • nome           │           │ • email (UK)   │
└────────┬─────────┘           │ • senha        │
         │                     └────────┬───────┘
         │                              │
┌────────┴──────────┐         ┌─────────┴────────────┐
│tb_sub_tipo_defic │         │tb_empresa_colaborador│
│                   │         └──────────────────────┘
│ • id (PK)         │                   │
│ • tipo_defic (FK) │         ┌─────────┴──────────┐
└───────────────────┘         │  tb_colaborador    │
                              │                    │
┌─────────────────┐           │ • id (PK)          │
│  tb_barreira    │           │ • nome             │
│                 │           │ • email (UK)       │
│ • id (PK)       │           │ • cargo            │
│ • nome          │           └────────────────────┘
└────────┬────────┘
         │
         │                     ┌─────────────────┐
┌────────┴─────────┐           │ tb_calendario   │
│tb_sub_tipo_barr  │           │                 │
│                  │           │ • id (PK)       │
│ • id (PK)        │           │ • nome          │
│ • barreira (FK)  │           │ • empresa (FK)  │
└──────────────────┘           └────────┬────────┘
                                        │
┌──────────────────┐          ┌─────────┴────────┐
│tb_acessibilidade │          │   tb_evento      │
│                  │          │                  │
│ • id (PK)        │          │ • id (PK)        │
│ • nome           │          │ • titulo         │
│ • tipo           │          │ • data_inicio    │
└────────┬─────────┘          │ • calendario(FK) │
         │                    └──────────────────┘
         │
┌────────┴──────────────┐
│tb_barreira_acessibil  │
│                       │
│ • barreira_id (FK)    │
│ • acessibilidade (FK) │
└───────────────────────┘
```

## 🏗️ Estrutura Detalhada das Tabelas

### 1️⃣ tb_candidato - Candidatos PCD

Armazena informações completas dos candidatos PCD.

```sql
CREATE TABLE tb_candidato (
    -- Identificação
    id VARCHAR(50) PRIMARY KEY,                    -- CAND-123456
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,                   -- Hash bcrypt
    
    -- Dados Pessoais
    telefone VARCHAR(20),
    cpf VARCHAR(11) UNIQUE NOT NULL,
    data_nascimento DATE NOT NULL,
    
    -- Deficiência
    deficiencia VARCHAR(50),                       -- DMOTO-001, DVISU-001, DAUDI-001
    tipo_deficiencia VARCHAR(50),                  -- ID do subtipo
    
    -- Acessibilidade
    barreira VARCHAR(50),                          -- ID da barreira
    acessibilidade VARCHAR(50),                    -- ID da acessibilidade
    
    -- Status e Auditoria
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Índices:**
```sql
CREATE INDEX idx_candidato_email ON tb_candidato(email);
CREATE INDEX idx_candidato_cpf ON tb_candidato(cpf);
CREATE INDEX idx_candidato_deficiencia ON tb_candidato(deficiencia);
```

**Restrições:**
- Email deve ser único
- CPF deve ser único e válido
- Data de nascimento: idade mínima 16 anos
- Deficiência deve existir em `tb_tipo_deficiencia`

### 2️⃣ tb_empresa - Empresas Contratantes

Armazena dados das empresas que publicam vagas.

```sql
CREATE TABLE tb_empresa (
    -- Identificação
    id VARCHAR(50) PRIMARY KEY,                    -- EMP-123456
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    
    -- Dados da Empresa
    telefone VARCHAR(20),
    endereco TEXT,
    setor VARCHAR(100),
    porte VARCHAR(50),                             -- MEI, ME, EPP, Grande
    
    -- Status e Auditoria
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Índices:**
```sql
CREATE INDEX idx_empresa_cnpj ON tb_empresa(cnpj);
CREATE INDEX idx_empresa_email ON tb_empresa(email);
```

### 3️⃣ tb_colaborador - Colaboradores das Empresas

Profissionais de RH e gestores vinculados às empresas.

```sql
CREATE TABLE tb_colaborador (
    -- Identificação
    id VARCHAR(50) PRIMARY KEY,                    -- COLAB-123456
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    
    -- Dados Profissionais
    cargo VARCHAR(100),
    departamento VARCHAR(100),
    telefone VARCHAR(20),
    
    -- Status e Auditoria
    status BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ tb_vaga - Vagas de Emprego

Oportunidades de trabalho publicadas pelas empresas.

```sql
CREATE TABLE tb_vaga (
    -- Identificação
    id VARCHAR(50) PRIMARY KEY,                    -- VAGA-123456
    titulo VARCHAR(255) NOT NULL,
    
    -- Descrição da Vaga
    descricao TEXT,
    requisitos TEXT,
    beneficios TEXT,
    
    -- Informações da Posição
    salario DECIMAL(10, 2),
    tipo_contrato VARCHAR(50),                     -- CLT, PJ, Estágio, etc.
    carga_horaria VARCHAR(50),                     -- 40h/semana, 6h/dia
    modalidade VARCHAR(50),                        -- Presencial, Remoto, Híbrido
    
    -- Localização
    cidade VARCHAR(100),
    estado VARCHAR(2),
    localizacao VARCHAR(255),
    
    -- Acessibilidade
    acessibilidade_vaga TEXT,                      -- Recursos disponíveis
    deficiencias_aceitas TEXT[],                   -- Array de deficiências
    
    -- Status e Prazos
    status VARCHAR(50) DEFAULT 'ativa',            -- ativa, pausada, encerrada
    data_inicio DATE,
    data_fim DATE,
    vagas_disponiveis INTEGER DEFAULT 1,
    
    -- Auditoria
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Índices:**
```sql
CREATE INDEX idx_vaga_status ON tb_vaga(status);
CREATE INDEX idx_vaga_modalidade ON tb_vaga(modalidade);
CREATE INDEX idx_vaga_cidade ON tb_vaga(cidade);
```

### 5️⃣ tb_tipo_deficiencia - Tipos de Deficiência

Categorias principais de deficiências.

```sql
CREATE TABLE tb_tipo_deficiencia (
    id VARCHAR(50) PRIMARY KEY,                    -- DMOTO-001, DVISU-001, etc.
    nome VARCHAR(100) NOT NULL,                    -- Motora, Visual, Auditiva
    descricao TEXT,
    codigo_cid VARCHAR(10),                        -- CID-10
    categoria VARCHAR(50),                         -- Física, Sensorial, Intelectual
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Dados Padrão:**
```sql
INSERT INTO tb_tipo_deficiencia (id, nome, categoria) VALUES
('DMOTO-0001', 'Deficiência Motora', 'Física'),
('DVISU-0001', 'Deficiência Visual', 'Sensorial'),
('DAUDI-0001', 'Deficiência Auditiva', 'Sensorial'),
('DINTE-0001', 'Deficiência Intelectual', 'Intelectual'),
('DPSIC-0001', 'Deficiência Psicossocial', 'Mental');
```

### 6️⃣ tb_sub_tipo_deficiencia - Subtipos de Deficiência

Especificações detalhadas de cada tipo de deficiência.

```sql
CREATE TABLE tb_sub_tipo_deficiencia (
    id VARCHAR(50) PRIMARY KEY,                    -- SUBT-123456
    tipo_deficiencia_id VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    grau VARCHAR(50),                              -- Leve, Moderado, Severo
    
    FOREIGN KEY (tipo_deficiencia_id) 
        REFERENCES tb_tipo_deficiencia(id) 
        ON DELETE CASCADE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Exemplo de Dados:**
```sql
-- Subtipos de Deficiência Visual
INSERT INTO tb_sub_tipo_deficiencia VALUES
('SUBT-001', 'DVISU-0001', 'Cegueira Total', 'Ausência total de visão', 'Severo'),
('SUBT-002', 'DVISU-0001', 'Baixa Visão', 'Visão subnormal', 'Moderado'),
('SUBT-003', 'DVISU-0001', 'Visão Monocular', 'Visão em apenas um olho', 'Leve');
```

### 7️⃣ tb_barreira - Barreiras de Acessibilidade

Obstáculos enfrentados por pessoas com deficiência.

```sql
CREATE TABLE tb_barreira (
    id VARCHAR(50) PRIMARY KEY,                    -- BARR-123456
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50),                              -- Arquitetônica, Comunicacional, etc.
    impacto VARCHAR(50),                           -- Alto, Médio, Baixo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Tipos de Barreiras:**
- Arquitetônicas (escadas, degraus, portas estreitas)
- Comunicacionais (falta de libras, audiodescrição)
- Atitudinais (preconceito, discriminação)
- Tecnológicas (sites não acessíveis)
- Programáticas (falta de políticas inclusivas)

### 8️⃣ tb_sub_tipo_barreira - Subtipos de Barreira

```sql
CREATE TABLE tb_sub_tipo_barreira (
    id VARCHAR(50) PRIMARY KEY,
    barreira_id VARCHAR(50) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    
    FOREIGN KEY (barreira_id) 
        REFERENCES tb_barreira(id) 
        ON DELETE CASCADE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 9️⃣ tb_acessibilidade - Recursos de Acessibilidade

Recursos disponíveis para garantir acessibilidade.

```sql
CREATE TABLE tb_acessibilidade (
    id VARCHAR(50) PRIMARY KEY,                    -- ACES-123456
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50),                              -- Física, Digital, Comunicação
    custo_estimado DECIMAL(10, 2),
    tempo_implementacao VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Exemplos de Recursos:**
- Rampas de acesso
- Elevadores adaptados
- Intérprete de Libras
- Software leitor de tela
- Material em Braille
- Audiodescrição

### 🔟 tb_calendario - Calendários por Empresa

```sql
CREATE TABLE tb_calendario (
    id VARCHAR(50) PRIMARY KEY,                    -- CALENDAR-123456
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    empresa_id VARCHAR(50) NOT NULL,
    cor VARCHAR(7),                                -- Hex color: #FF5733
    tipo VARCHAR(50),                              -- Entrevistas, Eventos, Treinamentos
    
    FOREIGN KEY (empresa_id) 
        REFERENCES tb_empresa(id) 
        ON DELETE CASCADE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1️⃣1️⃣ tb_evento - Eventos do Calendário

```sql
CREATE TABLE tb_evento (
    id VARCHAR(50) PRIMARY KEY,                    -- EVENT-123456
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    
    -- Data e Hora
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP,
    duracao_minutos INTEGER,
    
    -- Localização
    localizacao VARCHAR(255),
    link_virtual VARCHAR(500),                     -- URL reunião online
    
    -- Tipo e Categoria
    tipo VARCHAR(50),                              -- Entrevista, Reunião, Evento
    categoria VARCHAR(50),
    
    -- Participantes
    organizador_id VARCHAR(50),
    participantes TEXT[],                          -- Array de IDs
    
    -- Acessibilidade
    recursos_acessibilidade TEXT[],
    
    -- Relacionamentos
    calendario_id VARCHAR(50) NOT NULL,
    vaga_id VARCHAR(50),                           -- Se for entrevista
    
    FOREIGN KEY (calendario_id) 
        REFERENCES tb_calendario(id) 
        ON DELETE CASCADE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 1️⃣2️⃣ tb_candidato_vaga - Candidaturas (N:N)

Relacionamento entre candidatos e vagas.

```sql
CREATE TABLE tb_candidato_vaga (
    id SERIAL PRIMARY KEY,
    tb_candidato_id VARCHAR(50) NOT NULL,
    tb_vaga_id VARCHAR(50) NOT NULL,
    
    -- Status da Candidatura
    status VARCHAR(50) DEFAULT 'pendente',         -- pendente, em análise, aprovado, recusado
    
    -- Datas
    hora_candidatura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP,
    
    -- Informações Adicionais
    carta_apresentacao TEXT,
    curriculo_url VARCHAR(500),
    
    -- Restrições
    UNIQUE(tb_candidato_id, tb_vaga_id),
    
    FOREIGN KEY (tb_candidato_id) 
        REFERENCES tb_candidato(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tb_vaga_id) 
        REFERENCES tb_vaga(id) 
        ON DELETE CASCADE
);
```

**Índices:**
```sql
CREATE INDEX idx_candidato_vaga_candidato ON tb_candidato_vaga(tb_candidato_id);
CREATE INDEX idx_candidato_vaga_vaga ON tb_candidato_vaga(tb_vaga_id);
CREATE INDEX idx_candidato_vaga_status ON tb_candidato_vaga(status);
```

### 1️⃣3️⃣ tb_empresa_vaga - Vagas por Empresa (N:N)

```sql
CREATE TABLE tb_empresa_vaga (
    id SERIAL PRIMARY KEY,
    tb_empresa_id VARCHAR(50) NOT NULL,
    tb_vaga_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(tb_empresa_id, tb_vaga_id),
    
    FOREIGN KEY (tb_empresa_id) 
        REFERENCES tb_empresa(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tb_vaga_id) 
        REFERENCES tb_vaga(id) 
        ON DELETE CASCADE
);
```

### 1️⃣4️⃣ tb_empresa_colaborador - Colaboradores por Empresa (N:N)

```sql
CREATE TABLE tb_empresa_colaborador (
    id SERIAL PRIMARY KEY,
    tb_empresa_id VARCHAR(50) NOT NULL,
    tb_colaborador_id VARCHAR(50) NOT NULL,
    data_vinculacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_desvinculacao TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ativo',
    
    UNIQUE(tb_empresa_id, tb_colaborador_id),
    
    FOREIGN KEY (tb_empresa_id) 
        REFERENCES tb_empresa(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tb_colaborador_id) 
        REFERENCES tb_colaborador(id) 
        ON DELETE CASCADE
);
```

### 1️⃣5️⃣ tb_barreira_acessibilidade - Soluções para Barreiras (N:N)

```sql
CREATE TABLE tb_barreira_acessibilidade (
    id SERIAL PRIMARY KEY,
    tb_barreira_id VARCHAR(50) NOT NULL,
    tb_acessibilidade_id VARCHAR(50) NOT NULL,
    efetividade VARCHAR(50),                       -- Alta, Média, Baixa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(tb_barreira_id, tb_acessibilidade_id),
    
    FOREIGN KEY (tb_barreira_id) 
        REFERENCES tb_barreira(id) 
        ON DELETE CASCADE,
    FOREIGN KEY (tb_acessibilidade_id) 
        REFERENCES tb_acessibilidade(id) 
        ON DELETE CASCADE
);
```

## 🔍 Queries Úteis

### Listar candidatos com deficiência visual
```sql
SELECT c.id, c.nome, c.email, td.nome AS deficiencia
FROM tb_candidato c
JOIN tb_tipo_deficiencia td ON c.deficiencia = td.id
WHERE td.categoria = 'Sensorial' AND td.nome LIKE '%Visual%';
```

### Vagas ativas com mais candidaturas
```sql
SELECT 
    v.id,
    v.titulo,
    COUNT(cv.id) AS total_candidatos,
    v.status
FROM tb_vaga v
LEFT JOIN tb_candidato_vaga cv ON v.id = cv.tb_vaga_id
WHERE v.status = 'ativa'
GROUP BY v.id, v.titulo, v.status
ORDER BY total_candidatos DESC;
```

### Empresas com mais vagas publicadas
```sql
SELECT 
    e.id,
    e.nome,
    COUNT(ev.tb_vaga_id) AS total_vagas
FROM tb_empresa e
LEFT JOIN tb_empresa_vaga ev ON e.id = ev.tb_empresa_id
GROUP BY e.id, e.nome
ORDER BY total_vagas DESC;
```

## 📚 Próximos Passos

- Consulte a [Referência da API](./06-API-REFERENCE.md)
- Aprenda sobre [Segurança](./07-SEGURANCA.md)
- Execute os [Testes](./08-TESTES.md)

---

**Modelo de Banco de Dados Documentado! 🗄️**
