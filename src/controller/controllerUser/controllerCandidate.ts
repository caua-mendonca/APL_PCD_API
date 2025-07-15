import { createCanditado } from "../../model/createUser/createUser.js";
import { getUser } from "../../model/getUser/getUser.js";

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

  let result = await getUser("Tb_candidato");

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
