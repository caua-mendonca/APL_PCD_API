import { Event } from "./event.js";

/**
 * =========================================
 * Classe: Calendar
 * =========================================
 * Representa um calendário que pode armazenar múltiplos eventos.
 * Cada instância possui um ID único, nome e lista de eventos.
 */
export class Calendar {
  public nome: string;       // Nome do calendário
  public id: string;         // ID único do calendário
  public eventos: Event[];   // Lista de eventos associados

  /**
   * Construtor da classe Calendar
   * @param nome - Nome do calendário
   */
  constructor(nome: string) {
    this.nome = nome;
    this.id = "";           // ID será gerado via setId()
    this.eventos = [];      // Inicializa a lista de eventos vazia
  }

  /**
   * setEvents
   * Define os eventos do calendário.
   * @param eventos - Array de objetos Event
   */
  public setEvents(eventos: Event[]) {
    this.eventos = eventos;
  }

  /**
   * setId
   * Gera um ID único combinando prefixo "CALENDAR-" com número aleatório (0-999999)
   * Observação: Para ambientes de produção, UUID é mais seguro para evitar colisões.
   */
  public setId() {
    const prefix = "CALENDAR-";
    const sufix = Math.floor(Math.random() * 1000000);
    this.id = prefix + sufix;
  }
}
