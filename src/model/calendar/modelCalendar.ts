import * as Validations from "../../validation/validateId/validateId.js";
import { Calendar } from "../entities/class/calendar.js";
import * as DB from "../../repositories/queryTools.js";

export let createCalendario = async (id: string) => {
  if (!Validations.validateId(id, "tb_empresa")) {
    throw new Error("ID inválido");
  }
  let newCalendar = new Calendar(`Calendário da empresa: ${id}`);

  newCalendar.setId();

  let result = await DB.insertCalendario(newCalendar.id, newCalendar.nome, id);

  if (!result) {
    throw new Error("Erro ao criar calendário");
  } else {
    return result;
  }
};
