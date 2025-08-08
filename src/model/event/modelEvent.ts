import * as Validation from "../../validation/validateId/validateId.js";
import * as DB from "../../repositories/queryTools.js";
import { Event } from "../entities/class/event.js";

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
  // Instancia um novo objeto Event com os dados fornecidos.
  let newEvent = new Event(
    evento.titulo,
    evento.descricao,
    evento.data,
    evento.hora_inicio,
    evento.hora_fim,
    evento.id_candidato
  );

  // Gera um ID único para o evento.
  newEvent.setId();
  console.log("🚀 Evento criado com sucesso");
  console.log("🚀 Inserindo evento no banco de dados");

  // Insere o evento na tabela relacionada, vinculando ao calendário.
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

  // Valida se a inserção foi bem-sucedida.
  if (result) {
    console.log("✔️ Evento inserido com sucesso");
    return result;
  } else {
    console.log("❌ Falha ao inserir evento");
    throw new Error("Falha ao inserir evento");
  }
};

/**
 * Recupera todos os eventos da tabela tb_evento.
 * 
 * @returns Retorna a lista de eventos encontrados no banco.
 */
export let getEvento = async (id: string) => {
  console.log("🚀 Passando ao getEventoModel()");
  // Busca todos os registros da tabela tb_evento.
  let response = await DB.getEventosByCalendario(id);
  console.log(`✔️ Eventos encontrados: ${response.length}`);
  return response;
};

/**
 * Exclui (inativa) um evento da tabela tb_evento.
 * 
 * @param id - ID do evento a ser deletado.
 * @returns Retorna o resultado da operação de exclusão.
 * @throws Lança um erro caso o ID seja inválido ou a exclusão falhe.
 */
export let deleteEvento = async (id: string) => {
  console.log("🚀 Passando ao deleteEventoModel()");

  // Valida se o ID informado existe na tabela tb_evento.
  if (!Validation.validateId(id, "tb_evento")) {
    throw new Error("ID inválido");
  }

  // Executa a operação de deleção (atualização do status para inativo).
  let response = await DB.deleteFromTable("tb_evento", id);

  // Valida se a operação foi concluída com sucesso.
  if (response) {
    console.log(`✔️ Evento deletado com sucesso: ${id}`);
    return response;
  } else {
    console.log(`❌ Falha ao deletar evento: ${id}`);
    throw new Error("Falha ao deletar evento");
  }
};
