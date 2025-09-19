import * as DB from "../../../repositories/queryTools.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

/**
 * login
 * Realiza a autenticação do usuário comparando senha fornecida com hash do banco.
 * 
 * @param body - Objeto com `email` e `senha`
 * @param table - Nome da tabela no banco (ex: "tb_candidato", "tb_empresa")
 * @returns [status, message] - Status HTTP e mensagem
 */
export let login = async (body: any, table: string): Promise<[number, any]> => {
  console.log(`[MODEL Login] Tentando autenticar usuário ${body.email} na tabela ${table}`);

  try {
    // Busca usuário pelo email
    let [status, result] = await DB.login(body.email, table);

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

    // Aqui você poderia gerar e retornar um token JWT, caso use autenticação baseada em token
    return [200, "Login efetuado com sucesso!"];
  } catch (error) {
    console.error(`[MODEL Login] Erro ao autenticar:`, error);
    return [500, "Erro interno ao tentar efetuar login"];
  }
};
