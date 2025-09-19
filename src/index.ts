import * as Server from "./utils/logger.js";
import dotenv from 'dotenv';

dotenv.config();

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
Server.conectServ(PORT);
