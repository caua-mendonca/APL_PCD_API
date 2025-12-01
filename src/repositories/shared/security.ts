const ALLOWED_TABLES = new Set([
  "tb_administrador",
  "tb_colaborador",
  "tb_empresa",
  "tb_empresa_colaborador",
  "tb_candidato",
  "tb_ifbr",
  "tb_candidato_ifbr",
  "tb_empresa_vaga",
  "tb_vaga",
  "tb_candidato_vaga",
  "tb_calendario",
  "tb_evento",
  "tb_barreira",
  "tb_acessibilidade",
  "tb_sub_tipo_deficiencia",
  "tb_tipo_deficiencia",
  "tb_sub_tipo_barreira",
  "tb_barreira_acessibilidade"
]);

export const ALLOWED_COLUMNS: Record<string, Set<string>> = {
  tb_administrador: new Set(["email", "senha"]),
  tb_colaborador: new Set(["id", "nome", "setor", "email", "senha", "status"]),
  tb_empresa: new Set(["id", "nome_fantasia", "razao_social", "email", "senha", "cnpj", "telefone", "status", "acessibilidade", "id_colaborador"]),
  tb_empresa_colaborador: new Set(["tb_empresa_id", "tb_colaborador_id_colaborador"]),
  tb_candidato: new Set(["id", "nome", "email", "senha", "telefone", "cpf", "data_nascimento", "status", "deficiencia", "tipo_deficiencia", "barreira", "acessibilidade", "id_ifbr", "tb_candidato_id", "cep", "endereco", "num_casa"]),
  tb_vaga: new Set(["id", "data_inicio", "data_fim", "status", "titulo", "descricao", "salario", "localidade", "acess", "tipo", "id_creator", "tipo_acess"]),
  tb_empresa_vaga: new Set(["tb_empresa_id", "tb_vaga_id", "tb_vaga_status_vaga", "tb_vaga_data_fim", "tb_vaga_data_inicio"]),
  tb_calendario: new Set(["id", "nome_calendario", "id_empresa"]),
  tb_evento: new Set(["id", "nome", "descricao", "data_evento", "hora_ini", "hora_fim", "id_candidato", "id_calendario", "status"]),
  tb_barreira: new Set(["id", "descricao", "created_at", "updated_at"]),
  tb_acessibilidade: new Set(["id", "descricao", "created_at", "updated_at"]),
  tb_sub_tipo_deficiencia: new Set(["id", "nome", "tipo_id", "created_at", "updated_at"]),
  tb_candidato_vaga: new Set(["tb_vaga_id", "tb_candidato_id", "hora_candidatura"]),
  tb_sub_tipo_barreira: new Set(["sub_tipo_id", "barreira_id"]),
  tb_barreira_acessibilidade: new Set(["barreira_id", "acessibilidade_id"])
};

export const safeIdentifier = (table: string) => {
  if (!table || typeof table !== "string") {
    throw new Error("Identificador de tabela inválido.");
  }
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error(`Tabela não autorizada: ${table}`);
  }
  return table;
};

export const validateColumnsForTable = (table: string, columns: string[]) => {
  const allowed = ALLOWED_COLUMNS[table];
  if (!allowed) {
    throw new Error(`Não há definição de colunas permitidas para a tabela ${table}`);
  }
  for (const col of columns) {
    if (!allowed.has(col)) {
      throw new Error(`Coluna não autorizada para atualização: ${col}`);
    }
  }
};

export const extractColumnsFromSets = (sets: string): string[] => {
  const parts = sets.split(",").map(p => p.trim()).filter(Boolean);
  const cols: string[] = [];
  for (const part of parts) {
    const m = part.match(/^([a-zA-Z0-9_]+)\s*=/);
    if (!m) {
      throw new Error(`Formato inválido em sets: "${part}"`);
    }
    cols.push(m[1]);
  }
  return cols;
};