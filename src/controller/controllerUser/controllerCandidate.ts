import { createCanditado } from "../../model/createUser/createUser.js";

export let controllerCandadate = (body:{
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

    let response = createCanditado(body);

    return response
};
