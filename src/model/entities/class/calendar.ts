import { Event } from "./event";

export class Calendar {
  nome: string;
  id: string;
  eventos: Event[];

  constructor(nome: string) {
    this.nome = nome;
    this.id = "";
    this.eventos = [];
  }

  setEvents(eventos: Event[]) {
    this.eventos = eventos;
  }

  setId() {
    let prefix = "CALENDAR-";
    let sufix = Math.floor(Math.random() * 1000000);
    this.id = prefix + sufix;
  }
}
