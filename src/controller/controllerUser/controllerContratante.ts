import { createContratante } from "../../model/createUser/createUser.js";

export let controllerContratante = (user:{
         nome_fantasia: string, razao_social: string, email: string, confirme_email: string, senha: string, confirme_senha: string, cnpj: string, telefone: string
}) => {

    let response = createContratante(user);

    return response
};

