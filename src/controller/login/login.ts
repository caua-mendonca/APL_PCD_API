import * as Model from "../../model/user/login/login.js";
import dotenv from "dotenv";
dotenv.config();

export let loginCand = async (body: any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER Login]");
  try {
    let [status, message] = await Model.login(body, "tb_candidato");
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};
export let loginEmp = async (body:any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER Login]");
  try {
    let [status, message] = await Model.login(body, "tb_empresa");
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};
export let loginAdm = async (body:any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER Login]");
  try {
    let [status, message] = await Model.login(body, "tb_administrador");
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};
