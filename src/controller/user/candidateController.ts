import * as dotenv from "dotenv";
import * as Model from "../../model/user/candidate/candidateModel.js";
import {logger} from "../../utils/logger.js";
dotenv.config({ path: ".env.status" });


/**
 * Controlador para criação de candidato.
 * Recebe os dados do corpo da requisição e passa para o modelo responsável pela criação.
 * @param body - Dados do candidato
 * @returns resultado da criação do candidato (boolean ou erro)
 */
export const createCandidateController = async (body: {
  name: string;
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
  phone: string;
  cpf: string;
  birth_date: Date;
  motor_disability: boolean;
  hearing_disability: boolean;
  visual_disability: boolean;
  sub_type: string;
  barrier: string;
  accessibility: string;
}): Promise<[number, string]> => {
  try {
    // const candidateService =
    //   container.resolve<CandidateService>("CandidateService");
    const mappedBody = {
      name: body.name,
      email: body.email,
      confirme_email: body.confirm_email,
      senha: body.password,
      confirme_senha: body.confirm_password,
      telefone: body.phone,
      cpf: body.cpf,
      data_nascimento: body.birth_date,
      def_motora: body.motor_disability,
      def_auditiva: body.hearing_disability,
      def_visual: body.visual_disability,
      sub_tipo: body.sub_type,
      barreira: body.barrier,
      acessbilidade: body.accessibility,
    };
    return await Model.createCandidate(mappedBody);
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controlador para obter todos os candidatos.
 * Busca os dados no banco, valida a resposta e retorna uma lista ou mensagem.
 * @returns array de candidatos ou mensagem de erro
 */

export const getCandidatesController = async (): Promise<
  [number, string[] | string]> => {
  try {
    return await Model.getUser("tb_candidato");
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controlador para obter candidato pelo ID.
 * Consulta o banco com o ID informado e retorna o candidato ou mensagem de erro.
 * @param id - ID do candidato
 * @returns objeto candidato ou mensagem de erro
 */
export const getCandidateByNameController = async (name: string) => {
  try {
    return await Model.getUserByName("tb_candidato", name);
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controlador para deletar candidato pelo ID.
 * Executa o delete e valida se a remoção foi feita com sucesso.
 * @param id - ID do candidato a ser deletado
 * @returns resultado do delete ou false se não encontrado
 */
export const deleteCandidateController = async (id: string): Promise<any> => {
  logger.info("[DELETE / CONTROLLER Candidate]");

  try {
    const [status, message] = await Model.deleteUser("tb_candidato", id);
    return [status, message];
  } catch (error) {
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
export const updateCandidateController = async (
  id: string,
  body: object
): Promise<any> => {
  logger.info("[PUT / CONTROLLER Candidate]");
  try {
    const [status, message] = await Model.updateUser("tb_candidato", id, body);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export const getCandidateJobsController = async (id: string): Promise<any> => {
  logger.info("[GET / CONTROLLER Job]");

  try {
    const [status, message] = await Model.getUserById(id);
    return [status, message];
  } catch (error) {
    return [400, error];
  }
};


export const applyToJobController = async (
  candidateId: string,
  jobId: string
): Promise<any> => {
  logger.info("[POST / CONTROLLER Apply to Job]"); 
  try {
    const [status, message] = await Model.applyToJob(candidateId, jobId);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};