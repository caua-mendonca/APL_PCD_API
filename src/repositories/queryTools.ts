import * as DB from "../config/connect.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

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
  try {
    console.log(`[POST / QUERY] inserindo ${user.id}`);

    await DB.pool.query(
      `INSERT INTO tb_candidato (
        id, nome, email, senha, telefone, cpf, data_nascimento, status, deficiencia, tipo_deficiencia, barreira, acessibilidade
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12
      )`,
      [
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
      ]
    );
    console.log(`[POST / QUERY] Success`);

    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[POST / QUERY] Failed`);
    return [400, String(Error)];
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
}) => {
  console.log("[QUERY] Inserindo contratante");
  try {
    await DB.pool.query(
      `INSERT INTO tb_empresa (
        id, nome_fantasia, razao_social, email, senha, cnpj, telefone, status, acessibilidade
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )`,
      [
        user.id,
        user.nome_fantasia,
        user.razao_social,
        user.email,
        user.senha,
        user.cnpj,
        user.telefone,
        user.status,
        user.acessibilidade,
      ]
    );

    console.log(`[POST / QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[POST / QUERY] Failed`);
    return [400, String(Error)];
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
export const selectId = async (table: string, id: string) => {
  try {
    console.log(`[selectId] Validando ID ${id} na tabela ${table}`);
    const query = `SELECT id FROM ${table} WHERE id = $1;`;
    const result = await DB.pool.query(query, [id]);
    console.log(`[selectId] Resultado da validação:`, result.rows);
    return result.rows.length > 0;
  } catch (error) {
    console.error(
      `[selectId] ERRO ao validar ID ${id} na tabela ${table}:`,
      error
    );
    throw error;
  }
};

/**
 * Insere um registro na tabela tb_ifbr.
 * @param id ID do domínio IFBR.
 * @param name Nome do domínio.
 * @param data Data da resposta.
 * @param score Pontuação do domínio.
 * @param id_tupla ID da tupla IFBR para vinculação.
 */
export let insertIntoIFBR = async (
  id: number,
  name: string,
  data: Date,
  score: number,
  id_tupla: string
) => {
  try {
    console.log(
      `[insertIntoIFBR] Inserindo domínio IFBR ${name} (${id}) para tupla ${id_tupla}`
    );

    await DB.pool.query(
      `INSERT INTO tb_ifbr (id_dominio, nome, data_resposta, score, id_ifbr) VALUES ($1, $2, $3, $4, $5);`,
      [id, name, data, score, id_tupla]
    );

    console.log(`[insertIntoIFBR] Domínio IFBR ${name} inserido com sucesso`);
  } catch (error) {
    console.error(
      `[insertIntoIFBR] ERRO ao inserir domínio IFBR ${name}:`,
      error
    );
    throw error;
  }
};

/**
 * Atualiza o campo id_ifbr no candidato.
 * @param id ID do candidato.
 * @param id_ifbr ID IFBR para atualização.
 */
export let updateIfbrCandidato = async (id: string, id_ifbr: string) => {
  try {
    console.log(
      `[updateIfbrCandidato] Atualizando id_ifbr do candidato ${id} para ${id_ifbr}`
    );

    await DB.pool.query(`UPDATE tb_candidato SET id_ifbr = $1 WHERE id = $2;`, [
      id_ifbr,
      id,
    ]);

    console.log(
      `[updateIfbrCandidato] Atualização realizada com sucesso para candidato ${id}`
    );
  } catch (error) {
    console.error(
      `[updateIfbrCandidato] ERRO ao atualizar id_ifbr do candidato ${id}:`,
      error
    );
    throw error;
  }
};

/**
 * Insere os dados cruzados entre candidato e IFBR na tabela tb_candidato_ifbr.
 * Executa SELECT com JOIN para garantir dados consistentes.
 */
export const insertCandidatoIFBRData = async () => {
  const sql = `
    INSERT INTO tb_candidato_ifbr (
      tb_candidato_cpf,
      tb_candidato_id,
      tb_ifbr_id_dominio,
      tb_ifbr_score,
      tb_ifbr_id_ifbr
    )
    SELECT 
      c.cpf,
      c.id,
      i.id_dominio,
      i.score,
      c.id_ifbr
    FROM tb_candidato c
    JOIN tb_ifbr i
      ON c.id_ifbr = i.id_ifbr
    ON CONFLICT DO NOTHING;
  `;

  try {
    console.log(
      `[insertCandidatoIFBRData] Iniciando inserção cruzada na tb_candidato_ifbr`
    );

    await DB.pool.query(sql);

    console.log(
      `[insertCandidatoIFBRData] Inserção cruzada concluída com sucesso!`
    );
  } catch (error) {
    console.error(
      `[insertCandidatoIFBRData] ERRO ao inserir dados na tb_candidato_ifbr:`,
      error
    );
    throw error;
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
) => {
  try {
    console.log(`[insertIntoColaborador] Inserindo colaborador ${id}`);

    await DB.pool.query(
      `INSERT INTO tb_colaborador (
        id_colaborador, nome, setor, email, senha
      ) VALUES (
        $1, $2, $3, $4, $5
      )`,
      [id, name, setor, email, senha]
    );

    console.log(
      `[insertIntoColaborador] Colaborador ${id} inserido com sucesso!`
    );
  } catch (error) {
    console.error(
      `[insertIntoColaborador] ERRO ao inserir colaborador ${id}:`,
      error
    );
    throw error;
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
): Promise<[number, any]> => {
  console.log("[QUERY] Inserindo relação colaborador-empresa...");
  try {
    const empresa = await DB.pool.query(
      `SELECT cnpj, razao_social FROM tb_empresa WHERE id = $1`,
      [id_empresa]
    );

    if (empresa.rowCount === 0) {
      throw new Error(`Empresa ${id_empresa} não encontrada`);
    }

    // Insere a relação ignorando conflitos (duplicates)
    const sql = `
      INSERT INTO tb_empresa_colaborador (
        tb_empresa_id,
        tb_colaborador_id_colaborador
      )
      VALUES ($1, $2)
      ON CONFLICT DO NOTHING;
    `;

    let result = await DB.pool.query(sql, [id_empresa, id_colaborador]);

    console.log(`[POST / QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.error(`[POST / QUERY] Failed`);
    return [500, error];
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
) => {
  try {
    console.log(
      `[updateColaboradorEmpresa] Atualizando colaborador ${id} na empresa ${id_empresa}`
    );

    await DB.pool.query(
      `UPDATE tb_empresa SET id_colaborador = $1 WHERE id = $2;`,
      [id, id_empresa]
    );

    console.log(
      `[updateColaboradorEmpresa] Atualização realizada com sucesso!`
    );
  } catch (error) {
    console.error(
      `[updateColaboradorEmpresa] ERRO ao atualizar colaborador na empresa:`,
      error
    );
    throw error;
  }
};

/**
 * Seleciona todos os registros de uma tabela.
 * @param table Nome da tabela.
 * @returns Resultado da consulta.
 */
export let selectFromTable = async (
  table: string
): Promise<[number, string[] | string]> => {
  console.log(`[GET / QUERY] resgatando tabela ${table}`);

  try {
    const query = `SELECT * FROM ${table};`;
    const result = await DB.pool.query(query);

    console.log(`[GET / QUERY] Success`);
    let response = result.rows;

    return [200, response];
  } catch (error) {
    console.log(`[GET / QUERY] Failed`);
    return [500, String(error)];
  }
};

/**
 * Seleciona um registro de uma tabela pelo ID.
 * @param table Nome da tabela.
 * @param id ID do registro.
 * @returns Resultado da consulta.
 */
export let selectFromIdWhere = async (
  table: string,
  id: string
): Promise<any> => {
  console.log(`[QUERY] Resgatando registro ID ${id} da tabela ${table}`);
  try {
    const query = `SELECT * FROM ${table} WHERE id = $1`;
    const result = await DB.pool.query(query, [id]);

    console.log(`[QUERY] Success`);

    return [200, result.rows];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
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
): Promise<any> => {
  console.log(`[QUERY] Deletando usuario ${id}`);
  try {
    let result = await DB.pool.query(
      `UPDATE ${table} SET status = $1 WHERE id = $2;`,
      [false, id]
    );
    console.log(`[QUERY] Success`);
    return [200, result];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
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
  id: String,
  sets: string,
  values: any[]
): Promise<any> => {
  console.log(`[QUERY] Atulizando usuario ${id}`);
  try {
    const query = `UPDATE ${table} SET ${sets} WHERE id = $${
      values.length + 1
    }`;
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
  id_creator: string
): Promise<boolean> => {
  try {
    console.log(
      `[insertVaga] Iniciando inserção da vaga ID: ${id}, criada por: ${id_creator}`
    );

    const query = `
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
        id_creator
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
      )
    `;

    await DB.pool.query(query, [
      id,
      data_inicio,
      data_fim,
      status_vaga,
      titulo,
      descricao,
      salario,
      localidade,
      acess,
      id_creator,
    ]);

    console.log(`[insertVaga] Vaga ${id} inserida com sucesso!`);
    return true;
  } catch (error) {
    console.error(`[insertVaga] ERRO ao inserir vaga ${id}:`, error);
    return false;
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
) => {
  console.log("[QUERY] Inserindo relação vaga-empresa...");
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

    let result = await DB.pool.query(query, [
      id_empresa,
      id,
      status,
      data_fim,
      data_inicio,
    ]);

    console.log(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    console.log(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

/**
 * Busca o ID da empresa associada a um colaborador específico.
 * @param id_colaborador ID do colaborador.
 * @returns ID da empresa vinculada ao colaborador.
 */
export let getEmpByColab = async (id_colaborador: string) => {
  try {
    console.log(
      `[getEmpByColab] Buscando empresa para colaborador ${id_colaborador}`
    );

    const query = `SELECT tb_empresa_id FROM tb_empresa_colaborador WHERE tb_colaborador_id_colaborador = $1;`;
    const result = await DB.pool.query(query, [id_colaborador]);

    if (result.rowCount === 0) {
      throw new Error(
        `Nenhuma empresa encontrada para colaborador ${id_colaborador}`
      );
    }

    const emp = result.rows[0].tb_empresa_id;
    console.log(
      `[getEmpByColab] Empresa encontrada para colaborador ${id_colaborador}: ${emp}`
    );

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
  id_vaga: string,
  id_candidate: string
): Promise<any> => {
  console.log("[QUERY] Inserindo candidato na vaga...");
  try {
    const query = `INSERT INTO tb_candidato_vaga (tb_vaga_id, tb_candidato_id) VALUES ($1, $2);`;
    await DB.pool.query(query, [id_vaga, id_candidate]);

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
    console.log(
      `[validateData] Verificando existência do valor '${value}' na coluna '${data}' da tabela '${table}'.`
    );

    let result = await DB.pool.query(
      `SELECT ${data} FROM ${table} WHERE ${data} = $1`,
      [value]
    );

    console.log(
      `[validateData] Validação concluída. Registros encontrados: ${result.rows.length}`
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

    const query = `
      INSERT INTO tb_evento (
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
    const query = `SELECT * FROM tb_evento WHERE id_calendario = $1;`;
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
  try {
    console.log(`📥 [insertCalendario] Iniciando inserção de calendário...`, {
      calendarioId: id_calendar,
      empresaId: id_empresa,
      nomeCalendario: nome,
    });

    const query = `
      INSERT INTO tb_calendario (id, nome_calendario, id_empresa) VALUES ($1, $2, $3);
    `;
    await DB.pool.query(query, [id_calendar, nome, id_empresa]);

    console.log(`✅ [insertCalendario] Calendário inserido com sucesso.`, {
      calendarioId: id_calendar,
      empresaId: id_empresa,
    });

    return true;
  } catch (error) {
    console.error(`❌ [insertCalendario] Erro ao inserir calendário.`, {
      calendarioId: id_calendar,
      empresaId: id_empresa,
      error,
    });
    throw error;
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
    console.log(
      `📥 [selectEmpbyCalendar] Buscando empresa vinculada ao calendário...`,
      { calendarioId: id_empresa }
    );

    const query = `SELECT id_empresa FROM tb_calendario WHERE id = $1;`;
    const result = await DB.pool.query(query, [id_empresa]);

    console.log(`✅ [selectEmpbyCalendar] Consulta concluída.`, {
      calendarioId: id_empresa,
      registrosEncontrados: result.rows.length,
    });
    return result.rows;
  } catch (error) {
    console.error(
      `❌ [selectEmpbyCalendar] Erro ao buscar empresa vinculada ao calendário.`,
      { calendarioId: id_empresa, error }
    );
    throw error;
  }
};
