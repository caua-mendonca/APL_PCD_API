import { createContratante } from "../../model/createUser/createUser.js";

export let controllerContratante = (user:{
         nome_fantasia: string, razao_social: string, email: string, confirme_email: string, senha: number, confirme_senha: number, cnpj: string, telefone: string
}) => {

    let response = createContratante(user);

    return response
};

