import * as DB from "../config/connect.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });


const ALLOWED_TABLES = new Set([
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

/**
 * Mapa (por tabela) das colunas permitidas para operações dinâmicas (update).
 * Expanda conforme o schema real do banco.
 */
const ALLOWED_COLUMNS: Record<string, Set<string>> = {
  tb_colaborador: new Set(["id_colaborador", "nome", "setor", "email", "senha", "status"]),
  tb_empresa: new Set(["id", "nome_fantasia", "razao_social", "email", "senha", "cnpj", "telefone", "status", "acessibilidade", "id_colaborador"]),
  tb_empresa_colaborador: new Set(["tb_empresa_id", "tb_colaborador_id_colaborador"]),
  tb_candidato: new Set(["id", "nome", "email", "senha", "telefone", "cpf", "data_nascimento", "status", "deficiencia", "tipo_deficiencia", "barreira", "acessibilidade", "id_ifbr", "tb_candidato_id"]),
  tb_vaga: new Set(["id", "data_inicio", "data_fim", "status", "titulo", "descricao", "salario", "localidade", "acess", "tipo", "id_creator"]),
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

/**
 * Valida se o identificador (tabela) é permitido.
 */
const safeIdentifier = (table: string) => {
  if (!table || typeof table !== "string") {
    throw new Error("Identificador de tabela inválido.");
  }
  if (!ALLOWED_TABLES.has(table)) {
    throw new Error(`Tabela não autorizada: ${table}`);
  }
  return table;
};

/**
 * Valida que as colunas extraídas existam na whitelist para a tabela.
 */
const validateColumnsForTable = (table: string, columns: string[]) => {
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

const extractColumnsFromSets = (sets: string): string[] => {
  // separa por vírgula e captura a parte antes do '='
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

/**
 * Insere um novo candidato na tabela tb_candidato.
 * @param user - Objeto com todos os dados do candidato.
 */
export let insertIntoCandidate = async (user: {
  id: string;
  name: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def: string;
  sub_tipo: string;
  barreira: string;
  acessbilidade: string;
  status: boolean;
}): Promise<[number, string]> => {
  const table = safeIdentifier("tb_candidato");
  try {
    console.log(`[POST / QUERY] insertIntoCandidate -> iniciando inserção em ${table}`);

    const sql = `
      INSERT INTO ${table} (
        id, nome, email, senha, telefone, cpf, data_nascimento, status, deficiencia, tipo_deficiencia, barreira, acessibilidade
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12
      );
    `;

    await DB.pool.query(sql, [
      user.id,
      user.name,
      user.email,
      user.senha,
      user.telefone,
      user.cpf,
      user.data_nascimento,
      user.status,
      user.def,
      user.sub_tipo,
      user.barreira,
      user.acessbilidade,
    ]);

    console.log(`[POST / QUERY] insertIntoCandidate -> success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    console.error(`[POST / QUERY] insertIntoCandidate -> failed:`, error?.message ?? error);
    // retorna código genérico e mensagem ambiente, sem vazar stack/objeto Error
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};

/**
 * Insere um novo contratante na tabela tb_empresa.
 * @param user - Objeto com dados do contratante.
 */
export let insertIntoContratante = async (user: {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
  status: boolean;
}): Promise<[number, string]> => {
  const table = safeIdentifier("tb_empresa");
  console.log(`[QUERY] Inserindo contratante -> tabela ${table}`);
  try {
    const sql = `
      INSERT INTO ${table} (
        id, nome_fantasia, razao_social, email, senha, cnpj, telefone, status, acessibilidade
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      );
    `;

    await DB.pool.query(sql, [
      user.id,
      user.nome_fantasia,
      user.razao_social,
      user.email,
      user.senha,
      user.cnpj,
      user.telefone,
      user.status,
      user.acessibilidade,
    ]);

    console.log(`[POST / QUERY] insertIntoContratante -> success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    console.error(`[POST / QUERY] insertIntoContratante -> failed:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};

/**
 * Busca o ID de um usuário na tabela dado o CPF ou CNPJ.
 * @param table Nome da tabela para consulta.
 * @param cpfOrCnpj CPF ou CNPJ para busca.
 * @returns Resultado da query.
 */

/**
 * Verifica se um determinado ID existe na tabela.
 * @param table Nome da tabela.
 * @param id ID a ser validado.
 * @returns Booleano indicando existência.
 */
export const selectId = async (table: string, id: string): Promise<boolean> => {
  try {
    const safeTable = safeIdentifier(table); // valida explicitamente
    const query = `SELECT id FROM ${safeTable} WHERE id = $1;`;
    const result = await DB.pool.query(query, [id]);
    return result.rows.length > 0;
  } catch (error: any) {
    console.error(`[selectId] ERRO ao validar ID ${id} na tabela ${table}:`, error?.message ?? error);
    throw new Error("Erro ao validar ID"); // lançamento genérico para camada superior tratar
  }
};


/**
 * Insere um novo colaborador na tabela tb_colaborador.
 * @param id ID do colaborador.
 * @param name Nome do colaborador.
 * @param email Email do colaborador.
 * @param senha Senha do colaborador.
 * @param setor Setor do colaborador.
 */
export let insertIntoColaborador = async (
  id: string,
  name: string,
  email: string,
  senha: string,
  setor: string
): Promise<[number, string]> => {
  try {
    const safeTable = safeIdentifier("tb_colaborador");
    const sql = `
      INSERT INTO ${safeTable} (
        id_colaborador, nome, setor, email, senha
      ) VALUES ($1, $2, $3, $4, $5);
    `;

    await DB.pool.query(sql, [id, name, setor, email, senha]);

    console.log(`[insertIntoColaborador] Inserção realizada com sucesso (colaborador=${id})`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    console.error(`[insertIntoColaborador] ERRO ao inserir colaborador ${id}:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};

/**
 * Insere relação entre empresa e colaborador na tabela tb_empresa_colaborador.
 * @param id_colaborador ID do colaborador.
 * @param id_empresa ID da empresa.
 */
export let insertEmpresaColaborador = async (
  id_colaborador: string,
  id_empresa: string
): Promise<[number, string]> => {
  console.log("[insertEmpresaColaborador] Inserindo relação colaborador-empresa...");
  try {
    const safeTable1 = safeIdentifier("tb_empresa");
    const empresa = await DB.pool.query(
      `SELECT cnpj, razao_social FROM ${safeTable1} WHERE id = $1`,
      [id_empresa]
    );

    if (empresa.rowCount === 0) {
      console.warn(`[insertEmpresaColaborador] Empresa ${id_empresa} não encontrada`);
      return [404, String(process.env.STATUS_404 ?? "Not Found")];
    }

    const safeTable2 = safeIdentifier("tb_empresa_colaborador");
    const sql = `
      INSERT INTO ${safeTable2} (
        tb_empresa_id,
        tb_colaborador_id_colaborador
      )
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;

    await DB.pool.query(sql, [id_empresa, id_colaborador]);

    console.log(`[insertEmpresaColaborador] Relação criada com sucesso (empresa=${id_empresa}, colaborador=${id_colaborador})`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    console.error(`[insertEmpresaColaborador] ERRO ao inserir relação:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};
/**
 * Atualiza o ID do colaborador na tabela tb_empresa.
 * @param id ID do colaborador.
 * @param id_empresa ID da empresa.
 */
export let updateColaboradorEmpresa = async (
  id: string,
  id_empresa: string
): Promise<[number, string]> => {
  try {
    const safeTable = safeIdentifier("tb_empresa");
    const sql = `UPDATE ${safeTable} SET id_colaborador = $1 WHERE id = $2;`;
    await DB.pool.query(sql, [id, id_empresa]);

    console.log(`[updateColaboradorEmpresa] Atualização realizada com sucesso (empresa=${id_empresa}, colaborador=${id})`);
    return [200, String(process.env.STATUS_200 ?? "OK")];
  } catch (error: any) {
    console.error(`[updateColaboradorEmpresa] ERRO ao atualizar colaborador na empresa:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};

/**
 * Seleciona todos os registros de uma tabela.
 * @param table Nome da tabela.
 * @returns Resultado da consulta.
 */
export let selectFromTable = async (
  table: string
): Promise<[number, any]> => {
  console.log(`[selectFromTable] Executando SELECT ALL em ${table}`);

  try {
    const safeTable = safeIdentifier(table);
    const query = `SELECT * FROM ${safeTable};`;
    const result = await DB.pool.query(query);

    console.log(`[selectFromTable] Success (${result.rowCount} registros)`);
    return [200, result.rows];
  } catch (error: any) {
    console.error(`[selectFromTable] Failed:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};


/**
 * Seleciona um registro de uma tabela pelo ID.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @returns Resultado da consulta.
 */
export let selectFromNameWhere = async (
  table: string,
  name: string
): Promise<[number, any]> => {
  console.log(`[selectFromNameWhere] Executando SELECT WHERE nome=... em ${table}`);
  try {
    const safeTable = safeIdentifier(table);
    const query = `SELECT * FROM ${safeTable} WHERE nome = $1;`;
    const result = await DB.pool.query(query, [name]);

    console.log(`[selectFromNameWhere] Success (${result.rowCount} registros)`);
    return [200, result.rows];
  } catch (error: any) {
    console.error(`[selectFromNameWhere] Failed:`, error?.message ?? error);
    return [500, String(process.env.STATUS_500 ?? "Internal Server Error")];
  }
};

export let selectFromIdWhere = async (
  table: string,
  id: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "selectFromIdWhere";
  try {
    const safeTable = safeIdentifier(table);
    const sql = `SELECT * FROM ${safeTable} WHERE tb_candidato_id = $1;`;
    const result = await DB.pool.query(sql, [id]);

    console.log(`[${func}] Success: ${result.rowCount} rows (table=${safeTable}, tb_candidato_id=${id})`);
    return [200, { success: true, message: "Registros encontrados", data: result.rows }];
  } catch (err: any) {
    console.error(`[${func}] Error:`, err?.message ?? err);
    return [500, { success: false, message: "Erro ao executar consulta", data: null }];
  }
};

/**
 * Seleciona o campo colaborador de uma tabela baseado no ID.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @returns Resultado da consulta.
 */

/**
 * Realiza "delete" lógico, atualizando status para false.
 * @param table Nome da tabela.
 * @param id ID do registro a ser atualizado.
 * @returns Resultado da operação.
 */
export let deleteFromTable = async (
  table: string,
  id: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "deleteFromTable";
  try {
    const safeTable = safeIdentifier(table);
    const sql = `UPDATE ${safeTable} SET status = $1 WHERE id = $2;`;
    const result = await DB.pool.query(sql, [false, id]);

    console.log(`[${func}] Success (table=${safeTable}, id=${id}, rowCount=${result.rowCount})`);
    return [200, { success: true, message: "Registro marcado como inativo (delete lógico)", data: { rowCount: result.rowCount } }];
  } catch (err: any) {
    console.error(`[${func}] Error:`, err?.message ?? err);
    return [500, { success: false, message: "Erro ao executar delete lógico", data: null }];
  }
};

/**
 * Atualiza colunas específicas de um registro na tabela.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @param sets String formatada com colunas e placeholders (ex: "nome = $1, email = $2").
 * @param values Valores para substituição nos placeholders.
 * @returns Resultado da atualização.
 */
export let updateUserColumn = async (
  table: string,
  id: string,
  sets: string,
  values: any[]
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "updateUserColumn";
  try {
    const safeTable = safeIdentifier(table);

    // extrair colunas e validar
    const columns = extractColumnsFromSets(sets);
    validateColumnsForTable(safeTable, columns);

    // garantimos que values.length corresponda ao número de colunas detectadas
    if (columns.length !== values.length) {
      throw new Error(`Quantidade de valores (${values.length}) não corresponde ao número de colunas (${columns.length}).`);
    }

    // reconstruct sets to ensure normalized placeholders $1..$N
    const normalizedSets = columns.map((col, idx) => `${col} = $${idx + 1}`).join(", ");

    // id será o último placeholder
    const finalQuery = `UPDATE ${safeTable} SET ${normalizedSets} WHERE id = $${values.length + 1};`;
    const finalValues = [...values, id];

    const result = await DB.pool.query(finalQuery, finalValues);

    console.log(`[${func}] Success (table=${safeTable}, id=${id}, updated=${result.rowCount})`);
    return [200, { success: true, message: "Registro atualizado com sucesso", data: { rowCount: result.rowCount } }];
  } catch (err: any) {
    console.error(`[${func}] Error:`, err?.message ?? err);
    // se erro de validação do desenvolvedor, devolve 400
    if (err.message && /não corresponde|inválido|não autorizada|formato inválido/i.test(err.message)) {
      return [400, { success: false, message: err.message, data: null }];
    }
    return [500, { success: false, message: "Erro ao executar atualização", data: null }];
  }
};
/**
 * Insere uma vaga na tabela tb_vaga.
 * @param id ID da vaga.
 * @param data_inicio Data de início da vaga.
 * @param data_fim Data final da vaga.
 * @param status_vaga Status da vaga (ativa ou não).
 * @param titulo Título da vaga.
 * @param descricao Descrição da vaga.
 * @param salario Salário ofertado.
 * @param localidade Local da vaga.
 * @param acess Acessibilidade oferecida.
 * @param id_creator ID do criador da vaga
/**
 * Insere uma nova vaga na tabela tb_vaga.
 * @param id ID único da vaga.
 * @param data_inicio Data de início da vaga.
 * @param data_fim Data de término da vaga.
 * @param status_vaga Status da vaga (ativa/inativa).
 * @param titulo Título da vaga.
 * @param descricao Descrição detalhada da vaga.
 * @param salario Valor do salário ofertado.
 * @param localidade Localidade da vaga.
 * @param acess Informação sobre acessibilidade.
 * @param id_creator ID da empresa ou colaborador que criou a vaga.
 * @returns Promise<boolean> indicando sucesso ou falha na inserção.
 */
export const insertVaga = async (
  id: string,
  data_inicio: Date,
  data_fim: Date,
  status_vaga: boolean,
  titulo: string,
  descricao: string,
  salario: number,
  localidade: string,
  acess: string,
  tipo: string,
  id_creator: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "insertVaga";
  try {
    const sql = `
      INSERT INTO tb_vaga (
        id,
        data_inicio,
        data_fim,
        status,
        titulo,
        descricao,
        salario,
        localidade,
        acess,
        tipo,
        id_creator
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11
      );
    `;

    await DB.pool.query(sql, [
      id,
      data_inicio,
      data_fim,
      status_vaga,
      titulo,
      descricao,
      salario,
      localidade,
      acess,
      tipo,
      id_creator,
    ]);

    console.log(`[${func}] Vaga ${id} inserida com sucesso`);
    return [201, { success: true, message: "Vaga inserida", data: { id } }];
  } catch (err: any) {
    console.error(`[${func}] Error ao inserir vaga ${id}:`, err?.message ?? err);
    return [500, { success: false, message: "Erro ao inserir vaga", data: null }];
  }
};

/**
 * Insere relação entre empresa e vaga na tabela tb_empresa_vaga.
 * @param vaga Objeto contendo os dados da vaga.
 * @param id_empresa ID da empresa relacionada à vaga.
 */
export let insertEmpVaga = async (
  vaga: {
    id: string;
    data_inicio: Date;
    data_fim: Date;
    status: boolean;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    acessibilidade: string;
  },
  id_empresa: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "insertEmpVaga";
  try {
    const { id, data_inicio, data_fim, status } = vaga;
    const query = `
      INSERT INTO tb_empresa_vaga (
        tb_empresa_id,
        tb_vaga_id,
        tb_vaga_status_vaga,
        tb_vaga_data_fim,
        tb_vaga_data_inicio
      ) VALUES ($1, $2, $3, $4, $5);
    `;

    const result = await DB.pool.query(query, [
      id_empresa,
      id,
      status,
      data_fim,
      data_inicio,
    ]);

    console.log(`[${func}] Relação vaga-empresa inserida (empresa=${id_empresa}, vaga=${id})`);
    return [201, { success: true, message: "Relação vaga-empresa criada", data: { rowCount: result.rowCount } }];
  } catch (err: any) {
    console.error(`[${func}] Error:`, err?.message ?? err);
    return [500, { success: false, message: "Erro ao inserir relação vaga-empresa", data: null }];
  }
};

/**
 * Busca o ID da empresa associada a um colaborador específico.
 * @param id_colaborador ID do colaborador.
 * @returns ID da empresa vinculada ao colaborador.
 */
export let getEmpByColab = async (id_colaborador: string) => {
  try {
    const safeTable = safeIdentifier("tb_empresa_colaborador");
    const query = `SELECT tb_empresa_id FROM ${safeTable} WHERE tb_colaborador_id_colaborador = $1;`;
    const result = await DB.pool.query(query, [id_colaborador]);

    if (result.rowCount === 0) {
      throw new Error(
        `Nenhuma empresa encontrada para colaborador ${id_colaborador}`
      );
    }

    const emp = result.rows[0].tb_empresa_id;

    return emp;
  } catch (error) {
    console.error(
      `[getEmpByColab] ERRO ao buscar empresa para colaborador ${id_colaborador}:`,
      error
    );
    throw error;
  }
};
/**
 * Insere um candidato em uma vaga na tabela tb_candidato_vaga.
 * @param id_vaga ID da vaga.
 * @param id_candidate ID do candidato.
 * @returns Promise<boolean> indicando sucesso ou falha da operação.
 */
/**
 * Insere um candidato em uma vaga na tabela tb_candidato_vaga.
 *
 * @param id_vaga - ID da vaga que o candidato está se candidatando.
 * @param id_candidate - ID do candidato a ser inserido.
 * @returns Promise<boolean> - Retorna true se a inserção for bem-sucedida, false em caso de falha.
 */
export const insertCandidateVaga = async (
  id_candidate: string,
  id_vaga: string,
  hora: Date
): Promise<any> => {
  console.log("[QUERY] Inserindo candidato na vaga...");
  try {
    const safeTable = safeIdentifier("tb_candidato_vaga");
    const query = `INSERT INTO ${safeTable} (tb_vaga_id, tb_candidato_id, hora_candidatura) VALUES ($1, $2, $3);`;
    await DB.pool.query(query, [id_vaga, id_candidate, hora]);

    return [200, String(process.env.STATUS_200)];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Valida a existência de um valor específico em uma tabela.
 *
 * @param value - Valor a ser validado.
 * @param data - Nome da coluna a ser verificada.
 * @param table - Nome da tabela onde a validação será feita.
 * @returns Promise<number | boolean> - Quantidade de registros encontrados ou false em caso de erro.
 */
export let validateData = async (
  value: string,
  data: string,
  table: string
): Promise<any> => {
  try {
    const safeTable = safeIdentifier(table);
    const allowedColumns = ALLOWED_COLUMNS[safeTable];
    if (!allowedColumns || !allowedColumns.has(data)) {
      throw new Error(`Coluna não autorizada: ${data}`);
    }
    
    const result = await DB.pool.query(
      `SELECT ${data} FROM ${safeTable} WHERE ${data} = $1`,
      [value]
    );

    return result.rows.length;
  } catch (error) {
    console.error(
      `[validateData] ERRO ao validar dados na tabela ${table}, coluna ${data}:`,
      error
    );
    return false;
  }
};

/**
 * Insere um novo evento na tabela tb_evento.
 *
 * @param evento - Objeto contendo as informações do evento.
 * @param id_calendario - ID do calendário ao qual o evento pertence.
 * @returns Promise<string> - Query utilizada, ou lança erro em caso de falha.
 */
export let insertIntoEventos = async (
  evento: {
    id: string;
    titulo: string;
    descricao: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    id_candidato: string;
  },
  id_calendario: string
) => {
  console.log("[QUERY] Inserindo evento...]");
  try {
    const { id, titulo, descricao, data, hora_inicio, hora_fim, id_candidato } =
      evento;

    const safeTable = safeIdentifier("tb_evento");
    const query = `
      INSERT INTO ${safeTable} (
        id,
        nome,
        descricao,
        data_evento,
        hora_ini,
        hora_fim,
        id_candidato, 
        id_calendario,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    await DB.pool.query(query, [
      id,
      titulo,
      descricao,
      data,
      hora_inicio,
      hora_fim,
      id_candidato,
      id_calendario,
      true,
    ]);

    console.log(`[QUERY] Success`);

    return [200, String(process.env.STATUS_200)];
  } catch (error) {
    console.error("[QUERY] Failed");
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Busca todos os eventos vinculados a um determinado calendário.
 * @param id_calendario - Identificador único do calendário.
 * @returns Lista de eventos vinculados ao calendário.
 * @throws Lança erro se houver falha na consulta ao banco de dados.
 */
export let getEventosByCalendario = async (
  id_calendario: string
): Promise<any> => {
  console.log("[QUERY] Buscando eventos...");
  try {
    const safeTable = safeIdentifier("tb_evento");
    const query = `SELECT * FROM ${safeTable} WHERE id_calendario = $1;`;
    const result = await DB.pool.query(query, [id_calendario]);

    return [200, result.rows];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Insere um novo calendário na base de dados.
 * @param id_calendar - Identificador único do calendário.
 * @param nome - Nome do calendário.
 * @param id_empresa - Identificador único da empresa associada.
 * @returns Retorna `true` se a inserção for bem-sucedida.
 * @throws Lança erro se houver falha na inserção no banco de dados.
 */
export let insertCalendario = async (
  id_calendar: string,
  nome: string,
  id_empresa: string
): Promise<any> => {
  console.log("[QUERY] Inserindo calendário...");
  try {
    const safeTable = safeIdentifier("tb_calendario");
    const query = `
      INSERT INTO ${safeTable} (id, nome_calendario, id_empresa) VALUES ($1, $2, $3);
    `;
    let result = await DB.pool.query(query, [id_calendar, nome, id_empresa]);

    console.log(`[QUERY] Success`);
    return [201, result];
  } catch (error) {
    console.error("[QUERY] Failed");
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Busca o ID da empresa vinculada a um determinado calendário.
 * @param id_empresa - Identificador único do calendário (nesse contexto, representa o ID do calendário).
 * @returns Retorna a lista contendo o ID da empresa associada.
 * @throws Lança erro se houver falha na consulta.
 */
export let selectEmpbyCalendar = async (id_empresa: string): Promise<any> => {
  try {
    const safeTable = safeIdentifier("tb_calendario");
    const query = `SELECT id_empresa FROM ${safeTable} WHERE id = $1;`;
    const result = await DB.pool.query(query, [id_empresa]);

    return result.rows;
  } catch (error) {
    console.error(
      `❌ [selectEmpbyCalendar] Erro ao buscar empresa vinculada ao calendário.`,
      { calendarioId: id_empresa, error }
    );
    throw error;
  }
};

/**
 * login
 * Realiza a consulta de login de um usuário em qualquer tabela fornecida.
 * @param email - Email do usuário a ser autenticado
 * @param table - Nome da tabela onde buscar o usuário
 * @returns [status, result] - 200 se encontrado, 400 se não encontrado, 500 se erro de banco
 */
export let login = async (email: string, table: string): Promise<any> => {
  try {
    console.log("[QUERY] Buscando dados de login...");
    const safeTable = safeIdentifier(table);
    const result = await DB.pool.query(
      `SELECT * FROM ${safeTable} WHERE email = $1`,
      [email]
    );
    if (result.rows.length > 0) {
      return [200, result];
    } else {
      return [400, { message: "Dados invalidos" }];
    }
  } catch (error) {
    console.error("[QUERY] Failed");
    return [500, String(error)];
  }
};

/**
 * changePass
 * Atualiza a senha de um usuário na tabela fornecida.
 * @param email - Email do usuário
 * @param newPass - Nova senha a ser aplicada
 * @param id - ID do usuário
 * @param table - Tabela onde atualizar
 * @returns [status, result] - 200 se sucesso, 500 se erro
 */
export let changePass = async (
  email: string,
  newPass: string,
  id: string,
  table: string
): Promise<any> => {
  console.log("[QUERY]Trocando senha");
  try {
    const safeTable = safeIdentifier(table);
    const query = `UPDATE ${safeTable} SET senha = $1 WHERE email = $2 AND id = $3 RETURNING *`;
    const values = [newPass, email, id];
    const result = await DB.pool.query(query, values);
    return [200, result];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * getAcess
 * Consulta os dados de acessibilidade de uma empresa
 * @param id - ID da empresa
 * @returns [status, result] - 200 com dados se sucesso, 400 se não encontrado, 500 se erro
 */
export let getAcess = async (id: string): Promise<any> => {
  console.log("[QUERY] Buscando dados de acesso...");
  try {
    const safeTable = safeIdentifier("tb_empresa");
    const result = await DB.pool.query(
      `SELECT acessibilidade FROM ${safeTable} WHERE id = $1`,
      [id]
    );
    if (result.rows.length > 0) {
      return [200, result.rows];
    } else {
      return [400, { message: "Dados invalidos" }];
    }
  } catch (error) {
    console.error("[QUERY] Failed");
    return [500, String(error)];
  }
};

/**
 * updateVaga
 * Atualiza os campos de uma vaga na tabela especificada.
 * @param table - Nome da tabela
 * @param id - ID da vaga
 * @param sets - String contendo os campos a atualizar (ex: 'nome=$1, descricao=$2')
 * @param values - Array contendo os valores a serem aplicados
 * @returns [status, result] - 200 se sucesso, 500 se erro
 */
export let updateVaga = async (
  table: string,
  id: String,
  sets: string,
  values: any[]
): Promise<any> => {
  try {
    const safeTable = safeIdentifier(table);
    const columns = extractColumnsFromSets(sets);
    validateColumnsForTable(safeTable, columns);
    
    const normalizedSets = columns.map((col, idx) => `${col} = $${idx + 1}`).join(", ");
    const query = `UPDATE ${safeTable} SET ${normalizedSets} WHERE id = $${values.length + 1}`;
    values.push(id);

    const result = await DB.pool.query(query, values);

    console.log(`[QUERY] Success`);
    return [200, result];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

/**
 * createBarreira
 * Cria uma nova barreira no sistema.
 * @param id - ID da barreira
 * @param desc - Descrição da barreira
 * @param hora - Timestamp da criação/atualização
 * @returns [status, message] - 201 se sucesso, 500 se erro
 */
export let createBarreira = async (
  id: string,
  desc: string,
  hora: Date
): Promise<any> => {
  console.log("[QUERY]");

  try {
    const safeTable = safeIdentifier("tb_barreira");
    const query = `INSERT INTO ${safeTable} (id, descricao, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    const result = await DB.pool.query(query, [id, desc, hora, hora]);

    console.log(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

/**
 * createAcess
 * Cria uma nova acessibilidade no sistema.
 * @param id - ID da acessibilidade
 * @param desc - Descrição da acessibilidade
 * @param hora - Timestamp da criação/atualização
 */
export let createAcess = async (
  id: string,
  desc: string,
  hora: Date
): Promise<any> => {
  console.log("[QUERY]");

  try {
    const safeTable = safeIdentifier("tb_acessibilidade");
    const query = `INSERT INTO ${safeTable} (id, descricao, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    const result = await DB.pool.query(query, [id, desc, hora, hora]);

    console.log(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

/**
 * createSubTipo
 * Cria um novo subtipo de deficiência e relaciona com barreira e acessibilidade.
 * @param id - ID do subtipo
 * @param desc - Nome/descrição do subtipo
 * @param hora - Timestamp da criação/atualização
 * @param tipo - ID do tipo de deficiência
 * @param barreira - ID da barreira
 * @param acessibilidade - ID da acessibilidade
 */
export let createSubTipo = async (
  id: string,
  desc: string,
  hora: Date,
  tipo: string,
  barreira: string,
  acessibilidade: string
) => {
  console.log("[QUERY]");

  try {
    // Inserção do subtipo
    const safeTable1 = safeIdentifier("tb_sub_tipo_deficiencia");
    const insertSubTipo = `INSERT INTO ${safeTable1} (id, nome, tipo_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5);`;
    const resultSubTipo = await DB.pool.query(insertSubTipo, [
      id,
      desc,
      tipo,
      hora,
      hora,
    ]);
    if (resultSubTipo.rowCount === 0) {
      return [400, String(`Erro ao inserir sub-tipo de deficiência.`)];
    }

    // Relacionamento com barreira
    const safeTable2 = safeIdentifier("tb_sub_tipo_barreira");
    const insertSubBarr = `INSERT INTO ${safeTable2} (sub_tipo_id, barreira_id) VALUES ($1, $2);`;
    const resultSubBarr = await DB.pool.query(insertSubBarr, [id, barreira]);
    if (resultSubBarr.rowCount === 0) {
      return [
        400,
        String(`Erro ao relacionar sub-tipo de deficiência com barreira.`),
      ];
    }

    // Relacionamento barreira <-> acessibilidade
    const safeTable3 = safeIdentifier("tb_barreira_acessibilidade");
    const insertBarrAces = `INSERT INTO ${safeTable3} (barreira_id, acessibilidade_id) VALUES ($1, $2);`;
    const resultBarrAces = await DB.pool.query(insertBarrAces, [
      barreira,
      acessibilidade,
    ]);
    if (resultBarrAces.rowCount === 0) {
      return [400, String(`Erro ao relacionar barreira com acessibilidade.`)];
    }

    console.log(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
  }
};
