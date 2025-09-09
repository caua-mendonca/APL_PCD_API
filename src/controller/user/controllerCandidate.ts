import * as Model from "../../model/user/modelUser.js";
import { registerCandidateToVaga } from "../../model/vaga/modelVaga.js";
/**
 * Controlador para criação de candidato.
 * Recebe os dados do corpo da requisição e passa para o modelo responsável pela criação.
 * @param body - Dados do candidato
 * @returns resultado da criação do candidato (boolean ou erro)
 */
export let controllerPostCandadate = async (body: {
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_motora: boolean,
  def_auditiva: boolean,
  def_visual:boolean,
  sub_tipo: string,
  barreira: string,
  acessbilidade: string
}):Promise<any> => {
  console.log("🚀 Iniciando controllerPostCandadate - enviando dados para createCanditado");
  let response = await Model.createCanditado(body);
   console.log("✔️ createCanditado executado, resultado:", response);
  return response;
};

/**
 * Controlador para obter todos os candidatos.
 * Busca os dados no banco, valida a resposta e retorna uma lista ou mensagem.
 * @returns array de candidatos ou mensagem de erro
 */
export let controllerGetCandidato = async () => {
  console.log("🚀 Iniciando controllerGetCandidato");

  let result = await Model.getUser("tb_candidato");
  console.log(`✔️ Dados recebidos, total de candidatos: ${result.rowCount}`);

  if (result.rowCount > 0) {
    console.log("✔️ Lista de candidatos preparada para retorno");
    return result.rows;
  } else {
    console.warn("⚠️ Nenhum candidato encontrado");
    return "Candidato não encontrado";
  }
};

/**
 * Controlador para obter candidato pelo ID.
 * Consulta o banco com o ID informado e retorna o candidato ou mensagem de erro.
 * @param id - ID do candidato
 * @returns objeto candidato ou mensagem de erro
 */
export let controllerGetCandidatoById = async (id: string) => {
  console.log(`🚀 Iniciando controllerGetCandidatoById para ID: ${id}`);

  let result = await Model.getUserByID("Tb_candidato", id);
  console.log(`✔️ Resultado da consulta, quantidade: ${result.rows.length}`);

  if (result.rows.length > 0) {
    console.log("✔️ Candidato encontrado, retornando dados");
    return result.rows[0];
  } else {
    console.warn("⚠️ Candidato não encontrado");
    return "Candidato não encontrado";
  }
};

/**
 * Controlador para deletar candidato pelo ID.
 * Executa o delete e valida se a remoção foi feita com sucesso.
 * @param id - ID do candidato a ser deletado
 * @returns resultado do delete ou false se não encontrado
 */
export let controllerDeleteCandidato = async (id: string) => {
  console.log(`🚀 Iniciando controllerDeleteCandidato para ID: ${id}`);

  let result = await Model.deleteUser("tb_candidato", id);
  console.log(`✔️ Delete executado, linhas afetadas: ${result.rowCount}`);

  if (result.rowCount > 0) {
    console.log("✔️ Candidato deletado com sucesso");
    return result;
  } else {
    console.warn("⚠️ Candidato não encontrado para deleção");
    return false;
  }
};

/**
 * Controlador para atualização de dados do candidato.
 * Recebe o ID e os dados para atualização e chama o modelo responsável.
 * @param id - ID do candidato a ser atualizado
 * @param body - Dados para atualização
 * @returns resultado da atualização
 */
export let controllerUpdateCandidato = async (id: string, body: object) => {
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
export let candidatarVaga = async (id_candidate: string, id_vaga: string) => {
  console.log(`🚀 Iniciando candidatarVaga para candidato: ${id_candidate} e vaga: ${id_vaga}`);
  let result = await registerCandidateToVaga(id_candidate, id_vaga);
  console.log("✔️ Resultado do registro de candidatura:", result);
  return result;
};
