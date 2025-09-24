import * as DB from "../../repositories/queryTools.js";

/**
 * Verifica no banco de dados se um determinado e-mail já está cadastrado.
 * 
 * Utilizado para evitar duplicidade no cadastro de usuários.
 * 
 * @param value - Valor do e-mail a ser verificado.
 * @param data - Nome da coluna na tabela onde será feita a busca.
 * @param table - Nome da tabela onde será realizada a consulta.
 * @returns Promise<boolean> - true se o e-mail NÃO existe (válido para cadastro), false caso contrário.
 */
export let validateEmailToDB = async (value: string, data: string, table: string): Promise<boolean> => {
  let result: any = Number(await DB.validateData(value, data, table));
  result > 0 ? result = false : result = true;

  console.log("RESULTADO DA FUNÇÃO validateEmailToDB:");

  return result;
};
