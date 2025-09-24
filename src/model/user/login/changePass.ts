import {changePass}from "../../../repositories/shared/commonRepository.js";
import bcrypt from "bcrypt";

/**
 * changePassword
 * Controlador para alterar a senha de um usuário.
 * Suporta Candidato (CAND), Empresa (EMP) e Colaborador (COLAB).
 * Valida confirmação de senha, aplica hash e atualiza no banco.
 * 
 * @param body - Objeto contendo `email`, `newSenha` e `confirmSenha`
 * @param id - ID do usuário (prefixo define a tabela)
 * @returns [status, message]
 */
export let changePassword = async (body: any, id: string): Promise<any> => {
  console.log(`[POST / CONTROLLER changePassword]`);

  try {
    // Verifica se as senhas conferem
    if (body.newSenha !== body.confirmSenha) {
      return [400, "Senhas não são iguais"];
    }

    // Determina a tabela com base no prefixo do ID
    const prefix = id.split("-")[0];
    let table: string;

    switch (prefix) {
      case "CAND":
        table = "tb_candidato";
        break;
      case "EMP":
        table = "tb_empresa";
        break;
      case "COLAB":
        table = "tb_colaborador";
        break;
      default:
        return [400, "Não foi possível trocar senha"];
    }

    // Aplica hash na nova senha
    const hashedPass = await bcrypt.hash(body.newSenha, 10);

    // Atualiza a senha no banco
    const [status, message] = await changePass(body.email, hashedPass, id, table);
    return [status, message];
  } catch (error) {
    console.error(`[ERROR / changePassword]`, error);
    return [500, String(error)];
  }
};
