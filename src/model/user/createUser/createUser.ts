import { validateCpf } from "../../validateData/validadeteCpf.js";
import { Candidate } from "../../entities/class/candidate.js";
import { Contratante } from "../../entities/class/contratante.js";
import { validateAge } from "../../validateData/validateAge.js";
import { validateCNPJ } from "../../validateData/validateCNPJ.js";
import * as query from "../../../repositories/queryTools.js";
import { validateId } from "../../validateId/validateId.js";

/**
 * Cria um novo candidato a partir dos dados fornecidos.
 * Valida os dados, gera ID único, e insere no banco se válido.
 * @param user - Objeto contendo os dados do candidato
 * @returns true se sucesso, array de erros caso dados inválidos, ou erro capturado
 */
export let createCanditado = (user: {
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_visual: boolean;
  def_fisica: boolean;
  def_auditiva: boolean;
  def_intelectual: boolean;
  outra_def: boolean;
  descricao_def: string;
  acessibilidade_trab: boolean;
  descricao_acessibilidade: string;
}): any => {
  try {
    console.log("🚀 Iniciando createCanditado - criando instância da classe Candidate");
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
      user.def_fisica,
      user.def_intelectual,
      user.outra_def,
      user.descricao_def,
      user.acessibilidade_trab,
      user.descricao_acessibilidade
    );

    // Gerar ID único para o candidato e validar
    newUser.setId();
    console.log("✔️ ID inicial criado:", newUser.id);

    let idIsValid: any = validateId(newUser.id);
    let cpfIsValid: boolean = validateCpf(newUser.cpf);
    let dateIsValid: boolean = validateAge(newUser.data_nascimento);
    let emailIsValid: boolean = newUser.email === newUser.confirme_email;
    let passwordIsValid: boolean = newUser.senha === newUser.confirme_senha;

    // Caso ID inválido, tenta gerar novamente até válido
    while (idIsValid == "") {
      newUser.setId();
      idIsValid = validateId(newUser.id);
      console.log("🔄 Gerando novo ID, tentando validar:", newUser.id);
    }
    console.log("✔️ ID validado:", newUser.id);

    // Validações de campos específicos e acumula erros se houver
    !cpfIsValid ? errorLog.push("CPF inválido") : null;
    !dateIsValid ? errorLog.push("Data de nascimento inválida") : null;
    !emailIsValid ? errorLog.push("Emails não coincidem ou inválidos") : null;
    !passwordIsValid ? errorLog.push("Senhas não coincidem ou inválidas") : null;

    if (errorLog.length > 0) {
      console.warn("❌ Dados inválidos encontrados:", errorLog);
      return errorLog;
    } else {
      console.log("✔️ Todos dados validados com sucesso, inserindo no banco");
      query.insertIntoCandidate(newUser);
      return true;
    }
  } catch (error) {
    console.error("❌ Erro capturado em createCanditado:", error);
    return error;
  }
};

/**
 * Cria um novo contratante a partir dos dados fornecidos.
 * Valida os dados, gera ID único, e insere no banco se válido.
 * @param user - Objeto contendo os dados do contratante
 * @returns mensagem de sucesso, array de erros caso dados inválidos, ou erro capturado
 */
export let createContratante = (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
  acessibilidade: string;
}): any => {
  try {
    let errorLog = [];

    console.log("🚀 Iniciando createContratante - criando instância da classe Contratante");
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

    // Gerar ID único para o contratante e validar
    newContratante.setId();
    console.log("✔️ ID inicial criado:", newContratante.id);
    while (newContratante.id == "") {
      newContratante.setId();
      console.log("🔄 Gerando novo ID para contratante:", newContratante.id);
    }
    console.log("✔️ ID validado para contratante:", newContratante.id);

    let emailIsValid: boolean = newContratante.email === newContratante.confirme_email;
    let passwordIsValid: boolean = newContratante.senha === newContratante.confirme_senha;
    let cnpjIsValid: boolean = validateCNPJ(newContratante.cnpj);

    // Validação dos campos importantes
    !cnpjIsValid ? errorLog.push("CNPJ inválido") : null;
    !emailIsValid ? errorLog.push("Emails não coincidem ou inválidos") : null;
    !passwordIsValid ? errorLog.push("Senhas não coincidem ou inválidas") : null;

    if (errorLog.length > 0) {
      console.warn("❌ Dados inválidos encontrados no contratante:", errorLog);
      return errorLog;
    } else {
      console.log("✔️ Dados do contratante validados com sucesso, inserindo no banco");
      query.insertIntoContratante(newContratante);
      return "Sucesso ao criar contratante";
    }
  } catch (error) {
    console.error("❌ Erro capturado em createContratante:", error);
    return error;
  }
};
