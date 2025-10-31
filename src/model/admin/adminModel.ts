/**
 * =========================================
 * Model ADM
 * =========================================
 * Responsável por orquestrar a criação de Barreira, Acessibilidade e Subtipo de deficiência.
 * Serve como camada de abstração entre os controllers e as queries no DB.
 * Todas as funções retornam [status, message] seguindo padrão REST.
 */

import * as DB from "../../repositories/admin/adminRepository.js";
import { Acessibilidade } from "../entities/class/Accessibility.js";
import { Barreira } from "../entities/class/Barrier.js";
import { SubTipo } from "../entities/class/SubType.js";
import {logger} from "../../utils/logger.js";


/**
 * createBarreira
 * Cria uma nova barreira no sistema.
 * @param body - Objeto contendo { descricao: string }
 * @returns [status, message] - 201 se sucesso, 400 se erro
 */
export let createBarrier = async (body: any): Promise<any> => {
  logger.info("[POST / MODEL ADM]");

  try {
    // Instancia objeto Barreira
    let barreira = new Barreira(body.descricao, new Date());
    barreira.setId(); // Gera ID único

    // Chamada à camada de query para inserir no DB
    let [status, message] = await DB.createBarreira(
      barreira.id,
      barreira.descricao,
      barreira.created_at
    );

    return [status, message];
  } catch (error) {
    logger.error("[MODEL] Erro ao criar barreira:", error);
    return [400, String(error)];
  }
};

/**
 * createAcess
 * Cria uma nova acessibilidade no sistema.
 * @param body - Objeto contendo { descricao: string }
 * @returns [status, message] - 201 se sucesso, 400 se erro
 */
export let createAccessibility = async (body: any): Promise<any> => {
  logger.info("[POST / MODEL ADM]");

  try {
    let acess = new Acessibilidade(body.descricao, new Date());
    acess.setId(); // Gera ID único

    let [status, message] = await DB.createAcess(
      acess.id,
      acess.descricao,
      acess.created_at
    );

    return [status, message];
  } catch (error) {
    logger.error("[MODEL] Erro ao criar acessibilidade:", error);
    return [400, String(error)];
  }
};

/**
 * createSubTipo
 * Cria um novo subtipo de deficiência e realiza o relacionamento com barreira e acessibilidade.
 * @param body - Objeto contendo { descricao: string, tipo: string, barreira: string, acessibilidade: string }
 * @returns [status, message] - 201 se sucesso, 400 se erro
 */
export let createSubType = async (body: any): Promise<any> => {
  logger.info("[POST / MODEL ADM]");

  try {
    // Cria instância do SubTipo
    let subTipo = new SubTipo(body.descricao, body.tipo, new Date());
    subTipo.setId(); // Gera ID único

    // Chamada à camada de query para inserir no DB e criar relacionamentos
    let [status, message] = await DB.createSubTipo(
      subTipo.id,
      subTipo.descricao,
      subTipo.created_at,
      subTipo.tipo,
      body.barreira,
      body.acessibilidade
    );

    return [status, message];
  } catch (error) {
    logger.error("[MODEL] Erro ao criar subtipo:", error);
    return [400, String(error)];
  }
};


export let getAnalyticData = async (): Promise<any> => {
  logger.info("[GET / MODEL ADM]");
  try {
    // Chamada à camada de query para obter dados analíticos
    let [status, message] = await DB.getAnalyticData();
    logger.info(`[GET / MODEL ADM]`);
    return [status, message];
  } catch (error) {
    logger.error("[GET / MODEL ADM] Error getting analytic data:", error);
    return [500, String(error)];
  }
};
