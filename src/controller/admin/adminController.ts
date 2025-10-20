import * as Model from "../../model/admin/adminModel.js";
import { logger } from "../../utils/logger.js";

/**
 * Controller para criação de uma nova barreira
 * @param body - Objeto contendo os dados da barreira
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export const createBarrierController = async (body: any): Promise<[number, any]> => {
  logger.info("[POST / CONTROLLER ADMIN]");

  try {
    const [status, message] = await Model.createBarrier(body);
    logger.info(`[POST / CONTROLLER ADMIN]`);
    return [status, message];
  } catch (error) {
    logger.error("[POST / CONTROLLER ADMIN] Error creating barrier:", error);
    return [500, String(error)];
  }
};

/**
 * Controller para criação de uma nova acessibilidade
 * @param body - Objeto contendo os dados da acessibilidade
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export const createAccessibilityController = async (body: any): Promise<[number, any]> => {
  logger.info("[POST / CONTROLLER ADMIN]");

  try {
    const [status, message] = await Model.createAccessibility(body);
    logger.info(`[POST / CONTROLLER ADMIN]`);
    return [status, message];
  } catch (error) {
    logger.error("[POST / CONTROLLER ADMIN] Error creating accessibility:", error);
    return [500, String(error)];
  }
};

/**
 * Controller para criação de um novo subtipo de deficiência
 * @param body - Objeto contendo os dados do subtipo
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export const createSubTypeController = async (body: any): Promise<[number, any]> => {
  logger.info("[POST / CONTROLLER ADMIN]");

  try {
    const [status, message] = await Model.createSubType(body);
    logger.info(`[POST / CONTROLLER ADMIN]`);
    return [status, message];
  } catch (error) {
    logger.error("[POST / CONTROLLER ADMIN] Error creating subtype:", error);
    return [500, String(error)];
  }
};
