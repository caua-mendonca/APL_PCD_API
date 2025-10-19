import * as DB from "../../config/connect.js";
import { safeIdentifier, validateColumnsForTable, extractColumnsFromSets } from "../shared/security.js";
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
    console.log(`[POST / QUERY] insertIntoCandidate -> iniciando inserção em ${table}`);

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

    console.log(`[POST / QUERY] insertIntoCandidate -> success`);
    return [201, String(process.env.STATUS_201)];
  } catch (error: any) {
    console.error(`[POST / QUERY] insertIntoCandidate -> failed:`, error?.message ?? error);
    return [500, String(error)];
  }
};

export const insertCandidateJob = async (
  id_candidate: string,
  id_vaga: string,
  hora: Date
): Promise<any> => {
  console.log("[QUERY] Inserindo candidato na vaga...");
  try {
    const safeTable = safeIdentifier("tb_candidato_vaga");
    const query = `INSERT INTO ${safeTable} (tb_vaga_id, tb_candidato_id, hora_candidatura) VALUES ($1, $2, $3);`;
    await DB.pool.query(query, [id_vaga, id_candidate, hora]);

    return [200, String(process.env.STATUS_200)];
  } catch (error) {
    return [500, String(error)];
  }
};