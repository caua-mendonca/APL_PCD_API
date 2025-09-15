import * as Validations from "../../validation/validateId/validateId.js";
import { Calendar } from "../entities/class/calendar.js";
import * as DB from "../../repositories/queryTools.js";
/**
 * Cria um calendário para uma empresa específica.
 * @param id - Identificador único da empresa (tb_empresa).
 * @returns Retorna o resultado da inserção do calendário no banco de dados.
 * @throws Lança erro se o ID for inválido ou se houver falha na criação do calendário.
 */
export let createCalendario = async (id: string): Promise<any> => {
  console.log(`[POST / MODEL Calendario]`);
  let errorLog: string[] = [];
  try {
    if (!Validations.validateId(id, "tb_empresa")) {
      errorLog.push("ID inválido");
    }

    const newCalendar = new Calendar(`Calendário da empresa: ${id}`);
    newCalendar.setId();

    const [status, message] = await DB.insertCalendario(
      newCalendar.id,
      newCalendar.nome,
      id
    );
    return [status, message];
  } catch (error) {
    return [400, errorLog];
  }
};

/**
 * Gera a representação textual de um calendário para um mês e ano específicos.
 * Marca os dias com eventos e exibe a lista de eventos detalhada.
 * @param monthNumber - Número do mês (1-12).
 * @param year - Ano (YYYY).
 * @param events - Lista de eventos com propriedades de data.
 * @returns Uma string representando o calendário com os eventos.
 * @throws Lança erro se o mês informado for inválido.
 */
export let getCalendario = (
  monthNumber: number,
  year: number,
  events: any[]
): Promise<any> => {
  console.log(`[GET / MODEL Calendario]`);
  let errorLog: string[] = [];

  try {
    const months: { [key: number]: string } = {
      1: "janeiro",
      2: "fevereiro",
      3: "março",
      4: "abril",
      5: "maio",
      6: "junho",
      7: "julho",
      8: "agosto",
      9: "setembro",
      10: "outubro",
      11: "novembro",
      12: "dezembro",
    };

    const monthName = months[monthNumber];
    if (!monthName) {
      errorLog.push("Mês inválido. Informe o número do mês corretamente.");
    }

    // Filtra apenas eventos com uma data válida
    const validEvents = (events || []).filter(
      (e) => e && (e.date || e.data_evento || e.data)
    );
    console.log(
      `🔍 [getCalendario] Eventos válidos para processamento: ${validEvents.length}`
    );

    let output = `📅 Calendário de ${monthName} / ${year}\n`;
    output += " D   S   T   Q   Q   S   S\n";

    const firstDay = new Date(year, monthNumber - 1, 1);
    const lastDay = new Date(year, monthNumber, 0).getDate();

    let week = " ".repeat(firstDay.getDay() * 4);

    for (let day = 1; day <= lastDay; day++) {
      const hasEvent = validEvents.some((event) => {
        const eventDate = new Date(
          event.date || event.data_evento || event.data
        );
        return (
          eventDate.getDate() === day &&
          eventDate.getMonth() === monthNumber - 1 &&
          eventDate.getFullYear() === year
        );
      });

      let dayStr = String(day).padStart(2, " ");
      dayStr += hasEvent ? "*" : " ";
      week += dayStr + " ";

      if ((firstDay.getDay() + day) % 7 === 0 || day === lastDay) {
        output += week.trimEnd() + "\n";
        week = "";
      }
    }

    output += "-----------------------------\n";
    for (let i = 0; i < events.length; i++) {
      output += `${events[i].nome} - ${events[i].descricao} - ${events[i].data_evento} - ${events[i].hora_ini} - ${events[i].hora_fim}\n`;
    }

    return Promise.resolve([200, output]);
  } catch (error) {
    return Promise.resolve([400, errorLog]);
  }
};
