import * as DB from "../../config/connect.js";
import {
  safeIdentifier,
  validateColumnsForTable,
  extractColumnsFromSets,
  ALLOWED_COLUMNS,
} from "./security.js";

import { logger } from "../../utils/logger.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const selectId = async (table: string, id: string): Promise<boolean> => {
  try {
    const safeTable = safeIdentifier(table);
    const query = `SELECT id FROM ${safeTable} WHERE id = $1;`;
    const result = await DB.pool.query(query, [id]);
    return result.rows.length > 0;
  } catch (error: any) {
    logger.error(
      `[selectId] ERRO ao validar ID ${id} na tabela ${table}:`,
      error?.message ?? error
    );
    throw new Error("Erro ao validar ID");
  }
};

export const selectFromTable = async (
  table: string
): Promise<[number, any]> => {
  logger.info(`[selectFromTable] Executando SELECT ALL em ${table}`);

  try {
    const safeTable = safeIdentifier(table);
    const query = `SELECT * FROM ${safeTable};`;
    const result = await DB.pool.query(query);

    logger.info(`[selectFromTable] Success (${result.rowCount} registros)`);
    return [200, result.rows];
  } catch (error: any) {
    logger.error(`[selectFromTable] Failed:`, error?.message ?? error);
    return [500, String(error)];
  }
};

export const selectFromNameWhere = async (
  table: string,
  name: string
): Promise<[number, any]> => {
  logger.info(
    `[selectFromNameWhere] Executando SELECT WHERE nome=... em ${table}`
  );
  try {
    const safeTable = safeIdentifier(table);
    const query = `SELECT * FROM ${safeTable} WHERE nome = $1;`;
    const result = await DB.pool.query(query, [name]);

    logger.info(`[selectFromNameWhere] Success (${result.rowCount} registros)`);
    return [200, result.rows];
  } catch (error: any) {
    logger.error(`[selectFromNameWhere] Failed:`, error?.message ?? error);
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
    const sql = `SELECT * FROM ${safeTable} WHERE ${safeTable}.id = $1;`;
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

export const deleteFromTable = async (
  table: string,
  id: string
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "deleteFromTable";
  try {
    const safeTable = safeIdentifier(table);
    const sql = `UPDATE ${safeTable} SET status = $1 WHERE id = $2;`;
    const result = await DB.pool.query(sql, [false, id]);

    logger.info(
      `[${func}] Success (table=${safeTable}, id=${id}, rowCount=${result.rowCount})`
    );
    return [
      200,
      {
        success: true,
        message: "Registro marcado como inativo (delete lógico)",
        data: { rowCount: result.rowCount },
      },
    ];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err?.message ?? err);
    return [
      500,
      { success: false, message: "Erro ao executar delete lógico", data: null },
    ];
  }
};

export const updateUserColumn = async (
  table: string,
  id: string,
  sets: string,
  values: any[]
): Promise<[number, { success: boolean; message: string; data: any }]> => {
  const func = "updateUserColumn";
  try {
    const safeTable = safeIdentifier(table);

    const columns = extractColumnsFromSets(sets);
    validateColumnsForTable(safeTable, columns);

    if (columns.length !== values.length) {
      throw new Error(
        `Quantidade de valores (${values.length}) não corresponde ao número de colunas (${columns.length}).`
      );
    }

    const normalizedSets = columns
      .map((col, idx) => `${col} = $${idx + 1}`)
      .join(", ");
    const finalQuery = `UPDATE ${safeTable} SET ${normalizedSets} WHERE id = $${
      values.length + 1
    };`;
    const finalValues = [...values, id];

    const result = await DB.pool.query(finalQuery, finalValues);

    logger.info(
      `[${func}] Success (table=${safeTable}, id=${id}, updated=${result.rowCount})`
    );
    return [
      200,
      {
        success: true,
        message: "Registro atualizado com sucesso",
        data: { rowCount: result.rowCount },
      },
    ];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err?.message ?? err);
    if (
      err.message &&
      /não corresponde|inválido|não autorizada|formato inválido/i.test(
        err.message
      )
    ) {
      return [400, { success: false, message: err.message, data: null }];
    }
    return [
      500,
      { success: false, message: "Erro ao executar atualização", data: null },
    ];
  }
};

export const validateData = async (
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
    logger.error(
      `[validateData] ERRO ao validar dados na tabela ${table}, coluna ${data}:`,
      error
    );
    return false;
  }
};

export const login = async (email: string, table: string): Promise<any> => {
  try {
    logger.info("[QUERY] Buscando dados de login...");
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
    logger.error("[QUERY] Failed");
    return [500, String(error)];
  }
};

export const changePass = async (
  email: string,
  newPass: string,
  id: string,
  table: string
): Promise<any> => {
  logger.info("[QUERY]Trocando senha");
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
