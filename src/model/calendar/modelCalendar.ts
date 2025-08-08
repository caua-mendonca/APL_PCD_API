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

export let getCalendario = (
  monthNumber: number,
  year: number,
  events: any[]
): string => {
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
    throw new Error("Mês inválido. Informe o número do mês corretamente.");
  }

  // Detecta nome correto do campo de data
  const validEvents = (events || []).filter((e) => {
    return e && (e.date || e.data_evento || e.data);
  });

  let output = "";
  output += `📅 Calendário de ${monthName} / ${year}\n`;
  output += " D   S   T   Q   Q   S   S\n";

  const firstDay = new Date(year, monthNumber - 1, 1);
  const lastDay = new Date(year, monthNumber, 0).getDate();

  let week = " ".repeat(firstDay.getDay() * 4);

  for (let day = 1; day <= lastDay; day++) {
    const hasEvent = validEvents.some((event) => {
      const eventDate = new Date(event.date || event.data_evento || event.data);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === monthNumber - 1 &&
        eventDate.getFullYear() === year
      );
    });

    let dayStr = String(day).padStart(2, " ");
    if (hasEvent) {
      dayStr += "*";
    } else {
      dayStr += " ";
    }

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

  return output;
};
