import { Vaga } from "../class/Vaga.js";
import {validateDate} from "../validateData/validateDataVaga.js";
import * as DB from "../../repository/insertDB/queryTools.js";
export let createVaga = async (
  vaga: {
    data_fim: Date;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    acessibilidade: string;
  },
  id_empresa: string
) => {
  try {
    let newVaga = new Vaga(
      new Date("2005/09/20"),
      vaga.titulo,
      vaga.descricao,
      vaga.salario,
      vaga.localidade,
      vaga.acessibilidade
    );
    newVaga.setId(id_empresa);
    while (newVaga.id === "") {
      newVaga.setId(id_empresa);
    }
    let dateIsValid = validateDate(newVaga.data_fim)? true :new Error("Data de fim inválida");

    DB.insertVaga(
      newVaga.id,
      newVaga.data_inicio,
      newVaga.data_fim,
      newVaga.status,
      newVaga.titulo,
      newVaga.descricao,
      newVaga.salario,
      newVaga.localidade,
      newVaga.acessibilidade,
      id_empresa
    );

    return true

  } catch (error) {
    console.error("Erro ao criar vaga:", error);
    return false;
  }
};

export let registerCandidateToVaga = async (
  id_candidate: string,
  id_vaga: string
) => {
  let result = await DB.insertCandidateVaga(id_candidate, id_vaga);
  return result;
};
