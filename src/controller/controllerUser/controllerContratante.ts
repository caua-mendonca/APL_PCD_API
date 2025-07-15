import { createContratante } from "../../model/createUser/createUser.js";
import * as DB from "../../repository/insertDB/queryTools.js";
import { getUser } from "../../model/getUser/getUser.js";
import { get } from "http";

export let controllerContratante = (user:{
         nome_fantasia: string, razao_social: string, email: string, confirme_email: string, senha: string, confirme_senha: string, cnpj: string, telefone: string
}) => {
    console.log("Passando ao createContratante()")
    let response = createContratante(user);

    return response
};

export let controllerGetContratante = async () => {
    console.log("Passando ao controllerGetContratante()")
    let result = await getUser("contratante");
    // if (result.rows.length > 0) {
    //     return result;
    // } else {
    //     return { message: "Nenhum contratante encontrado." };
    // }

    console.log("Contratantes encontrados:", result.rows);
    return result.rows;
}
