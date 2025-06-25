import { Colaborador } from "../class/colaborador.js";
import * as DB from "../insertDB/queryTools.js";

export let createColaborador = async (user: {
  name: string;
  email: string;
  senha: string;
  setor: string;
}) => {
  try {
    let colaborador = new Colaborador(
      user.name,
      user.email,
      user.senha,
      user.setor
    )
    let resut = await DB.selectIDFrom("tb_empresa", "06990590000123")

    DB.insertIntoColaborador("colaborador", colaborador, resut.rows[0].id)
    return true
  } catch (error) {
    return false
    console.error(error)
  }
};
