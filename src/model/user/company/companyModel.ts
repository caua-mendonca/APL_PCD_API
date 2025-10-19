import { validateEmailToDB } from "../../../validation/validateData/validateEmail.js";
import bcrypt from "bcrypt";
import { Contratante } from "../../entities/class/Company.js";
import {
  validateCNPJ,
  validateCNPJToDB,
} from "../../../validation/validateData/validateCNPJ.js";
import { validateAge } from "../../../validation/validateData/validateAge.js";
import * as DB from "../../../repositories/user/companyRepository.js";
import {
  selectFromTable,
  selectFromNameWhere,
  deleteFromTable,
  selectFromIdWhere,
  updateUserColumn,
} from "../../../repositories/shared/commonRepository.js";
import { stat } from "fs";

/**
 * Cria um contratante.
 * - Valida e-mail, CNPJ e senhas.
 * - Gera ID único.
 * - Insere no banco de dados.
 *
 * @param user Objeto contendo os dados do contratante.
 * @returns string de sucesso, array de erros ou lança erro em caso de falha.
 */
export let createCompany = async (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
}): Promise<any> => {
  console.log("[POST / MODEL Contratante]");

  try {
    let errorLog = [];
    let newContratante = new Contratante(
      user.nome_fantasia,
      user.razao_social,
      user.email,
      user.confirme_email,
      user.senha,
      user.confirme_senha,
      user.cnpj,
      user.telefone,
      user.acessibilidade
    );

    // Gera ID único
    newContratante.setId();
    while (newContratante.id == "") {
      newContratante.setId();
    }

    // Valida e-mail
    let emailIsValid: boolean =
      newContratante.email === newContratante.confirme_email;
    if (emailIsValid === true) {
      emailIsValid = await validateEmailToDB(
        newContratante.email,
        "email",
        "tb_empresa"
      );
      if (emailIsValid == false) {
        errorLog.push("Email inválido");
      } else {
      }
    }

    // Valida senha
    let passwordIsValid: boolean =
      newContratante.senha === newContratante.confirme_senha;

    if (passwordIsValid) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(newContratante.senha, salt);
      newContratante.SetCryptPass(passwordHash);
    }

    // Valida CNPJ
    let cnpjIsValid: boolean = validateCNPJ(newContratante.cnpj);
    if (cnpjIsValid === true) {
      cnpjIsValid = await validateCNPJToDB(
        newContratante.cnpj,
        "cnpj",
        "tb_empresa"
      );
      if (!cnpjIsValid) {
        errorLog.push("CNPJ inválido");
      }
    }

    // Retorna erros
    if (errorLog.length > 0) {
      return [400, errorLog];
    } else {
      let [status, message] = await DB.insertCompany(newContratante);
      return [status, message];
    }
  } catch (error) {
    return [500, String(error)];
  }
};

export let getUser = async (
  table: string
): Promise<[number, string[] | string]> => {
  console.log("[POST / MODEL Candidato]");
  try {
    let [status, message] = await selectFromTable(table);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

export let getUserByID = async (table: string, id: string): Promise<any> => {
  console.log(`[GET / MODEL Contratante]`);
  try {
    let [status, message] = await selectFromIdWhere(table, id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Exclui um usuário pelo ID e tabela.
 */
export let deleteUser = async (table: string, id: string) => {
  console.log("[DELETE / MODEL Contratante]");

  try {
    const [status, message] = await deleteFromTable(table, id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Atualiza dados de um usuário.
 */
export let updateUser = async (table: string, id: string, body: object) => {
  console.log("[UPDATE / MODEL Contratante]");
  try {
    let errorLog: string[] = [];
    const keys = Object.keys(body);
    const values = Object.values(body);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Valida cnpj se presente
    if (keys.includes("cnpj")) {
      const index = keys.indexOf("cnpj");
      const cnpjIsValid: boolean = validateCNPJ(values[index]);

      if (!cnpjIsValid) {
        errorLog.push("cnpj inválido");
      }
    }

    // Executa atualização
    const [status, message] = await updateUserColumn(
      table,
      id,
      sets,
      values
    );

    if (errorLog.length > 0) {
      return [400, errorLog];
    }
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};
