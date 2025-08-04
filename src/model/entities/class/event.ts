export class Event {
  id: string;
  titulo: string;
  descricao: string;
  data: Date;
  hora_inicio: string;
  hora_fim: string;
  id_candidato: string;

  constructor(
    titulo: string,
    descricao: string,
    data: Date,
    hora_inicio: string,
    hora_fim: string,
    id_candidato: string
  ) {
    this.id = "";
    this.titulo = titulo;
    this.descricao = descricao;
    this.data = data;
    this.hora_inicio = hora_inicio;
    this.hora_fim = hora_fim;
    this.id_candidato = id_candidato;
  }

  setId() {
    let prefix = "EVENT-";
    let sufix = Math.floor(Math.random() * 1000000);
    this.id = prefix + sufix + "";
  }
}
