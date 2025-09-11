import { validateEmailToDB } from "../../../validation/validateData/validateEmail.js";
import bcrypt from "bcrypt";
import { Contratante } from "../../entities/class/contratante.js";
import { validateCNPJ, validateCNPJToDB } from "../../../validation/validateData/validateCNPJ.js";
import { validateCpf } from "../../../validation/validateData/validadeteCpf.js";
import { validateAge } from "../../../validation/validateData/validateAge.js";
import * as DB from "../../../repositories/queryTools.js"

/**
 * Cria um contratante.
 * - Valida e-mail, CNPJ e senhas.
 * - Gera ID único.
 * - Insere no banco de dados.
 *
 * @param user Objeto contendo os dados do contratante.
 * @returns string de sucesso, array de erros ou lança erro em caso de falha.
 */
export let createContratante = async (user: {
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
  try {
    let errorLog = [];

    console.log(
      "🚀 Iniciando createContratante - criando instância da classe Contratante"
    );
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
    console.log("✔️ ID inicial criado:", newContratante.id);
    while (newContratante.id == "") {
      newContratante.setId();
      console.log("🔄 Gerando novo ID para contratante:", newContratante.id);
    }
    console.log("✔️ ID validado para contratante:", newContratante.id);

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
        console.log("❌ Email inválido:", newContratante.email);
        errorLog.push("Email inválido");
      } else {
        console.log("✔️ Email validado:", newContratante.email);
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
        console.log("❌ CNPJ inválido:", newContratante.cnpj);
        errorLog.push("CNPJ inválido");
      } else {
        console.log("✔️ CNPJ validado:", newContratante.cnpj);
      }
    }

    // Acumula erros
    !cnpjIsValid && errorLog.push("CNPJ inválido");
    !emailIsValid && errorLog.push("Emails não coincidem ou inválidos");
    !passwordIsValid && errorLog.push("Senhas não coincidem ou inválidas");

    // Retorna erros
    if (errorLog.length > 0) {
      console.warn("❌ Dados inválidos encontrados no contratante:", errorLog);
      return errorLog;
    } else {
      console.log(
        "✔️ Dados do contratante validados com sucesso, inserindo no banco"
      );
      DB.insertIntoContratante(newContratante);
      return true;
    }
  } catch (error) {
    console.error("❌ Erro capturado em createContratante:", error);
    return error;
  }
};

export let getUser = async (table: string): Promise<[number, string[] | string]> => {
  console.log("[POST / MODEL Candidato]");
  try {
    let [status, message] = await DB.selectFromTable(table);
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

export let getUserByID = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getUserByID][Table: ${table}][ID: ${id}]`;
  try {
    console.info(`${logPrefix} - Iniciando consulta por ID`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(
      `${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`
    );
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar dados por ID:`, error);
    throw error;
  }
};

/**
 * Exclui um usuário pelo ID e tabela.
 */
export let deleteUser = async (table: string, id: string) => {
  const logPrefix = `[deleteUser][Table: ${table}][ID: ${id}]`;
  try {
    console.info(`${logPrefix} - Iniciando exclusão do registro`);
    const result = await DB.deleteFromTable(table, id);
    console.debug(
      `${logPrefix} - Resultado da query: rowCount=${result.rowCount}`
    );
    if (result.rowCount > 0) {
      console.info(`${logPrefix} - Exclusão realizada com sucesso`);
      return result;
    } else {
      console.warn(`${logPrefix} - Nenhum registro encontrado para exclusão`);
      return false;
    }
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao executar deleteUser:`, error);
    throw error;
  }
};

/**
 * Atualiza dados de um usuário.
 */
export let updateUser = async (table: string, id: string, body: object) => {
  const logPrefix = `[updateUser][Table: ${table}][ID: ${id}]`;
  console.log(`${logPrefix} - Iniciando atualização do usuário`);

  try {
    // Monta os pares chave = valor para o UPDATE
    const keys = Object.keys(body);
    const values = Object.values(body);
    console.log(`${logPrefix} - Campos a atualizar: ${keys.join(", ")}`);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Valida CPF se presente
    if (keys.includes("cpf")) {
      const index = keys.indexOf("cpf");
      const cpfIsValid: boolean = validateCpf(values[index]);
      console.log(
        `${logPrefix} - Validando CPF: ${values[index]} => ${cpfIsValid}`
      );
      if (!cpfIsValid) {
        console.error(`${logPrefix} - ERRO: CPF inválido`);
        throw new Error("CPF inválido");
      }
    }

    // Valida data de nascimento se presente
    if (keys.includes("data_nascimento")) {
      const index = keys.indexOf("data_nascimento");
      const dateIsValid: boolean = validateAge(new Date(values[index]));
      console.log(
        `${logPrefix} - Validando data_nascimento: ${values[index]} => ${dateIsValid}`
      );
      if (!dateIsValid) {
        console.error(`${logPrefix} - ERRO: Data de nascimento inválida`);
        throw new Error("Data de nascimento inválida");
      }
    }

    // Executa atualização
    const result = await DB.updateUserColumn(table, id, sets, values);
    console.log(
      `${logPrefix} - Atualização concluída com sucesso. Linhas afetadas: ${result.rowCount}`
    );
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(`${logPrefix} - ERRO na atualização:`, error.message);
    } else {
      console.error(`${logPrefix} - ERRO na atualização:`, error);
    }
    throw error;
  }
};