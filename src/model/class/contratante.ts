export class Contratante{
    public nome_fantasia: string;
    public razao_social: string;
    public email: string;
    public confirme_email: string;
    public senha: number;
    public confirme_senha: number;
    public cnpj: string;
    public telefone: string;

    constructor(name_fantasia: string, rasao_social: string, email: string, confirme_email: string, senha: number, confirme_senha: number, cnpj: string, telefone: string) {
        this.nome_fantasia = name_fantasia;
        this.razao_social = rasao_social;
        this.email = email;
        this.confirme_email = confirme_email;
        this.senha = senha;
        this.confirme_senha = confirme_senha;
        this.cnpj = cnpj;
        this.telefone = telefone;
    }
}