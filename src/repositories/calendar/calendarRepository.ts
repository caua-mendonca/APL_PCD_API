import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import {logger} from "../../utils/logger.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const insertCalendario = async (
  id_calendar: string,
  nome: string,
  id_empresa: string
): Promise<any> => {
  logger.info("[QUERY] Inserindo calendário...");
  try {
    const safeTable = safeIdentifier("tb_calendario");
    const query = `
      INSERT INTO ${safeTable} (id, nome_calendario, id_empresa) VALUES ($1, $2, $3);
    `;
    let result = await DB.pool.query(query, [id_calendar, nome, id_empresa]);

    logger.info(`[QUERY] Success`);
    return [201, result];
  } catch (error) {
    logger.error("[QUERY] Failed");
    return [500, String(error)];
  }
};

export const selectEmpbyCalendar = async (id_empresa: string): Promise<any> => {
  try {
    const safeTable = safeIdentifier("tb_calendario");
    const query = `SELECT id_empresa FROM ${safeTable} WHERE id = $1;`;
    const result = await DB.pool.query(query, [id_empresa]);

    return result.rows;
  } catch (error) {
    logger.error(
      `❌ [selectEmpbyCalendar] Erro ao buscar empresa vinculada ao calendário.`,
      { calendarioId: id_empresa, error }
    );
    throw error;
  }
};