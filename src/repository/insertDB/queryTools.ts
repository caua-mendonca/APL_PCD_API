import * as DB from "../../controller/server/data/connect.js";
import { IFBR } from "../../model/class/ifbr.js";
import { Colaborador } from "../../model/class/colaborador.js";

export let insertIntoCandidate = async (user: {
  id:string;
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_visual: boolean;
  def_auditiva: boolean;
  def_fisica: boolean;
  def_intelectual: boolean;
  outra_def: boolean;
  descricao_def: string;
  acessibilidade_trab: boolean;
  descricao_acessibilidade: string;
  status: boolean;
}) => {
  DB.pool.query(
    `INSERT INTO tb_candidato (
    id, nome, email, senha, telefone, cpf,  data_nascimento,
    def_visual, def_auditiva, def_fisica, def_intelectual, outra_def,
    desc_def, acess_trab, desc_acess, status_usuario
  ) VALUES (
    $1, $2, $3, $4, $5, $6, $7, $8,
    $9, $10, $11, $12, $13, $14, $15, $16
  )`,
    [
      user.id,
      user.name,
      user.email,
      user.senha,
      user.telefone,
      user.cpf,
      user.data_nascimento,
      user.def_visual,
      user.def_auditiva,
      user.def_fisica,
      user.def_intelectual,
      user.outra_def,
      user.descricao_def,
      user.acessibilidade_trab,
      user.descricao_acessibilidade,
      user.status
    ]
  );

  console.log("Usuario registrado no Banco");
};

export let insertIntoContratante = async (user: {
  id: string;
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
  status: boolean;
}) => {
  DB.pool.query(
    `INSERT INTO tb_empresa (id, nome_fantasia, razao_social, email, senha, cnpj, telefone, status_empresa, acessibilidade) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    [
      user.id,
      user.nome_fantasia,
      user.razao_social,
      user.email,
      user.senha,
      user.cnpj,
      user.telefone,
      user.status,
      user.acessibilidade
    ]
  );
  console.log("Usuario registrado no Banco");
};

export const selectIDFrom = async (
  table: string,
  cpfOrCnpj: string
): Promise<any> => {
  if (cpfOrCnpj.length === 11) {
    const query = `SELECT id FROM ${table} WHERE cpf = $1`;
    return DB.pool.query(query, [cpfOrCnpj]);
  } else {
    const query = `SELECT id FROM ${table} WHERE cnpj = $1`;
    return DB.pool.query(query, [cpfOrCnpj]);
  }
};

export const selectId = async (
  table: string,
  id: string
): Promise<boolean> => {
  const query = `SELECT id FROM ${table} WHERE id = $1`;
  const result = await DB.pool.query(query, [id]);

  // Retorna true se encontrou algum ID igual
  return (result.rowCount ?? 0) > 0;
};


export let insertIntoIFBR = async (column: string, json: IFBR, ID: number) => {
  await DB.pool.query(`UPDATE tb_candidato SET ${column} = $1 WHERE id = $2;`, [
    json,
    ID,
  ]);
};

export let insertIntoColaborador = async (
  column: string,
  json: Colaborador,
  ID: number
) => {
  await DB.pool.query(`UPDATE tb_empresa SET ${column} = $1 WHERE id = $2;`, [
    json,
    ID,
  ]);
};

export let selectFromTable = async (table: string): Promise<any> => {
  console.log("Conectando ao banco");
  const query = `SELECT * FROM ${table};`;
  return DB.pool.query(query);
};

export let selectFromIdWhere = async (
  table: string,
  id: number
): Promise<any> => {
  console.log("Conectando ao banco");

  const query = `SELECT * FROM ${table} WHERE id = $1`;
  return DB.pool.query(query, [id]);
};

export let selectWhereColaborador = async (
  table: string,
  id: number,
): Promise<any> => {
  console.log("Conectando ao banco");
  const query = `SELECT colaborador FROM ${table} WHERE id = $1`;
  return DB.pool.query(query, [id]);
};

export let deleteFromTable = async (table: string, id: number): Promise<any> => {
  console.log("Conectando ao banco");
  let result = await DB.pool.query(`UPDATE ${table} SET status = $1 WHERE id = $2;`, [
    false,
    id,
  ]);
  return result
};

export let updateUserColumn = async (
  table: string,
  id: number,
  sets: string,
  values: any[]
): Promise<any> => {
  console.log("Conectando ao banco");

  const query = `UPDATE ${table} SET ${sets} WHERE id = $${values.length + 1}`;
  values.push(id); // adiciona o id ao final do array

  return await DB.pool.query(query, values);
};
