export class Candidate {
  public name: string;
  public email: string;
  public confirme_email: string;
  public senha: number;
  public confirme_senha: number;
  public telefone: string;
  public cpf: string;
  public data_nascimento: Date;
  constructor(
    name: string,
    email: string,
    confirme_email: string,
    senha: number,
    confirme_senha: number,
    telefone: string,
    cpf: string,
    data_nascimento: Date
  ) {
    this.name = name;
    this.email = email;
    this.confirme_email = confirme_email;
    this.senha = senha;
    this.confirme_senha = confirme_senha;
    this.telefone = telefone;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
  }
}
