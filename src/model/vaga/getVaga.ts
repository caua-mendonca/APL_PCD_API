import * as DB from "../../repositories/queryTools.js";

export let getVagaModel = async () => {
  try {
    let result = await DB.selectFromTable("tb_vaga");

    if (result.rows.length > 0) return result.rows;
  } catch (error) {
    console.error(`[getVagaModel] ERRO ao consultar dados:`, error);
  }
};
