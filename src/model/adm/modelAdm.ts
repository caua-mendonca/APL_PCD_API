import * as DB from "../../repositories/queryTools.js";
import { Acessibilidade } from "../entities/class/Acessibilidade.js";
import { Barreira } from "../entities/class/Barreira.js";
import { SubTipo } from "../entities/class/SubTipo.js";

export let createBarreira = async (body: any): Promise<any> => {
  console.log("[POST / MODEL ADM]");

  try {
    let barreira = new Barreira(body.descricao, new Date());
    barreira.setId();
    let t = barreira.toString();

    console.log(t);

    let [status, message] = await DB.createBarreira(
      barreira.id,
      barreira.descricao,
      barreira.created_at
    );
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export let createAcess = async (body: any): Promise<any> => {
  console.log("[POST / MODEL ADM]");

  try {
    let acess = new Acessibilidade(body.descricao, new Date());
    acess.setId();

    let [status, message] = await DB.createAcess(
      acess.id,
      acess.descricao,
      acess.created_at
    );
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};
export let createSubTipo = async (body: any): Promise<any> => {
  console.log("[POST / MODEL ADM]");

  try {
    let subTipo = new SubTipo(body.descricao, body.tipo, new Date());
    subTipo.setId();

    let [status, message] = await DB.createSubTipo(
      subTipo.id,
      subTipo.descricao,
      subTipo.created_at,
      subTipo.tipo,
      body.barreira,
      body.acessibilidade
    );
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};
