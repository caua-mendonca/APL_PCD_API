export class Colaborador {
  public id: string;
  public name: string;
  public email: string;
  public senha: string;
  public setor: string;

  constructor(name: string, email: string, senha: string, setor: string) {
    this.id = "";
    this.name = name;
    this.email = email;
    this.senha = senha;
    this.setor = setor;
  }

  public async setId(): Promise<void> {
    let prefix = "COLAB-";
    let suffix = Math.floor(Math.random() * 1000000);
    this.id = prefix + suffix;
  }
}
