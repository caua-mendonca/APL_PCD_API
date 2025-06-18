import * as DB from "../../server/data/connect.js";
export let insertIntoCandidate = async (user: {
  name: string;
  email: string;
  confirme_email: string;
  senha: number;
  confirme_senha: number;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
}) => {


  await DB.pool.query(
    "INSERT INTO tb_candidato (nome, email, senha, telefone, cpf, data_nascimento) VALUES ($1, $2, $3, $4, $5, $6) ",
    [
      user.name,
      user.email,
      user.senha,
      user.telefone,
      user.cpf,
      user.data_nascimento,
    ]
  );
};
