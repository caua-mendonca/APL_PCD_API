import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const createBarreira = async (
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

export const createAcess = async (
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

export const createSubTipo = async (
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