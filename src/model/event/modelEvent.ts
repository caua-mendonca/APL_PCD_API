import * as Validation from "../../validation/validateId/validateId.js";
import * as DB from "../../repositories/queryTools.js";
import { Event } from "../entities/class/event.js";

export let createEvento = async (
  evento: {
    titulo: string;
    descricao: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    id_candidato: string;
  },
  id_calendario: string
) => {
  // console.log("🚀 Validando id da calendario'");
  // let result: any = await Validation.validateId(id_calendario, "tb_calendario");
  // if (!result) {
  //   console.log("❌ ID da calendario' inválido");
  //   throw new Error("ID da calendario' inválido");
  // }
  let newEvent = new Event(
    evento.titulo,
    evento.descricao,
    evento.data,
    evento.hora_inicio,
    evento.hora_fim,
    evento.id_candidato
  );
  newEvent.setId();
  console.log("🚀 Evento criado com sucesso");
  console.log("🚀 Inserindo evento no banco de dados");

  let result = await DB.insertIntoEventos(
    {
      id: newEvent.id,
      titulo: evento.titulo,
      descricao: evento.descricao,
      data: evento.data,
      hora_inicio: evento.hora_inicio,
      hora_fim: evento.hora_fim,
      id_candidato: evento.id_candidato,
    },
    id_calendario
  );
  if (result) {
    console.log("✔️ Evento inserido com sucesso");
    return result;
  } else {
    console.log("❌ Falha ao inserir evento");
    throw new Error("Falha ao inserir evento");
  }
};
