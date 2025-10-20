import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
import {logger} from "../../utils/logger.js";
dotenv.config({ path: ".env.status" });

export const insertEmployee = async (
  id: string,
  name: string,
  email: string,
  senha: string,
  setor: string
): Promise<[number, string]> => {
  try {
    const safeTable = safeIdentifier("tb_colaborador");
    logger.debug(safeTable)
    const sql = `
      INSERT INTO ${safeTable} (
        id, nome, setor, email, senha
      ) VALUES ($1, $2, $3, $4, $5);
    `;

    await DB.pool.query(sql, [id, name, setor, email, senha]);

    logger.info(`[insertIntoColaborador] Inserção realizada com sucesso (colaborador=${id})`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    logger.error(`[insertIntoColaborador] ERRO ao inserir colaborador ${id}:`, error);
    return [500, String(error)];
  }
};

export const insertCompanyEmployee = async (
  id_colaborador: string,
  id_empresa: string
): Promise<[number, string]> => {
  logger.info("[insertEmpresaColaborador] Inserindo relação colaborador-empresa...");
  try {
    const safeTable1 = safeIdentifier("tb_empresa");
    const empresa = await DB.pool.query(
      `SELECT cnpj, razao_social FROM ${safeTable1} WHERE id = $1`,
      [id_empresa]
    );

    if (empresa.rowCount === 0) {
      logger.warn(`[insertEmpresaColaborador] Empresa ${id_empresa} não encontrada`);
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

    logger.info(`[insertEmpresaColaborador] Relação criada com sucesso (empresa=${id_empresa}, colaborador=${id_colaborador})`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    logger.error(`[insertEmpresaColaborador] ERRO ao inserir relação:`, error?.message ?? error);
    return [500, String(error)];
  }
};

export const updateEmployeeCompany = async (
  id: string,
  id_empresa: string
): Promise<[number, string]> => {
  try {
    const safeTable = safeIdentifier("tb_empresa");
    const sql = `UPDATE ${safeTable} SET id_colaborador = $1 WHERE id = $2;`;
    await DB.pool.query(sql, [id, id_empresa]);

    logger.info(`[updateColaboradorEmpresa] Atualização realizada com sucesso (empresa=${id_empresa}, colaborador=${id})`);
    return [200, String(process.env.STATUS_200 ?? "OK")];
  } catch (error: any) {
    logger.error(`[updateColaboradorEmpresa] ERRO ao atualizar colaborador na empresa:`, error?.message ?? error);
    return [500, String(error)];
  }
};

export const getCompanyByEmployee = async (employee_id: string) => {
  try {
    const safeTable = safeIdentifier("tb_empresa_colaborador");
    // const query = `SELECT * FROM ${safeTable} WHERE tb_colaborador_id_colaborador = $1;`;
    const query = `SELECT * FROM ${safeTable} WHERE tb_colaborador.id= $1;`;
    const result = await DB.pool.query(query, [employee_id]);

    if (result.rowCount === 0) {
      throw new Error(`No company found for employee ${employee_id}`);
    }

    return result.rows[0].tb_empresa_id;
  } catch (error) {
    logger.error(
      `[getCompanyByEmployee] ERROR searching company for employee ${employee_id}:`,
      error
    );
    return error;
  }
};

export const getEmployee = async (company_id: string): Promise<[number, any]> => {
  logger.info("[getColaboradoresPorEmpresa] Buscando colaboradores da empresa...");
  try {
    const safeTable = safeIdentifier("tb_colaborador");
    const query = `SELECT * FROM ${safeTable} WHERE tb_colaborador.id = $1;`;
    const result = await DB.pool.query(query, [company_id]);

    if (result.rowCount === 0) {
      return [404, String(process.env.STATUS_404 ?? "Not Found")];
    }

    return [200, result.rows];
  } catch (error: any) {
    logger.error(`[getColaboradoresPorEmpresa] ERRO ao buscar colaboradores da empresa ${company_id}:`, error);
    return [500, String(error)];
  }
};
