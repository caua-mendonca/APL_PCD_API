export class Acessibilidade{
    public id:string;
    public descricao:string;
    public created_at:Date;

    constructor(descricao:string, created_at:Date){
        this.id = "";
        this.descricao = descricao;
        this.created_at = created_at;
    }

    public setId(){
        let prefix: string = "ACES-"
        let suffix:number = Math.floor(Math.random() * 10000)
        this.id = prefix + suffix.toString()
    }

    public toString(){
        return "ACESSIBILIDADE: " + this.id + " - " + this.descricao + " - " + this.created_at.toISOString() + "\n"
    }

}