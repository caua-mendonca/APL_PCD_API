import { createCanditado } from "../../model/createUser/createUser.js";
import * as getUser from "../../model/getUser/getUser.js";
import {deleteUser}from "../../model/deleteUser/deleteUser.js"
import { updateUser } from "../../model/updateUser/updateUser.js";
import {registerCandidateToVaga} from "../../model/vaga/postVaga.js";

export let controllerPostCandadate = (body: {
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_visual: boolean;
  def_fisica: boolean;
  def_auditiva: boolean;
  def_intelectual: boolean;
  outra_def: boolean;
  descricao_def: string;
  acessibilidade_trab: boolean;
  descricao_acessibilidade: string;
}) => {
  console.log("Passando ao createCandidato()");
  let response = createCanditado(body);

  return response;
};

export let controllerGetCandidato = async () => {
  console.log("Passando ao controllerGetCandidato()");

  let result = await getUser.getUser("Tb_candidato");

  let users = [];
  console.log("Validando Dados");
  console.log(`Foram encontrados ${result.rows.length} candidatos`);
  if (result.rows.length > 0) {
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows[i]);
    }
    return users;
  } else {
    return "Candidato não encontrado";
  }
};

export let controllerGetCandidatoById = async (id: number) => {
  console.log("Passando ao controllerGetCandidatoById()");

  let result = await getUser.getUserByID("Tb_candidato", id);
  console.log("Validando Dados");
  console.log(`Foram encontrados ${result.rows.length} candidatos`);

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return "Candidato não encontrado";
  }
};

export let controllerDeleteCandidato = async (id: number) => {
  console.log("Passando ao controllerDeleteCandidato()");

  let result = await deleteUser("tb_candidato", id);
  console.log("Validando Dados");

  if (result.rowCount > 0) {
    return result;
  } else {
    return false;
  }
}
export let controllerUpdateCandidato = async (id: number, body: object) => {
  console.log("Passando ao controllerUpdateCandidato()");
  return await updateUser("tb_candidato", id, body);
};

export let candidatarVaga = async (id_candidate: string, id_vaga: string) => {
  console.log("Passando ao controllerCandidatarVaga()");
  let result = await registerCandidateToVaga(id_candidate, id_vaga);
  return result;
  
};