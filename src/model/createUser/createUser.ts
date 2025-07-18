import { validateCpf } from "../validateData/validadeteCpf.js";
import { Candidate } from "../class/candidate.js";
import { Contratante } from "../class/contratante.js";
import { validateAge } from "../validateData/validateAge.js";
import { validateCNPJ } from "../validateData/validateCNPJ.js";
import * as query from "../../repository/insertDB/queryTools.js";
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
    
    console.log("Criando Candidato pela classe")
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
    newUser.setId();
    console.log("Validando Dados")
    let cpfIsValid: boolean = validateCpf(newUser.cpf);
    let dateIsValid: boolean = validateAge(newUser.data_nascimento);
    let emailIsValid: boolean = newUser.email === newUser.confirme_email;
    let passwordIsValid: boolean = newUser.senha === newUser.confirme_senha;

    !cpfIsValid ? errorLog.push("CPF inválido") : null;
    !dateIsValid ? errorLog.push("Data de nascimento inválida") : null;
    !emailIsValid ? errorLog.push("Emails não coincidem ou inválidos") : null;
    !passwordIsValid
      ? errorLog.push("Senhas não coincidem ou inválidas")
      : null;

    if (errorLog.length > 0) {
      console.log("Dados Invalidos")
      return errorLog;
    } else {
      console.log("Dados validos")
      query.insertIntoCandidate(newUser);
      return true;
    }
  } catch (error) {
    return error;
  }
};

export let createContratante = (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  cnpj: string;
  telefone: string;
}): any => {
  try {
    let errorLog = [];

    console.log("Criando Contratante pela classe")
    let newContratante = new Contratante(
      user.nome_fantasia,
      user.razao_social,
      user.email,
      user.confirme_email,
      user.senha,
      user.confirme_senha,
      user.cnpj,
      user.telefone
    );
 console.log("Validando Dados")
    let emailIsValid: boolean = newContratante.email === newContratante.confirme_email;
    let passwordIsValid: boolean = newContratante.senha === newContratante.confirme_senha;
    let cnpjIsValid: boolean = validateCNPJ(newContratante.cnpj);

    !cnpjIsValid ? errorLog.push("CNPJ inválido") : null;
    !emailIsValid ? errorLog.push("Emails não coincidem ou inválidos") : null;
    !passwordIsValid ? errorLog.push("Senhas não coincidem ou inválidas") : null;

    if (errorLog.length > 0) {
           console.log("Dados Invalidos")
      return errorLog;
    } else {
           console.log("Dados Validos")
      query.insertIntoContratante(newContratante);
      return "Sucesso ao criar contratante";
    }
  } catch (error) {
    return error;
  }
};

