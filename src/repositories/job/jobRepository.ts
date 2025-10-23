import * as DB from "../../config/connect.js";
import {
  safeIdentifier,
  validateColumnsForTable,
  extractColumnsFromSets,
} from "../shared/security.js";
import { logger } from "../../utils/logger.js";

import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

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

    logger.info(`[${func}] Vaga ${id} inserida com sucesso`);
    return [201, { success: true, message: "Vaga inserida", data: { id } }];
  } catch (err: any) {
    logger.error(`[${func}] Error ao inserir vaga ${id}:`, err?.message ?? err);
    return [
      500,
      { success: false, message: "Erro ao inserir vaga", data: null },
    ];
  }
};

export const insertEmpVaga = async (
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

    logger.info(
      `[${func}] Relação vaga-empresa inserida (empresa=${id_empresa}, vaga=${id})`
    );
    return [
      201,
      {
        success: true,
        message: "Relação vaga-empresa criada",
        data: { rowCount: result.rowCount },
      },
    ];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err?.message ?? err);
    return [
      500,
      {
        success: false,
        message: "Erro ao inserir relação vaga-empresa",
        data: null,
      },
    ];
  }
};

export const updateVaga = async (
  table: string,
  id: String,
  sets: string,
  values: any[]
): Promise<any> => {
  try {
    const safeTable = safeIdentifier(table);
    const columns = extractColumnsFromSets(sets);
    validateColumnsForTable(safeTable, columns);

    const normalizedSets = columns
      .map((col, idx) => `${col} = $${idx + 1}`)
      .join(", ");
    const query = `UPDATE ${safeTable} SET ${normalizedSets} WHERE id = $${
      values.length + 1
    }`;
    values.push(id);

    const result = await DB.pool.query(query, values);

    logger.info(`[QUERY] Success`);
    return [200, result];
  } catch (error) {
    logger.info(`[QUERY] Failed`);
    return [500, String(error)];
  }
};

export const getJobsByCompany = async (
  table: string
): Promise<[number, any]> => {
  logger.info(`[selectFromTable] Executando SELECT ALL em ${table}`);

  try {
    const safeTable = safeIdentifier(table);
    const query = `
    
    SELECT v.*, e.nome_fantasia
FROM tb_vaga v
LEFT JOIN tb_empresa e ON v.id_creator = e.id;

  `;
    const result = await DB.pool.query(query);

    logger.info(`[selectFromTable] Success (${result.rowCount} registros)`);
    return [200, result.rows];
  } catch (error: any) {
    logger.error(`[selectFromTable] Failed:`, error?.message ?? error);
    return [500, String(error)];
  }
};

export const updateJob = async (
  table: string,
  id: string,
  sets: string,
  values: any[]
): Promise<[number, any]> => {
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
    return [200, result];
  } catch (err: any) {
    logger.error(`[${func}] Error:`, err);
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
