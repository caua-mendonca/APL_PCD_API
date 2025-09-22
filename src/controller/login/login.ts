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
  console.log(`[POST / CONTROLLER Login] Tentativa de login na tabela: ${table}, email: ${body.email}`);

  try {
    const [status, message] = await Model.login(body, table);
    console.log(`[POST / CONTROLLER Login] Resultado: ${status} - ${message}`);
    return [status, message];
  } catch (error) {
    console.error(`[POST / CONTROLLER Login] Erro ao realizar login:`, error);
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Login para candidatos
 */
export const loginCand = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_candidato");
};

/**
 * Login para empresas
 */
export const loginEmp = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_empresa");
};

/**
 * Login para administradores
 */
export const loginAdm = async (body: any): Promise<[number, any]> => {
  return await loginController(body, "tb_administrador");
};
