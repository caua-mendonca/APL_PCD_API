import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const insertCompany = async (user: {
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
    return [500, String(error)];
  }
};

export const getAccessibility = async (id: string): Promise<any> => {
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