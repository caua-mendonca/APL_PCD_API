import {createCanditado} from "../model/createUser";

export let controllerCandadate = (body:{
    name: string,
    email: string,
    confirme_email: string,
    senha: number,
    confirme_senha: number,
    telefone: string,
    cpf: string,
    data_nascimento: Date
}) => {

    return createCanditado(body);
};