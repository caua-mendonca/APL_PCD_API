import * as DB from "../../../repositories/shared/commonRepository.js";
import { logger } from "../../../utils/logger.js";
import { createJWT } from "../../../middleware/middleware.js";
import redisClient from "../../../utils/redisClient.js";

import bcrypt from "bcrypt";

/**
 * login
 * Realiza a autenticação do usuário comparando senha fornecida com hash do banco.
 *
 * @param body - Objeto com `email` e `senha`
 * @param table - Nome da tabela no banco (ex: "tb_candidato", "tb_empresa")
 * @returns [status, message] - Status HTTP e mensagem
 */
export let login = async (body: any, table: string): Promise<[number, any]> => {
  logger.info(`[MODEL Login]`);

  try {
    // Busca usuário pelo email
    let [status, result] = await DB.login(body.email, table);
    console.log(result);

    if (status !== 200) {
      // Retorna erro caso usuário não exista
      return [status, result];
    }

    // Compara senha fornecida com hash do banco
    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(body.senha, user.senha);

    if (!passwordMatch) {
      return [401, "Senha incorreta!"];
    }

    let role: string = table.split("_")[1]; // extrai o papel do nome da tabela

    const token = await createJWT(role, user.id, 3600);
    // Aqui você poderia gerar e retornar um token JWT, caso use autenticação baseada em token
    await redisClient.set(`token:${user.id}`, token, { EX: 3600 });

    return [200, { user, token }];
  } catch (error) {
    logger.error(`[MODEL Login] Erro ao autenticar:`, error);
    return [500, "Erro interno ao tentar efetuar login"];
  }
};
