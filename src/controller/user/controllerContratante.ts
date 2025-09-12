import * as Model from "../../model/user/contratante/modelContratante.js";

/**
 * Controller responsável por criar um novo contratante.
 * Chama a função createContratante para validação e inserção no banco.
 * @param user - Dados do contratante a ser criado
 * @returns resposta do createContratante (sucesso, erros ou exceção)
 */
export let controllerContratante = async (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
}) => {
  console.log("[POST / CONTROLLER Contratante]");

  try {
    let [status, message] = await Model.createContratante(user);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para buscar todos os contratantes no banco.
 * @returns lista de contratantes encontrados
 */
export let controllerGetContratante = async (): Promise<
  [number, string[] | string]
> => {
  console.log("[GET / CONTROLLER Contratante]");

  try {
    let [status, message] = await Model.getUser("tb_empresa");
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para buscar um contratante pelo seu ID.
 * @param id - ID do contratante
 * @returns objeto contratante ou mensagem de não encontrado
 */
export let controllerGetContratanteById = async (id: string) => {
  console.log("[GET / CONTROLLER Contratante]");

  try {
    let [status, result] = await Model.getUserByID("tb_empresa", id);
    return [status, result];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para deletar um contratante pelo seu ID.
 * @param id - ID do contratante a ser deletado
 * @returns true se deletado, false caso contrário
 */
export let controllerDeleteContratante = async (id: string) => {
  console.log("[DELETE / CONTROLLER Contratante]");

  try {
    let [status, message] = await Model.deleteUser("tb_empresa", id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para atualizar os dados de um contratante.
 * @param id - ID do contratante
 * @param body - Objeto com os dados a serem atualizados
 * @returns resultado da atualização ou false em caso de falha
 */
export let controllerUpdateContratante = async (id: string, body: object) => {
  console.log("[PUT / CNTROLLER Contratante]");

  try {
    let [status, message] = await Model.updateUser("tb_empresa", id, body);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};
