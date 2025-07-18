import { get } from "http";
import { createColaborador } from "../../model/colaborador/createColaborador.js";
import * as getUser from"../../model/getUser/getUser.js";

export let controllerColaborador = async (user: {
  name: string;
  email: string;
  senha: string;
  setor: string;
}, id_empresa: string) => {
  console.log("Passando ao createColaborador()")
  let response = createColaborador(user, id_empresa);

  return response
};

export let controllerGetColaborador = async (table: string, id: number) => {
  console.log("Passando ao getColaborador()")
  let response = await getUser.getColaborador(table, id);

  return response;
}
