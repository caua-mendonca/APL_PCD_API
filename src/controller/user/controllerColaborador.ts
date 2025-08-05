import * as Model from "../../model/user/modelUser.js";
import * as modelVaga from "../../model/vaga/modelVaga.js";
import * as modelEvento from "../../model/event/modelEvent.js"
import * as modelCalendar from "../../model/calendar/modelCalendar.js";
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
/**
 * Insere uma nova vaga vinculada a uma empresa.
 * @param vaga - Objeto contendo os detalhes da vaga (data de fim, título, descrição, salário, localidade, acessibilidade).
 * @param id_empresa - Identificador da empresa que está cadastrando a vaga.
 * @returns Resultado da criação da vaga, conforme resposta do model.
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

/**
 * Obtém todas as vagas disponíveis no sistema.
 * @returns Array com as vagas encontradas.
 * @throws Erro caso a consulta falhe.
 */
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

/**
 * Busca uma vaga pelo seu identificador único.
 * @param id - Identificador da vaga a ser buscada.
 * @returns Vaga correspondente ao ID informado.
 * @throws Erro caso a consulta falhe.
 */
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

/**
 * Remove uma vaga do sistema a partir do seu identificador.
 * @param id - Identificador da vaga a ser deletada.
 * @returns Resultado da operação de deleção.
 * @throws Erro caso a deleção falhe.
 */
export let deleteVaga = async (id: string) => {
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
};

/**
 * Insere um novo evento associado a um calendário e candidato.
 * @param evento - Objeto contendo detalhes do evento (título, descrição, data, horário de início e fim, id do candidato).
 * @param id_calendario - Identificador do calendário ao qual o evento será vinculado.
 * @returns Resultado da criação do evento conforme resposta do model.
 */
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

/**
 * Obtém todos os eventos cadastrados no sistema.
 * @returns Array com os eventos encontrados.
 * @throws Erro caso a consulta falhe.
 */
export let getEvento = async () => {
  try {
    console.log("🚀 Passando ao getEvento()");
    let response = await modelEvento.getEvento();
    console.log(
      `✔️ Eventos encontrados: ${response.length || response.rows?.length || 0}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Remove um evento do sistema a partir do seu identificador.
 * @param id - Identificador do evento a ser deletado.
 * @returns Resultado da operação de deleção.
 * @throws Erro caso a deleção falhe.
 */
export let deleteEvento = async (id: string) => {
  try {
    console.log("🚀 Passando ao deleteEvento()");
    let response = await modelEvento.deleteEvento(id);
    console.log(
      `✔️ Evento deletado: ${response.length || response.rows?.length || 0}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export let postCalendario = async (id: string) => {
  console.log("🚀 Passando ao createCalendario()");
  let result = await modelCalendar.createCalendario(id);
  console.log("✔️ Resposta da criação do calendário recebida");
  return result;
}
