import { createContratante } from "../../model/createUser/createUser.js";
import * as DB from "../../repository/insertDB/queryTools.js";
import * as getUser  from "../../model/getUser/getUser.js";
import {deleteUser} from "../../model/deleteUser/deleteUser.js";
import { updateUser } from "../../model/updateUser/updateUser.js";


export let controllerContratante = (user:{
         nome_fantasia: string, razao_social: string, email: string, confirme_email: string, senha: string, confirme_senha: string, cnpj: string, telefone: string
}) => {
    console.log("Passando ao createContratante()")
    let response = createContratante(user);

    return response
};

export let controllerGetContratante = async () => {
    console.log("Passando ao controllerGetContratante()")
    let result = await getUser.getUser("contratante");
    // if (result.rows.length > 0) {
    //     return result;
    // } else {
    //     return { message: "Nenhum contratante encontrado." };
    // }

    console.log("Contratantes encontrados:", result.rows);
    return result.rows;
}

export let controllerGetContratanteById = async (id: number) => {
    console.log("Passando ao controllerGetContratanteById()")
    let result = await getUser.getUserByID("tb_empresa", id);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return { message: "Contratante não encontrado." };
    }
}

export let controllerDeleteContratante = async (id: number) => {
    console.log("Passando ao controllerDeleteContratante()")
    let result = await deleteUser("tb_empresa", id);
    if (result) {
        return true;
    } else {
        return false;
    }
}

export let controllerUpdateContratante = async (id: number, body: object) => {
    console.log("Passando ao controllerUpdateContratante()")
    let result = await updateUser("tb_empresa", id, body);
    if (result) {
        return result;
    } else {
        return false;
    }
}   