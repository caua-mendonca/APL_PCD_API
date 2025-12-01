import dotenv from "dotenv";
dotenv.config();

import * as Server from "./server/server.js";
import { logger } from "./utils/logger.js";

/**
 * Porta na qual o servidor será inicializado.
 *
 * @type {number}
 */
let PORT: number = Number(process.env.PORT);

/**
 * Inicializa a conexão do servidor.
 *
 * - Carrega as variáveis de ambiente utilizando `dotenv`.
 * - Converte a porta definida no `.env` para número.
 * - Chama o método `conectServ` do módulo `logger.js`,
 *   responsável por registrar os logs da inicialização.
 *
 * @function
 * @param {number} PORT - Porta que o servidor deve escutar.
 * @returns {void} Não há retorno explícito, apenas inicialização e logs.
 */

try {
  Server.conectServ(PORT);
  logger.info("Servidor iniciado com sucesso!");
} catch (error) {
  logger.error("Erro ao iniciar o servidor: " + error);
}
