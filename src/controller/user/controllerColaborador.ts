import * as Model from "../../model/user/modelUser.js";
import * as modelVaga from "../../model/vaga/modelVaga.js";
import * as modelEvento from "../../model/event/modelEvent.js"
/**
 * Controller para criação de um novo colaborador.
 * Recebe dados do colaborador e o ID da empresa para associação.
 * @param user - Dados do colaborador a ser criado
 * @param id_empresa - ID da empresa associada ao colaborador
 * @returns resposta da criação (sucesso ou erro)
 */
export let controllerColaborador = async (
  user: {
    name: string;
    email: string;
    senha: string;
    setor: string;
  },
  id_empresa: string
) => {
  console.log("🚀 Passando ao createColaborador()");
  let response = Model.createColaborador(user, id_empresa);
  console.log("✔️ Resposta da criação do colaborador recebida");
  return response;
};

/**
 * Controller para obter colaboradores de uma tabela associada a um ID.
 * @param table - Nome da tabela para consulta (ex: "tb_empresa")
 * @param id - ID associado para filtro
 * @returns lista de colaboradores encontrados
 */
export let controllerGetColaborador = async (table: string, id: string) => {
  console.log("🚀 Passando ao getColaborador()");
  let response = await Model.getColaborador(table, id);
  console.log(
    `✔️ Colaboradores encontrados: ${
      response.length || response.rows?.length || 0
    }`
  );
  return response;
};

/**
 * Controller para criação de uma vaga associada a uma empresa.
 * @param vaga - Dados da vaga a ser criada
 * @param id_empresa - ID da empresa que cria a vaga
 * @returns resultado da criação da vaga (sucesso ou erro)
 */
export let postVaga = async (
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
  console.log("🚀 Passando ao createVaga()");
  let result = await modelVaga.createVaga(vaga, id_empresa);
  console.log("✔️ Resposta da criação da vaga recebida");
  return result;
};

export let getVaga = async () => {
  try {
    console.log("🚀 Passando ao getVaga()");
    let response = await modelVaga.getVagaModel();
    console.log(
      `✔️ Vagas encontradas: ${response.length || response.rows?.length || 0}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export let getVagaById = async (id: string) => {
  try {
    console.log("🚀 Passando ao getVaga()");
    let response = await modelVaga.getVagaById(id);
    console.log(
      `✔️ Vagas encontradas: ${response.length || response.rows?.length || 0}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export let deleteVaga = async(id: string) => {
  try {
    console.log("🚀 Passando ao deleteVaga()");
    let response = await modelVaga.deleteVaga(id);
    console.log(
      `✔️ Vagas encontradas: ${response.length || response.rows?.length || 0}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export let postEvento = async (
  evento: {
    titulo: string;
    descricao: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    id_candidato: string;
  },
  id_calendario: string
) => {
  console.log("🚀 Passando ao createEvento()");
  let result = await modelEvento.createEvento(evento, id_calendario);
  console.log("✔️ Resposta da criação do evento recebida");
  return result;
};