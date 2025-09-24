import * as DB from "../../config/connect.js";
import { safeIdentifier } from "../shared/security.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

export const insertIntoEventos = async (
  evento: {
    id: string;
    titulo: string;
    descricao: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    id_candidato: string;
  },
  id_calendario: string
) => {
  console.log("[QUERY] Inserindo evento...]");
  try {
    const { id, titulo, descricao, data, hora_inicio, hora_fim, id_candidato } =
      evento;

    const safeTable = safeIdentifier("tb_evento");
    const query = `
      INSERT INTO ${safeTable} (
        id,
        nome,
        descricao,
        data_evento,
        hora_ini,
        hora_fim,
        id_candidato, 
        id_calendario,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);
    `;

    await DB.pool.query(query, [
      id,
      titulo,
      descricao,
      data,
      hora_inicio,
      hora_fim,
      id_candidato,
      id_calendario,
      true,
    ]);

    console.log(`[QUERY] Success`);

    return [200, String(process.env.STATUS_200)];
  } catch (error) {
    console.error("[QUERY] Failed");
    return [500, String(process.env.STATUS_500)];
  }
};

export const getEventosByCalendario = async (
  id_calendario: string
): Promise<any> => {
  console.log("[QUERY] Buscando eventos...");
  try {
    const safeTable = safeIdentifier("tb_evento");
    const query = `SELECT * FROM ${safeTable} WHERE id_calendario = $1;`;
    const result = await DB.pool.query(query, [id_calendario]);

    return [200, result.rows];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};