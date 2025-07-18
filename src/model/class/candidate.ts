export class Candidate {
  public id: string;
  public name: string;
  public email: string;
  public confirme_email: string;
  public senha: string;
  public confirme_senha: string;
  public telefone: string;
  public cpf: string;
  public data_nascimento: Date;
  public def_visual: boolean;
  public def_auditiva: boolean;
  public def_fisica: boolean;
  public def_intelectual: boolean;
  public outra_def: boolean;
  public descricao_def: string;
  public acessibilidade_trab: boolean;
  public descricao_acessibilidade: string;
  public status: boolean = true;
  constructor(
    name: string,
    email: string,
    confirme_email: string,
    senha: string,
    confirme_senha: string,
    telefone: string,
    cpf: string,
    data_nascimento: Date,
    def_visual: boolean,
    def_auditiva: boolean,
    def_fisica: boolean,
    def_intelectual: boolean,
    outra_def: boolean,
    descricao_def: string,
    acessibilidade_trab: boolean,
    descricao_acessibilidade: string
  ) {
    this.id = "";
    this.name = name;
    this.email = email;
    this.confirme_email = confirme_email;
    this.senha = senha;
    this.confirme_senha = confirme_senha;
    this.telefone = telefone;
    this.cpf = cpf;
    this.data_nascimento = data_nascimento;
    this.def_visual = def_visual;
    this.def_auditiva = def_auditiva;
    this.def_fisica = def_fisica;
    this.def_intelectual = def_intelectual;
    this.outra_def = outra_def;
    this.descricao_def = descricao_def;
    this.acessibilidade_trab = acessibilidade_trab;
    this.descricao_acessibilidade = descricao_acessibilidade;
  }

  public setId(): void {
    let prefix = "CAND-";
    let suffix = Math.floor(Math.random() * 1000000);
    this.id = prefix + suffix;
  }
}
