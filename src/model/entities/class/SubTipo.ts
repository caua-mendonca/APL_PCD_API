export class SubTipo{
    public id:string;
    public descricao:string;
    public tipo: string;
    public created_at:Date;

    constructor(descricao:string, tipo:string,created_at:Date){
        this.id = "";
        this.descricao = descricao;
        this.created_at = created_at;
        this.tipo = tipo
    }

    public setId(){
        let prefix: string = "SUBT-"
        let suffix:number = Math.floor(Math.random() * 10000)
        this.id = prefix + suffix.toString()
    }

    public toString(){
        return "SUBTIPO: " + this.id + " - " + this.descricao + " - " + this.created_at.toISOString() + "\n"
    }

}