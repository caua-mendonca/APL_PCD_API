export class Contratante {
  public id: string = "";
  public nome_fantasia: string;
  public razao_social: string;
  public email: string;
  public confirme_email: string;
  public senha: string;
  public confirme_senha: string;
  public cnpj: string;
  public telefone: string;
  public status: boolean = true;
  public acessibilidade: string;

  constructor(
    name_fantasia: string,
    rasao_social: string,
    email: string,
    confirme_email: string,
    senha: string,
    confirme_senha: string,
    cnpj: string,
    telefone: string,
    acessibilidade: string
  ) {
    this.nome_fantasia = name_fantasia;
    this.razao_social = rasao_social;
    this.email = email;
    this.confirme_email = confirme_email;
    this.senha = senha;
    this.confirme_senha = confirme_senha;
    this.cnpj = cnpj;
    this.telefone = telefone;
    this.acessibilidade = acessibilidade;
  }

  public async setId(): Promise<void> {
    let prefix = "EMP-";
    let suffix = Math.floor(Math.random() * 1000000);
    this.id = prefix + suffix;
  }
}
