import * as Model from "../../model/adm/modelAdm.js";

/**
 * Controller para criação de uma nova barreira
 * @param body - Objeto contendo os dados da barreira
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export let createBarreira = async (body: any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER ADM] Iniciando criação de barreira...");

  try {
    const [status, message] = await Model.createBarreira(body);
    console.log(`[POST / CONTROLLER ADM] Resultado: ${status} - ${message}`);
    return [status, message];
  } catch (error) {
    console.error("[POST / CONTROLLER ADM] Erro ao criar barreira:", error);
    return [500, String(error)];
  }
};

/**
 * Controller para criação de uma nova acessibilidade
 * @param body - Objeto contendo os dados da acessibilidade
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export let createAcess = async (body: any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER ADM] Iniciando criação de acessibilidade...");

  try {
    const [status, message] = await Model.createAcess(body);
    console.log(`[POST / CONTROLLER ADM] Resultado: ${status} - ${message}`);
    return [status, message];
  } catch (error) {
    console.error("[POST / CONTROLLER ADM] Erro ao criar acessibilidade:", error);
    return [500, String(error)];
  }
};

/**
 * Controller para criação de um novo subtipo de deficiência
 * @param body - Objeto contendo os dados do subtipo
 * @returns [status, message] - Status HTTP e mensagem de resultado
 */
export let createSubTipo = async (body: any): Promise<[number, any]> => {
  console.log("[POST / CONTROLLER ADM] Iniciando criação de subtipo...");

  try {
    const [status, message] = await Model.createSubTipo(body);
    console.log(`[POST / CONTROLLER ADM] Resultado: ${status} - ${message}`);
    return [status, message];
  } catch (error) {
    console.error("[POST / CONTROLLER ADM] Erro ao criar subtipo:", error);
    return [500, String(error)];
  }
};
