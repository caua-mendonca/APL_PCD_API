import { validateCpf } from "../validateData/validadeteCpf.js";
import { Candidate } from "../class/candidate.js";
import { Contratante } from "../class/contratante.js";
import { validateAge } from "../validateData/validateAge.js";
import {validateCNPJ} from '../validateData/validateCNPJ.js'
import * as DB from "../../server/data/connect.js";
import * as query from "../insertDB/queryTools.js";
export let createCanditado = (user: {
      name: string,
      email: string,
      confirme_email: string,
      senha: string,
      confirme_senha: string,
      telefone: string,
      cpf: string,
      data_nascimento: Date,
      def_visual: boolean,
      def_fisica: boolean,
      def_auditiva: boolean,
      def_intelectual: boolean,
      outra_def: boolean,
      descricao_def: string,
      acessibilidade_trab: boolean,
      descricao_acessibilidade: string
}) => {
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

  if (newUser) {
    let cpfIsValid: boolean = validateCpf(newUser.cpf);
    let dateIsValid: boolean = validateAge(newUser.data_nascimento);
    let emailIsValid: boolean = newUser.email === newUser.confirme_email;
    let passwordIsValid: boolean = newUser.senha === newUser.confirme_senha;

    try {
      if (!cpfIsValid) throw new Error("CPF inválido");
      if (!dateIsValid) throw new Error("Data de nascimento inválida");
      if (!emailIsValid) throw new Error("Emails não coincidem ou inválidos");
      if (!passwordIsValid)
        throw new Error("Senhas não coincidem ou inválidas");
  
      query.insertIntoCandidate(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }
};

export let createContratante = (user: {
  nome_fantasia: string;
  razao_social: string;
  email: string;
  confirme_email: string;
  senha: number;
  confirme_senha: number;
  cnpj: string;
  telefone: string;
}) => {
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

  if (newContratante) {
    let emailIsValid: boolean =
      newContratante.email === newContratante.confirme_email;
    let passwordIsValid: boolean =
      newContratante.senha === newContratante.confirme_senha;
      let cnpjIsValid: boolean = validateCNPJ(newContratante.cnpj);
    try {
      try {
      if (!cnpjIsValid) throw new Error("CNPJ inválido");
      if (!emailIsValid) throw new Error("Emails não coincidem ou inválidos");
      if (!passwordIsValid)
        throw new Error("Senhas não coincidem ou inválidas");

      query.insertIntoContratante(newContratante);
      return true;
    } catch (error) {
      return false;
    }
    } catch (error) {
      return false;
    }
  }
};
