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
  DB.pool.query(
    `INSERT INTO tb_candidato (nome, email, senha, telefone, cpf, data_nascimento) VALUES ($1, $2, $3, $4, $5, $6)`,
    [user.name, user.email, user.senha , user.telefone, user.cpf, user.data_nascimento]
  );
};

export let insertIntoContratante = async (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: number;
  confirme_senha: number;
  cnpj: string;
  telefone: string;
}) => {
  DB.pool.query(
    `INSERT INTO tb_empresa (nome_fantasia, razao_social, email, senha, cnpj, telefone) VALUES ($1, $2, $3, $4, $5, $6)`,
    [user.nome_fantasia, user.razao_social, user.email, user.senha , user.cnpj, user.telefone]
  );
};
