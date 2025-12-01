import * as DB from "../../config/connect.js";
import {
  safeIdentifier,
  validateColumnsForTable,
  extractColumnsFromSets,
} from "../shared/security.js";
import { logger } from "../../utils/logger.js";
import { updateCache } from "../../utils/redisClient.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const insertCandidate = async (user: {
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
    logger.info(
      `[POST / QUERY] insertIntoCandidate -> iniciando inserção em ${table}`
    );

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

    logger.info(`[POST / QUERY] insertIntoCandidate -> success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    logger.error(`[POST / QUERY] insertIntoCandidate -> failed:`, error);
    return [500, String(error)];
  }
};

export const insertCandidateJob = async (
  id_candidate: string,
  id_vaga: string,
  hora: Date
): Promise<any> => {
  logger.info("[QUERY] Inserindo candidato na vaga...");
  try {
    const safeTable = safeIdentifier("tb_candidato_vaga");
    const query = `INSERT INTO ${safeTable} (tb_vaga_id, tb_candidato_id, hora_candidatura) VALUES ($1, $2, $3);`;
    await DB.pool.query(query, [id_vaga, id_candidate, hora]);

    return [200, String(process.env.STATUS_200)];
  } catch (error) {
    return [500, String(error)];
  }
};

export const selectFromIdWhere = async (
  table: string,
  id: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "selectFromIdWhere";
  try {
    const safeTable = safeIdentifier(table);
    const sql = `SELECT * FROM ${safeTable} WHERE tb_candidato_id = $1;`;
    const result = await DB.pool.query(sql, [id]);

    logger.info(
      `[${func}] Success: ${result.rowCount} rows (table=${safeTable}, tb_candidato_id=${id})`
    );
    return [
      200,
      { success: true, message: "Registros encontrados", data: result.rows },
    ];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err);
    return [
      500,
      { success: false, message: "Erro ao executar consulta", data: null },
    ];
  }
};

export let selectFromEmailWhere = async (
  table: string,
  email: string
): Promise<any> => {
  logger.info("[GET / MODEL Candidato Email]");
  try {
    const safeTable = safeIdentifier(table);
    const sql = `SELECT * FROM ${safeTable} WHERE email = $1;`;
    const result = await DB.pool.query(sql, [email]);

    logger.info(
      `[GET / MODEL Candidato Email] Success: ${result.rowCount} rows (table=${safeTable}, email=${email})`
    );
    return [
      200,
      { success: true, message: "Registros encontrados", data: result.rows },
    ];
  } catch (error) {
    return [500, String(error)];
  }
};

export const selectJobFromID = async (
  table: string,
  id: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "selectJobFromID";
  try {
    const safeTable = safeIdentifier(table);
    const sql = `SELECT *
    FROM tb_vaga v
    INNER JOIN tb_candidato_vaga cv
    ON v.id = cv.tb_vaga_id
    INNER JOIN tb_candidato c
    ON c.id = cv.tb_candidato_id
    WHERE c.id = $1;`;
    const result = await DB.pool.query(sql, [id]);

    logger.info(
      `[${func}] Success: ${result.rowCount} rows (table=${safeTable}, tb_candidato_id=${id})`
    );
    await updateCache(
      `candidate_jobs_${id}`,
      JSON.stringify(result.rows),
      3600
    );
    return [
      200,
      { success: true, message: "Registros encontrados", data: result.rows },
    ];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err);
    return [
      500,
      { success: false, message: "Erro ao executar consulta", data: null },
    ];
  }
};
