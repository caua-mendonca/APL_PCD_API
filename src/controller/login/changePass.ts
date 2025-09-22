import * as Model from "../../model/user/login/changePass.js";

/**
 * Controller para troca de senha de usuários (Candidato, Empresa, Colaborador)
 * @param body - Objeto contendo os dados: email, newSenha, confirmSenha
 * @param id - ID do usuário
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export let changePassword = async (body: any, id: string): Promise<[number, any]> => {
  console.log(`[POST / CONTROLLER changePassword] Iniciando troca de senha para ID: ${id}`);

  try {
    const [status, message] = await Model.changePassword(body, id);
    console.log(`[POST / CONTROLLER changePassword] Resultado: ${status} - ${message}`);
    return [status, message];
  } catch (error) {
    console.error(`[POST / CONTROLLER changePassword] Erro ao trocar senha:`, error);
    return [400, String(error)];
  }
};
