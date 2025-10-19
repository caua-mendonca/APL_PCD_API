import {
  validateCpf,
  validateCpfToDB,
} from "../../../validation/validateData/validateCpf.js";
import { validateAge } from "../../../validation/validateData/validateAge.js";
import { validateEmailToDB } from "../../../validation/validateData/validateEmail.js";
import { validateId } from "../../../validation/validateId/validateId.js";
import { Candidate } from "../../entities/class/candidate.js";
import bcrypt from "bcrypt";
import * as DB from "../../../repositories/user/candidateRepository.js";
import dotenv from "dotenv";
import {
  selectFromTable,
  selectFromNameWhere,
  deleteFromTable,
  selectFromIdWhere,
  updateUserColumn,
} from "../../../repositories/shared/commonRepository.js";
dotenv.config({ path: ".env.status" });

/**
 * Cria um novo candidato.
 * - Valida CPF, e-mail, data de nascimento e senhas.
 * - Gera um ID único.
 * - Insere no banco de dados.
 *
 * @param user Objeto contendo os dados do candidato.
 * @returns true se sucesso, array com erros de validação ou lança erro em caso de falha.
 */
export let createCandidate = async (user: {
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_motora: boolean;
  def_auditiva: boolean;
  def_visual: boolean;
  sub_tipo: string;
  barreira: string;
  acessbilidade: string;
}): Promise<[number, string]> => {
  console.log("[POST / MODEL Candidato]");
  try {
    let errorLog = [];

    let newUser = new Candidate(
      user.name,
      user.email,
      user.confirme_email,
      user.senha,
      user.confirme_senha,
      user.telefone,
      user.cpf,
      user.data_nascimento,
      user.def_visual,
      user.def_auditiva,
      user.def_motora,
      user.sub_tipo,
      user.barreira,
      user.acessbilidade
    );

    console.log("[POST / VALIDATE CPF ]");
    let cpfIsValid: boolean = validateCpf(newUser.cpf);

    if (cpfIsValid === true) {
      cpfIsValid = await validateCpfToDB(newUser.cpf, "cpf", "tb_candidato");
      console.log("[POST / VALIDATE CPF NO BANCO]");
      if (!cpfIsValid) {
        console.log("[POST / VALIDATE CPF NO BANCO]");
        errorLog.push("CPF ja inserido no banco");
      }
    } else {
      errorLog.push("CPF inválido");
    }

    console.log("[POST / VALIDATE DATA ANIVERSARIO]");

    let dateIsValid: boolean = validateAge(newUser.data_nascimento);
    if (!dateIsValid) {
      errorLog.push("Data de nascimento inválida");
    }
    console.log("[POST / VALIDATE EMAIL]");
    let emailIsValid: boolean = newUser.email === newUser.confirme_email;
    if (emailIsValid === true) {
      console.log("[POST / VALIDATE EMAIL NO BANCO]");
      emailIsValid = await validateEmailToDB(
        newUser.email,
        "email",
        "tb_candidato"
      );
      if (!emailIsValid) {
        console.log("[POST / VALIDATE EMAIL]");
        errorLog.push("Email ja inserido no banco");
      }
    } else {
      errorLog.push("Email inválido");
    }
    console.log("[POST / VALIDATE SENHA]");
    let passwordIsValid: boolean = newUser.senha === newUser.confirme_senha;
    if (passwordIsValid) {
      console.log("[POST / CRIPTOGRAFANDO SENHA]");
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(user.senha, salt);
      newUser.SetCryptPass(passwordHash);
    }
    if (errorLog.length > 0) {
      console.log("[POST / MODEL Candidato Failed]");
      return [400, errorLog.map((e) => e).join(", ")];
    } else {
      console.log("[POST / MODEL Candidato Success]");
      let [status, message] = await DB.insertCandidate(newUser);
      if (status === 201) {
        return [status, message];
      } else {
        return [status, message];
      }
    }
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Busca todos os registros de uma tabela.
 */
export let getUser = async (
  table: string
): Promise<[number, string[] | string]> => {
  console.log("[GET / MODEL Candidato]");
  try {
    let [status, message] = await selectFromTable(table);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Busca um registro por ID.
 */
export let getUserByName = async (
  table: string,
  name: string
): Promise<any> => {
  console.log("[GET / MODEL Candidato]");

  try {
    let [status, message] = await selectFromNameWhere(table, name);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Exclui um usuário pelo ID e tabela.
 */
export let deleteUser = async (table: string, id: string): Promise<any> => {
  console.log("[DELETE / MODEL Candidato]");

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
export let updateUser = async (table: string, id: string, body: object): Promise<any> => {
  console.log("[PUT / MODEL Candidato]");
  try {
    let errorlog: string[] = [];
    // Monta os pares chave = valor para o UPDATE
    const keys = Object.keys(body);
    const values = Object.values(body);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Valida CPF se presente
    if (keys.includes("cpf")) {
      const index = keys.indexOf("cpf");
      const cpfIsValid: boolean = validateCpf(values[index]);
      if (!cpfIsValid) {
        errorlog.push("CPF inválido");
      }
    }

    // Valida data de nascimento se presente
    if (keys.includes("data_nascimento")) {
      const index = keys.indexOf("data_nascimento");
      const dateIsValid: boolean = validateAge(new Date(values[index]));
      if (!dateIsValid) {
        errorlog.push("Data de nascimento inválida");
      }
    }

    // Executa atualização
    const [status, message] = await updateUserColumn(table, id, sets, values);
    if (errorlog.length > 0) return [400, errorlog];
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

export let getUserById = async (id: string): Promise<any> => {
  console.log("[GET / MODEL Candidato]");

  try {
    let [status, message] = await selectFromIdWhere("tb_candidato_vaga", id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};
