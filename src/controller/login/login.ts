import * as Model from "../../model/user/login/login.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Controller de login de usuário
 * @param body - Objeto contendo email e senha
 * @param table - Nome da tabela no banco (tb_candidato, tb_empresa, tb_administrador)
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
const loginController = async (body: any, table: string): Promise<[number, any]> => {
  console.log(`[POST / CONTROLLER Login]`);

  try {
    const [status, message] = await Model.login(body, table);
    console.log(`[POST / CONTROLLER Login]`);
    return [status, message];
  } catch (error) {
    console.error(`[POST / CONTROLLER Login] Error during login:`, error);
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Login para candidatos
 */
export const loginCandidate = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_candidato");
};

/**
 * Login para empresas
 */
export const loginCompany = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_empresa");
};

/**
 * Login para administradores
 */
export const loginAdmin = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_administrador");
};
