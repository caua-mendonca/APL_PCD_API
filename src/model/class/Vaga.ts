export class Vaga{
    public id: string
    public data_inicio: Date
    public data_fim: Date
    public status: boolean
    public titulo: string
    public descricao: string
    public salario: number
    public localidade: string
    public acessibilidade: string

    constructor( data_fim: Date, titulo: string, descricao: string, salario: number, localidade: string, acessibilidade: string){
        this.id = "";
        this.data_inicio = new Date();
        this.data_fim = data_fim;
        this.status = true;
        this.titulo = titulo;
        this.descricao = descricao;
        this.salario = salario;
        this.localidade = localidade;
        this.acessibilidade = acessibilidade;
    }
    public setId(id: string){
        let prefix = "VAGA-";
        let sufix = Math.floor(Math.random() * 1000000);
        this.id = prefix+sufix;
    }
}