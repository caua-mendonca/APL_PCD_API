import * as DB from "../../../repositories/queryTools.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export let login = async (body: any, table: string): Promise<[number, any]> => {
  console.log("[POST / MODEL Login]");
  try {
    let [status, message] = await DB.login(body.email, table);

    if (status === 200) {
      const passwordMatch = await bcrypt.compare(
        body.senha,
        message.rows[0].senha
      );
      if (passwordMatch) {
        return [200, "Login efetuado com sucesso!"];
      } else {
        return [401, "Senha incorreta!"];
      }
    } else {
      return [status, message];
    }
  } catch (error) {
    return [400, String(error)];
  }
};
