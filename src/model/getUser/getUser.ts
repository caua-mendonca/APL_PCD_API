import * as DB from "../../repository/insertDB/queryTools.js";

export let getUser = async (table: string): Promise<any> => {
  let result = await DB.selectFromTable(table);
  console.log("Dados recolhidos do banco de dados");

  return result;
};
