import { validateCpf } from "./validateData/validadeteCpf.js";
import { Candidate } from "./class/candidate.js";
import { validateAge } from "./validateData/validateAge.js";
import * as DB from "../server/data/connect.js";
import { insertIntoCandidate } from "./insertDB/queryTools.js";
export let createCanditado = (user: {
  name: string;
  email: string;
  confirme_email: string;
  senha: number;
  confirme_senha: number;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
}) => {
  let newUser = new Candidate(
    user.name,
    user.email,
    user.confirme_email,
    user.senha,
    user.confirme_senha,
    user.telefone,
    user.cpf,
    user.data_nascimento
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

      insertIntoCandidate(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }
};
