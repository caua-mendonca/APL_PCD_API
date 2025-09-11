export class Calendar {
    constructor(nome) {
        this.nome = nome;
        this.id = "";
        this.eventos = [];
    }
    setEvents(eventos) {
        this.eventos = eventos;
    }
    setId() {
        let prefix = "CALENDAR-";
        let sufix = Math.floor(Math.random() * 1000000);
        this.id = prefix + sufix;
    }
}
