import * as DB from "../../repository/insertDB/queryTools.js"


export let deleteUser = async (table:string,id: number) => {
  console.log("Passando ao deleteUser()");

  let result = await DB.deleteFromTable(table, id);
  console.log("Validando Dados");

  if (result.rowCount > 0) {
    return result;
  } else {
    return false;
  }
}