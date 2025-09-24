import * as DB from "../../repositories/vaga/vagaRepository.js";
import { validateDate } from "../../validation/validateData/validateDataVaga.js";
import { validateIdByRelation } from "../../validation/validateId/validateId.js";
import { Vaga } from "../entities/class/Vaga.js";
import jwt from "jsonwebtoken";
import dotevn from "dotenv";
import { getAcess } from "../../repositories/user/empresaRepository.js";
import { getEmpByColab } from "../../repositories/user/colaboradorRepository.js";
import { insertCandidateVaga } from "../../repositories/user/candidateRepository.js";
import {
  selectFromTable,
  selectFromNameWhere,
  deleteFromTable,
  selectFromIdWhere,
  updateUserColumn,
} from "../../repositories/shared/commonRepository.js";
dotevn.config();

export let getVagaModel = async (): Promise<any> => {
  console.log("[GET / CONTROLLER Vaga]");
  try {
    let [status, message] = await selectFromTable("tb_vaga");

    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export let getVagaById = async (id: string) => {
  console.log("[GET / MODEL Vaga]");
  try {
    let [status, message] = await selectFromIdWhere("tb_vaga", id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export let deleteVaga = async (id: string) => {
  console.log("[DELETE / MODEL Vaga]");
  try {
    let [status, message] = await deleteFromTable("tb_vaga", id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Cria uma nova vaga vinculada a uma empresa ou colaborador.
 * Realiza validação da data de término e gera um ID único para a vaga.
 * Insere a vaga nas tabelas relacionadas do banco de dados.
 *
 * @param vaga Dados da vaga a ser criada
 * @param id_empresa ID da empresa ou colaborador responsável pela vaga
 * @returns Promise<boolean> Retorna true se sucesso, false em caso de erro
 */
export let createVaga = async (
  vaga: {
    data_fim: Date;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    tipo: string;
  },
  id_empresa: string
): Promise<any> => {
  console.log("[POST / MODEL Vaga]");

  try {
    let errorLog: string[] = [];
    // Instancia um novo objeto Vaga com os dados recebidos
    let acessibilidade = await getAcess(id_empresa);
    let newVaga = new Vaga(
      new Date(vaga.data_fim),
      vaga.titulo,
      vaga.descricao,
      vaga.salario,
      vaga.localidade,
      acessibilidade[1][0].acessibilidade,
      vaga.tipo
    );

    // Geração do ID da vaga, com retry para garantir não ser vazio
    newVaga.setId(id_empresa);
    while (newVaga.id === "") {
      newVaga.setId(id_empresa);
    }

    // Validação da data de término da vaga
    if (!validateDate(newVaga.data_fim)) {
      errorLog.push("Data de fim inválida");
    }

    // Insere a vaga na tabela principal
    await DB.insertVaga(
      newVaga.id,
      newVaga.data_inicio,
      newVaga.data_fim,
      newVaga.status,
      newVaga.titulo,
      newVaga.descricao,
      newVaga.salario,
      newVaga.localidade,
      newVaga.acessibilidade,
      newVaga.tipo,
      id_empresa
    );
    // Verifica se o id_empresa refere-se a um colaborador para obter a empresa mãe

    if (id_empresa.toUpperCase().startsWith("COLAB")) {
      let empresaId = await getEmpByColab(id_empresa);

      let [status, message] = await DB.insertEmpVaga(newVaga, empresaId);
      return [status, message];
    } else {
      // Caso seja ID direto da empresa, insere diretamente
      let [status, message] = await DB.insertEmpVaga(newVaga, id_empresa);
      return [status, message];
    }
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Realiza a inscrição de um candidato em uma vaga específica.
 *
 * @param id_candidate ID do candidato que deseja se inscrever
 * @param id_vaga ID da vaga na qual o candidato se inscreverá
 * @returns Promise<any> Resultado da inserção no banco
 */
export let registerCandidateToVaga = async (
  id_candidate: string,
  id_vaga: string
): Promise<any> => {
  console.log("[POST / MODEL Vaga]");

  let errorLog: string[] = [];
  try {
    let id_candidateValid = await validateIdByRelation(
      id_candidate,
      "tb_candidato",
      "id"
    );
    if (id_candidateValid === false) errorLog.push(`Candidato inválido`);

    let hora = new Date();

    let [status, message] = await insertCandidateVaga(
      id_candidate,
      id_vaga,
      hora
    );
    return [status, message];
  } catch (error) {
    return [500, errorLog];
  }
};

export let updateVaga = async (body: any, id: string): Promise<any> => {
  console.log("[PUT / MODEL vaga]");
  try {
    let errorLog: string[] = [];
    // Monta os pares chave = valor para o UPDATE
    const keys = Object.keys(body);
    const values = Object.values(body);

    const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

    // Valida CPF se presente
    if (keys.includes("data_fim")) {
      const index = keys.indexOf("data_fim");
      if (!validateDate(body.data_fim) === false) {
        errorLog.push("Data de fim inválida");
      }
    }

    // Executa atualização
    const [status, message] = await updateUserColumn(
      "tb_vaga",
      id,
      sets,
      values
    );
    if (errorLog.length > 0) return [400, errorLog];
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};
