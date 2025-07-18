import { Colaborador } from "../class/colaborador.js";
import * as DB from "../../repository/insertDB/queryTools.js";

export let createColaborador = async (user: {
  name: string;
  email: string;
  senha: string;
  setor: string;
}, id_empresa: string) => {
  let errorLog = [];
  console.log("Criando Colaborador pela classe");
  let colaborador = new Colaborador(
    user.name,
    user.email,
    user.senha,
    user.setor
  );
  try {
    colaborador.setId();
    while (colaborador.id == "") {
      await colaborador.setId();
    }

    DB.insertIntoColaborador(colaborador.id, colaborador.name, colaborador.email, colaborador.senha, colaborador.setor);
    DB.updateColaboradorEmpresa(colaborador.id, id_empresa);
    DB.insertEmpresaColaborador(colaborador.id, id_empresa);
    return true;
  } catch (error) {
    console.log("Dados Invalidos");
    return false;
  }
};
