import * as DB from "../../repositories/queryTools.js";

export let getVagaModel = async () => {
  try {
    let result = await DB.selectFromTable("tb_vaga");

    if (result.rows.length > 0) return result.rows;
  } catch (error) {
    console.error(`[getVagaModel] ERRO ao consultar dados:`, error);
  }
};

export let getVagaById = async (id: string) => {
  try {
    let result = await DB.selectFromIdWhere("tb_vaga", id);

    if (result.rows.length > 0) return result.rows;
  } catch (error) {
    console.error(`[getVagaById] ERRO ao consultar dados:`, error);
  }
};

export let deleteVaga = async (id: string) => {
  try {
    let result = await DB.deleteFromTable("tb_vaga", id);
    return result.rows;
  } catch (error) {
    console.error(`[deleteVaga] ERRO ao consultar dados:`, error);
  }
};