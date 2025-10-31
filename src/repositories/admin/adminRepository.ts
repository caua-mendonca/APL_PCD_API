import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
import { logger } from "../../utils/logger.js";

dotenv.config({ path: ".env.status" });

export const createBarreira = async (
  id: string,
  desc: string,
  hora: Date
): Promise<any> => {
  logger.info("[QUERY]");

  try {
    const safeTable = safeIdentifier("tb_barreira");
    const query = `INSERT INTO ${safeTable} (id, descricao, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    const result = await DB.pool.query(query, [id, desc, hora, hora]);

    logger.info(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    logger.info(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

export const createAcess = async (
  id: string,
  desc: string,
  hora: Date
): Promise<any> => {
  logger.info("[QUERY]");

  try {
    const safeTable = safeIdentifier("tb_acessibilidade");
    const query = `INSERT INTO ${safeTable} (id, descricao, created_at, updated_at) VALUES ($1, $2, $3, $4);`;
    const result = await DB.pool.query(query, [id, desc, hora, hora]);

    logger.info(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    logger.info(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

export const createSubTipo = async (
  id: string,
  desc: string,
  hora: Date,
  tipo: string,
  barreira: string,
  acessibilidade: string
) => {
  logger.info("[QUERY]");

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

    logger.info(`[QUERY] Success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error) {
    logger.info(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

export let getAnalyticData = async (): Promise<any> => {
  logger.info("[QUERY]");

  try {
    const query = `SELECT 
    d.nome AS "tipo_deficiencia",
    d.id AS "id_deficiencia",
    s.nome AS "subtipo_deficiencia",
    s.id AS "id_subtipo_deficiencia",
    b.descricao AS "descricao_barreira",
    b.id AS "id_barreira",
    a.descricao AS "descricao_acessibilidade",
    a.id AS "id_acessibilidade"
    FROM tb_tipo_deficiencia d
    JOIN tb_sub_tipo_deficiencia s ON d.id = s.tipo_id
    JOIN tb_sub_tipo_barreira sb ON s.id = sb.sub_tipo_id
    JOIN tb_barreira b ON sb.barreira_id = b.id
    JOIN tb_barreira_acessibilidade ba ON b.id = ba.barreira_id
    JOIN tb_acessibilidade a ON ba.acessibilidade_id = a.id
      ;`;
    const result = await DB.pool.query(query);

    logger.info(`[QUERY] Success`);
    return [200, result.rows];
  } catch (error) {
    logger.info(`[QUERY] Failed`);
    return [500, String(error)];
  }
};
