import * as Model from "../../model/user//candidate/modelCandidate.js";
import { registerCandidateToVaga } from "../../model/vaga/modelVaga.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.status" });
/**
 * Controlador para criação de candidato.
 * Recebe os dados do corpo da requisição e passa para o modelo responsável pela criação.
 * @param body - Dados do candidato
 * @returns resultado da criação do candidato (boolean ou erro)
 */
export let controllerPostCandadate = async (body) => {
    console.log("[POST / CONTROLLER Candidato]");
    try {
        let [status, message] = await Model.createCanditado(body);
        if (status === 201) {
            return [status, message];
        }
        else {
            return [status, message];
        }
    }
    catch (error) {
        return [400, String(error)];
    }
};
/**
 * Controlador para obter todos os candidatos.
 * Busca os dados no banco, valida a resposta e retorna uma lista ou mensagem.
 * @returns array de candidatos ou mensagem de erro
 */
export let controllerGetCandidato = async () => {
    console.log("[GET / CONTROLLER Candidato]");
    try {
        let [status, message] = await Model.getUser("tb_candidato");
        return [status, message];
    }
    catch (error) {
        return [400, String(error)];
    }
};
/**
 * Controlador para obter candidato pelo ID.
 * Consulta o banco com o ID informado e retorna o candidato ou mensagem de erro.
 * @param id - ID do candidato
 * @returns objeto candidato ou mensagem de erro
 */
export let controllerGetCandidatoById = async (id) => {
    console.log("[GET / CONTROLLER Candidato]");
    try {
        let [status, message] = await Model.getUserByID("tb_candidato", id);
        return [status, message];
    }
    catch (error) {
        return [400, String(error)];
    }
};
/**
 * Controlador para deletar candidato pelo ID.
 * Executa o delete e valida se a remoção foi feita com sucesso.
 * @param id - ID do candidato a ser deletado
 * @returns resultado do delete ou false se não encontrado
 */
export let controllerDeleteCandidato = async (id) => {
    console.log("[DELETE / CONTROLLER Candidato]");
    try {
        let [status, message] = await Model.deleteUser("tb_candidato", id);
        return [status, message];
    }
    catch (error) {
        return [400, String(error)];
    }
};
/**
 * Controlador para atualização de dados do candidato.
 * Recebe o ID e os dados para atualização e chama o modelo responsável.
 * @param id - ID do candidato a ser atualizado
 * @param body - Dados para atualização
 * @returns resultado da atualização
 */
export let controllerUpdateCandidato = async (id, body) => {
    console.log(`🚀 Iniciando controllerUpdateCandidato para ID: ${id} com dados:`, body);
    let result = await Model.updateUser("tb_candidato", id, body);
    console.log("✔️ Atualização concluída, resultado:", result);
    return result;
};
/**
 * Controlador para inscrição do candidato em vaga.
 * Recebe IDs do candidato e da vaga e executa o registro.
 * @param id_candidate - ID do candidato
 * @param id_vaga - ID da vaga
 * @returns resultado do registro da candidatura
 */
export let candidatarVaga = async (id_candidate, id_vaga) => {
    console.log(`🚀 Iniciando candidatarVaga para candidato: ${id_candidate} e vaga: ${id_vaga}`);
    let result = await registerCandidateToVaga(id_candidate, id_vaga);
    console.log("✔️ Resultado do registro de candidatura:", result);
    return result;
};
