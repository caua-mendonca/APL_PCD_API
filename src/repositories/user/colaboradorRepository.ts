import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const insertIntoColaborador = async (
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

export const insertEmpresaColaborador = async (
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

export const updateColaboradorEmpresa = async (
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

export const getEmpByColab = async (id_colaborador: string) => {
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