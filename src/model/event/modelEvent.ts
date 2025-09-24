import * as Validation from "../../validation/validateId/validateId.js";
import * as DB from "../../repositories/event/eventRepository.js";
import { Event } from "../entities/class/Event.js";
import {deleteFromTable} from "../../repositories/shared/commonRepository.js";

/**
 * Cria um novo evento e insere no banco de dados.
 *
 * @param evento - Objeto contendo os dados do evento a ser criado.
 * @param id_calendario - ID do calendário ao qual o evento será associado.
 * @returns Retorna o resultado da operação de inserção no banco.
 * @throws Lança um erro caso a inserção falhe.
 */
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
  console.log("[POST / CONTROLLER Evento]");
  let errorLog: string[] = [];
  try {
    // Instancia um novo objeto Event com os dados fornecidos.
    let newEvent = new Event(
      evento.titulo,
      evento.descricao,
      evento.data,
      evento.hora_inicio,
      evento.hora_fim,
      evento.id_candidato
    );

    if (
      evento.hora_inicio.split(":").length !== 2 ||
      evento.hora_fim.split(":").length !== 2
    ) {
      errorLog.push("Formato de hora inválido. Use HH:mm.");
    } else if (
      Number(evento.hora_inicio.split(":")[0]) >
      Number(evento.hora_fim.split(":")[0])
    ) {
      errorLog.push("A hora de início não pode ser maior que a hora de fim.");
    }

    let idCandidateIsValis = await Validation.validateId(
      evento.id_candidato,
      "tb_candidato"
    );
    if (idCandidateIsValis === false || idCandidateIsValis === null) {
      errorLog.push("ID do candidato inválido.");
    }

    // Gera um ID único para o evento.
    newEvent.setId();

    // Insere o evento na tabela relacionada, vinculando ao calendário.
    let [status, message] = await DB.insertIntoEventos(newEvent, id_calendario);

    // Valida se a inserção foi bem-sucedida.
    return [status, message];
  } catch (error) {
    return [400, errorLog];
  }
};

/**
 * Recupera todos os eventos da tabela tb_evento.
 *
 * @returns Retorna a lista de eventos encontrados no banco.
 */
export let getEvento = async (id: string) => {
  console.log("[GET / MODEL Evento");
  try {
    let [status, message] = await DB.getEventosByCalendario(id);
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Exclui (inativa) um evento da tabela tb_evento.
 *
 * @param id - ID do evento a ser deletado.
 * @returns Retorna o resultado da operação de exclusão.
 * @throws Lança um erro caso o ID seja inválido ou a exclusão falhe.
 */
export let deleteEvento = async (id: string) => {
  console.log("[DELETE / MODEL Evento]");

  try {
    let response = await deleteFromTable("tb_evento", id);
    return [200, response];
  } catch (error) {
    return [400, String(error)];
  }
};
