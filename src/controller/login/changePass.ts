import * as Model from "../../model/user/login/changePass.js";
import {logger} from "../../utils/logger.js";

/**
 * Controller para troca de senha de usuários (Candidato, Empresa, Colaborador)
 * @param body - Objeto contendo os dados: email, newSenha, confirmSenha
 * @param id - ID do usuário
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export let changePassword = async (body: any, id: string): Promise<[number, any]> => {
  logger.info(`[POST / CONTROLLER changePassword]`);

  try {
    const [status, message] = await Model.changePassword(body, id);
    logger.info(`[POST / CONTROLLER changePassword]`);
    return [status, message];
  } catch (error) {
    logger.error(`[POST / CONTROLLER changePassword] Erro ao trocar senha:`, error);
    return [400, String(error)];
  }
};
