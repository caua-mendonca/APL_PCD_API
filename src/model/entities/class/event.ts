/**
 * Representa um evento no sistema, com informações como título, descrição,
 * datas e horários associados, além do vínculo com um candidato.
 */
export class Event {
  id: string;           // Identificador único do evento (gerado automaticamente)
  titulo: string;       // Título do evento
  descricao: string;    // Descrição detalhada do evento
  data: Date;           // Data do evento
  hora_inicio: string;  // Horário de início do evento
  hora_fim: string;     // Horário de término do evento
  id_candidato: string; // ID do candidato associado ao evento

  /**
   * Construtor da classe Event.
   * Inicializa o evento com os dados fornecidos.
   * 
   * @param titulo - Título do evento
   * @param descricao - Descrição do evento
   * @param data - Data em que o evento ocorrerá
   * @param hora_inicio - Hora de início do evento
   * @param hora_fim - Hora de término do evento
   * @param id_candidato - ID do candidato vinculado ao evento
   */
  constructor(
    titulo: string,
    descricao: string,
    data: Date,
    hora_inicio: string,
    hora_fim: string,
    id_candidato: string
  ) {
    this.id = ""; // O ID será definido posteriormente com setId()
    this.titulo = titulo;
    this.descricao = descricao;
    this.data = data;
    this.hora_inicio = hora_inicio;
    this.hora_fim = hora_fim;
    this.id_candidato = id_candidato;
  }

  /**
   * Gera e define automaticamente um ID único para o evento.
   * O ID segue o formato: EVENT-[número aleatório].
   * 
   * Exemplo: EVENT-123456
   */
  setId() {
    let prefix = "EVENT-";
    let sufix = Math.floor(Math.random() * 1000000); // Número aleatório entre 0 e 999999
    this.id = prefix + sufix + ""; // Concatenação do prefixo e sufixo para formar o ID
  }
}
