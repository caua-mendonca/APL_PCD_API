import * as DB from "../../../repositories/queryTools.js";
import bcrypt from "bcrypt";

export let changePassword = async (body: any, id: string): Promise<any> => {
  console.log(`[POST / CONTROLLER changePassword]`);
  try {
    if (id.split("-")[0] === "CAND") {
      let newPass: any = body.newSenha === body.confirmSenha ? true : false;
      if (!newPass) return [400, "Senhas não são iguais"];
      newPass = await bcrypt.hash(body.newSenha, 10);
      let [status, message] = await DB.changePass(
        body.email,
        newPass,
        id,
        "tb_candidato"
      );
      return [status, message];
    } else if (id.split("-")[0] === "EMP") {
      let newPass: any = body.newSenha === body.confirmSenha ? true : false;
      if (!newPass) return [400, "Senhas não são iguais"];
      newPass = await bcrypt.hash(body.newSenha, 10);
      let [status, message] = await DB.changePass(
        body.email,
        newPass,
        id,
        "tb_empresa"
      );
      return [status, message];
    } else if (id.split("-")[0] === "COLAB") {
      let newPass: any = body.newSenha === body.confirmSenha ? true : false;
      if (!newPass) return [400, "Senhas não são iguais"];
      newPass = await bcrypt.hash(body.newSenha, 10);
      let [status, message] = await DB.changePass(
        body.email,
        newPass,
        id,
        "tb_colaborador"
      );
      return [status, message];
    } else {
      return [400, "Não foi possivél trocar senha"];
    }
  } catch (error) {
    return [400, String(error)];
  }
};
