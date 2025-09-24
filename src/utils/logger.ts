import express from "express";
import * as Routes from "../routes/routes.js";
import * as controllerCandidate from "../controller/user/controllerCandidate.js";
import * as controllerContratante from "../controller/user/controllerContratante.js";
import * as controllerColaborador from "../controller/user/controllerColaborador.js";
import * as Middleware from "../middleware/middleware.js";
import cors from "cors";
import * as Login from "../controller/login/login.js";
import { changePassword } from "../controller/login/changePass.js";
import * as ADM from "../controller/adm/controllerAdm.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

const APP = express();
APP.use(express.json());
APP.use(cors());

/**
 * Função responsável por inicializar o servidor HTTP e configurar todas as rotas
 * da aplicação, incluindo:
 *
 * - CRUD de Candidato
 * - CRUD de Contratante
 * - CRUD de Colaborador
 * - CRUD de Vagas
 * - CRUD de Eventos
 * - CRUD de Calendário
 * - Rotas de Login (Candidato, Contratante, ADM)
 * - Rotas de alteração de senha
 * - Rotas administrativas (Acessibilidade, Barreiras, Subtipos)
 *
 * @function conectServ
 * @param {number} PORT - Porta onde o servidor Express irá escutar as requisições
 * @returns {void} Não retorna valores; apenas inicializa e gerencia os endpoints
 *
 * @example
 * // Inicializa servidor na porta definida no .env
 * conectServ(3000);
 */
export let conectServ = (PORT: number) => {
  // Inicializa servidor HTTP na porta especificada
  APP.listen(PORT, () => {
    try {
      console.log(`Servidor iniciado e escutando na porta ${PORT}`);
    } catch (error) {
      console.error("Erro ao iniciar o servidor:", error);
    }
  });

  // -----------------------------------
  // Rotas CRUD Candidato
  // -----------------------------------
  /**
   * @route POST /candidato
   * @description Cria um novo candidato
   * @access Público (requer autenticação para endpoints subsequentes)
   */
  APP.post(Routes.createCanditado, async (req, res) => {
    console.log(`Requisição recebida em ${Routes.createCanditado}`);
    try {
      let body = req.body;
      console.log(
        `[POST ${Routes.createCanditado}] Requisição recebida`
      );

      let [status, message] = await controllerCandidate.controllerPostCandadate(
        body
      );
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });
};

/**
 * @route GET /candidato
 * @description Retorna a lista completa de candidatos cadastrados.
 * @access Privado (requer autenticação de candidato)
 * @returns {Promise<void>} Retorna status HTTP e mensagem com os dados do candidato.
 */
APP.get(
  Routes.getCanditado,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    console.log(`Requisição recebida em ${Routes.getCanditado}`);

    try {
      console.log(`[GET ${Routes.getCanditado}] Requisição recebida`);
      let [status, message] =
        await controllerCandidate.controllerGetCandidato();
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * @route GET /candidato/byName
 * @description Busca candidato pelo nome informado no corpo da requisição.
 * @access Privado (requer autenticação de candidato)
 * @param {string} req.body.name - Nome do candidato a ser buscado.
 * @returns {Promise<void>} Retorna status HTTP e mensagem com os dados encontrados.
 */
APP.get(
  Routes.getCanditadoByName,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    console.log(`Requisição recebida em ${Routes.getCanditadoByName}`);

    try {
      const name = String(req.body.name);
      console.log(
        `[GET ${Routes.getCanditadoByName}] Requisição recebida, corpo`
      );
      let [status, message] =
        await controllerCandidate.controllerGetCandidatoById(name);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * @route DELETE /candidato/:id
 * @description Remove um candidato do sistema pelo ID informado.
 * @access Privado (requer autenticação de candidato)
 * @param {string} req.params.id - ID do candidato a ser excluído.
 * @returns {Promise<void>} Retorna status HTTP confirmando a exclusão ou erro.
 */
APP.delete(
  Routes.deleteCanditado,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    console.log(`Requisição recebida em ${Routes.deleteCanditado}`);
    try {
      const id = String(req.params.id);
      console.log(
        `[GET ${Routes.deleteCanditado}] Requisição recebida, corpo`
      );
      let [status, message] =
        await controllerCandidate.controllerDeleteCandidato(id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * @route PUT /candidato/:id
 * @description Atualiza os dados de um candidato existente.
 * @access Privado (requer autenticação de candidato)
 * @param {string} req.params.id - ID do candidato a ser atualizado.
 * @param {object} req.body - Dados a serem atualizados no candidato.
 * @returns {Promise<void>} Retorna status HTTP e mensagem de sucesso/erro.
 */
APP.put(
  Routes.updateCanditado,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    console.log(`[PUT / Candidato] Requisição recebida com dados`);

    try {
      const [status, message] =
        await controllerCandidate.controllerUpdateCandidato(id, body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// -----------------------------------
// Rotas CRUD Contratante
// -----------------------------------

/**
 * Rota responsável por criar um novo contratante.
 * Método: POST
 * Endpoint: /contratante
 *
 * @param {Request} req - Objeto de requisição contendo o corpo da requisição com os dados do contratante.
 * @param {Response} res - Objeto de resposta utilizado para retornar o status e mensagem da operação.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem indicando sucesso ou erro.
 */
APP.post(Routes.createContratante, async (req, res) => {
  let body = req.body;
  console.log("[POST /contratante] Requisição recebida, corpo");
  try {
    let [status, messagem] = await controllerContratante.controllerContratante(
      body
    );
    res.status(status).send({ message: messagem });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});

/**
 * Rota responsável por obter todos os contratantes.
 * Método: GET
 * Endpoint: /contratante
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição.
 * @param {Response} res - Objeto de resposta utilizado para retornar a lista de contratantes.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os contratantes encontrados ou erro.
 */
APP.get(
  Routes.getContratante,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    console.log("[GET /contratante] Requisição recebida");

    try {
      let [status, message] =
        await controllerContratante.controllerGetContratante();
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por buscar um contratante específico pelo ID.
 * Método: GET
 * Endpoint: /contratante/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo o parâmetro de rota `id`.
 * @param {Response} res - Objeto de resposta utilizado para retornar os dados do contratante.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os dados do contratante encontrado ou erro.
 */
APP.get(
  Routes.getContratanteById,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = String(req.params.id);
    console.log(`[GET / contratante] Requisição recebida`);

    try {
      let [status, message] =
        await controllerContratante.controllerGetContratanteById(id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por excluir um contratante pelo ID.
 * Método: DELETE
 * Endpoint: /contratante/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo o parâmetro de rota `id`.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da exclusão.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.delete(
  Routes.deleteContratante,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = String(req.params.id);
    console.log(`[DELETE / contratante] Requisição recebida`);
    try {
      let [status, message] =
        await controllerContratante.controllerDeleteContratante(id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por atualizar os dados de um contratante.
 * Método: PUT
 * Endpoint: /contratante/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID do contratante a ser atualizado.
 *   - `body`: Dados a serem atualizados.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da atualização.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.put(
  Routes.updateContratante,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = String(req.params.id);
    const body = req.body;
    console.log(`[PUT / contratante] Requisição recebida com dados`);

    try {
      let [status, message] =
        await controllerContratante.controllerUpdateContratante(id, body);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

// -----------------------------------
// Rotas CRUD Colaborador
// -----------------------------------
/**
 * Rota responsável por criar um colaborador vinculado a uma empresa.
 * Método: POST
 * Endpoint: /colaborador/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `body`: Dados do colaborador a ser criado.
 *   - `params.id`: ID da empresa responsável pelo vínculo.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da operação.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.post(
  Routes.createColaborador,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    console.log(`[POST /colaborador] Requisição recebida`);
    try {
      let body = req.body;
      let id = req.params.id;

      let [status, message] = await controllerColaborador.controllerColaborador(
        body,
        id
      );
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por obter os colaboradores vinculados a uma empresa.
 * Método: GET
 * Endpoint: /colaborador/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID da empresa para buscar os colaboradores.
 * @param {Response} res - Objeto de resposta utilizado para retornar a lista de colaboradores.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os dados dos colaboradores ou erro.
 */
APP.get(
  Routes.getColaborador,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = String(req.params.id);
    console.log(`[GET / colaborador] Requisição recebida`);

    try {
      let [status, message] =
        await controllerColaborador.controllerGetColaborador("tb_empresa", id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);


// -----------------------------------
// Rotas CRUD Vaga
// -----------------------------------

/**
 * Rota responsável por criar uma nova vaga vinculada a uma empresa.
 * Método: POST
 * Endpoint: /vaga/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `body`: Dados da vaga a ser criada.
 *   - `params.id`: ID da empresa responsável pela vaga.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da criação.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.post(
  Routes.createVaga,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    let body = req.body;
    let id = req.params.id;

    console.log(`[POST / vaga] Requisição recebida, corpo`);
    try {
      let [status, message] = await controllerColaborador.postVaga(body, id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por permitir que um candidato se candidate a uma vaga.
 * Método: POST
 * Endpoint: /vaga/candidatar/:id
 * Middleware: authenticateTokenCand (valida o token do candidato)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID do candidato.
 *   - `body`: ID da vaga (extraído do corpo).
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da candidatura.
 *
 * @returns {Promise<void>} Retorna o status HTTP e mensagem de sucesso ou erro.
 */
APP.post(
  Routes.candidatarVaga,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    console.log(`[POST / vaga candidatar]`);
    try {
      let id_vaga = String(Object.values(req.body));
      let id_candidate = req.params.id;
      let [status, message] = await controllerCandidate.candidatarVaga(
        id_candidate,
        id_vaga
      );
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por listar todas as vagas.
 * Método: GET
 * Endpoint: /vagas
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição.
 * @param {Response} res - Objeto de resposta utilizado para retornar a lista de vagas.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os dados das vagas ou erro.
 */
APP.get(Routes.getVagas, Middleware.authenticateTokenEmp, async (req, res) => {
  console.log(`[POST /vagas] Requisição recebida`);

  try {
    let [status, message] = await controllerColaborador.getVaga();
    res.status(status).send({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});

/**
 * Rota responsável por buscar uma vaga específica pelo ID.
 * Método: GET
 * Endpoint: /vaga/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo o parâmetro de rota `id`.
 * @param {Response} res - Objeto de resposta utilizado para retornar os dados da vaga.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os dados da vaga encontrada ou erro.
 */
APP.get(
  Routes.getVagasById,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    let id = String(req.params.id);

    console.log(`[GET / vaga] Requisição recebida`);

    try {
      let [status, message] = await controllerColaborador.getVagaById(id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por listar todas as vagas nas quais um candidato se inscreveu.
 * Método: GET
 * Endpoint: /vaga/candidato/:id
 * Middleware: authenticateTokenCand (valida o token do candidato)
 *
 * @param {Request} req - Objeto de requisição contendo o parâmetro de rota `id` do candidato.
 * @param {Response} res - Objeto de resposta utilizado para retornar as vagas associadas ao candidato.
 *
 * @returns {Promise<void>} Retorna o status HTTP e a lista de vagas ou erro.
 */
APP.get(
  Routes.getVagasByCandidato,
  Middleware.authenticateTokenCand,
  async (req, res) => {
    let id = String(req.params.id);

    console.log(`[GET / vaga] Requisição recebida`);

    try {
      let [status, message] = await controllerCandidate.getVagaInsert(id);

      res.status(status).json(message);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

/**
 * Rota responsável por excluir uma vaga específica pelo ID.
 * Método: DELETE
 * Endpoint: /vaga/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo o parâmetro de rota `id`.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da exclusão.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.delete(
  Routes.deleteVaga,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    console.log(`[DELETE / Vaga] Requisição recebida`);

    try {
      let id = String(req.params.id);
      let [status, message] = await controllerColaborador.deleteVaga(id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por atualizar os dados de uma vaga existente.
 * Método: PUT
 * Endpoint: /vaga/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID da vaga a ser atualizada.
 *   - `body`: Dados a serem atualizados.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da atualização.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem de sucesso ou erro.
 */
APP.put(
  Routes.updateVaga,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    console.log(`[PUT / Vaga] Requisição recebida`);

    try {
      let body = req.body;
      let id = String(req.params.id);
      let [status, message] = await controllerColaborador.updateVaga(body, id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);


// -----------------------------------
// Rotas CRUD Evento
// -----------------------------------

/**
 * Rota responsável por criar um novo evento associado a uma empresa.
 * Método: POST
 * Endpoint: /evento/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `body`: Dados do evento a ser criado.
 *   - `params.id`: ID da empresa que está criando o evento.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da criação.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem indicando o resultado da operação.
 */
APP.post(
  Routes.createEvento,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const body = req.body;
    const id = req.params.id;

    console.log(`[POST / Evento] Iniciando criação de evento`);

    try {
      const [status, message] = await controllerColaborador.postEvento(
        body,
        id
      );

      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável por listar todos os eventos associados a uma empresa.
 * Método: GET
 * Endpoint: /evento/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID da empresa para buscar os eventos.
 * @param {Response} res - Objeto de resposta utilizado para retornar os eventos encontrados.
 *
 * @returns {Promise<void>} Retorna o status HTTP e os eventos ou mensagem de erro.
 */
APP.get(Routes.getEvento, Middleware.authenticateTokenEmp, async (req, res) => {
  const id = String(req.params.id);
  console.log(`[GET / evento ] Solicitando eventos...`);

  try {
    const [status, message] = await controllerColaborador.getEvento(id);

    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});

/**
 * Rota responsável por excluir um evento específico pelo ID.
 * Método: DELETE
 * Endpoint: /evento/:id
 * Middleware: authenticateTokenEmp (valida o token da empresa)
 *
 * @param {Request} req - Objeto de requisição contendo:
 *   - `params.id`: ID do evento a ser excluído.
 * @param {Response} res - Objeto de resposta utilizado para retornar o resultado da exclusão.
 *
 * @returns {Promise<void>} Retorna o status HTTP e uma mensagem indicando o resultado da operação.
 */
APP.delete(
  Routes.deleteEvento,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = String(req.params.id);
    console.log(`[DELETE / Evento] Solicitando exclusão de evento...`);

    try {
      const [status, message] = await controllerColaborador.deleteEvento(id);

      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

// -----------------------------------
// Rotas CRUD Calendario
// -----------------------------------
/**
 * Rota responsável pela criação de um calendário.
 * 
 * 🔒 Autenticada via Middleware.authenticateTokenEmp
 * 
 * @route POST /calendario
 * @param {string} req.params.id - ID da empresa vinculada ao calendário.
 * @param {Request} req - Objeto de requisição Express contendo informações da chamada HTTP.
 * @param {Response} res - Objeto de resposta Express utilizado para enviar o retorno.
 * @returns {Promise<void>} Retorna um JSON contendo o status e a mensagem do processo.
 */
APP.post(
  Routes.createCalendario,
  Middleware.authenticateTokenEmp,
  async (req, res) => {
    const id = req.params.id;
    console.log(`[POST / calendario] Iniciando criação de calendário...`);

    try {
      const [status, message] = await controllerColaborador.postCalendario(id);

      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável pela consulta de calendários existentes.
 * 
 * 🔓 Endpoint público (sem autenticação).
 * 
 * @route GET /calendario
 * @param {string} req.params.id - ID de referência para buscar os calendários vinculados.
 * @param {Request} req - Objeto de requisição Express contendo informações da chamada HTTP.
 * @param {Response} res - Objeto de resposta Express utilizado para enviar o retorno.
 * @returns {Promise<void>} Retorna um JSON com o status da requisição e os calendários encontrados.
 */
APP.get(Routes.getCalendario, async (req, res) => {
  const id = String(req.params.id);
  console.log(`[GET / calendario] Solicitando calendários...`);

  try {
    const result = (await controllerColaborador.getCalendario(id)) ?? [];
    const [status, message] = result;

    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});


// -----------------------------------
// Rotas CRUD Login
// -----------------------------------

/**
 * Rota de autenticação de empresas.
 *
 * @route POST /loginEmp
 * @param {Object} req.body - Credenciais de login enviadas no corpo da requisição.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna um JSON com o status da requisição e a mensagem do processo.
 */
APP.post(Routes.loginEmp, async (req, res) => {
  const body = req.body;
  console.log(`[POST / login] Solicitando login de empresa...`);
  try {
    const [status, message] = await Login.loginEmp(body);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});

/**
 * Rota de autenticação de candidatos.
 *
 * @route POST /loginCand
 * @param {Object} req.body - Credenciais de login enviadas no corpo da requisição.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna um JSON com o status da requisição e a mensagem do processo.
 */
APP.post(Routes.loginCand, async (req, res) => {
  const body = req.body;
  console.log(`[POST / login] Solicitando login de candidato...`);
  try {
    const [status, message] = await Login.loginCand(body);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});

/**
 * Rota de autenticação de administradores.
 *
 * @route POST /loginAdm
 * @param {Object} req.body - Credenciais de login enviadas no corpo da requisição.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna um JSON com o status da requisição e a mensagem do processo.
 */
APP.post(Routes.loginAdm, async (req, res) => {
  const body = req.body;
  console.log(`[POST / login] Solicitando login de administrador...`);
  try {
    const [status, message] = await Login.loginAdm(body);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});


// -----------------------------------
// Rotas Change Password
// -----------------------------------
/**
 * Rota responsável pela troca de senha de um usuário (candidato, empresa ou administrador).
 *
 * @route POST /changePassword/:id
 * @param {Object} req.body - Objeto contendo os dados necessários para alteração de senha (ex: senha antiga, nova senha).
 * @param {string} req.params.id - ID do usuário que terá a senha alterada.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express utilizado para retornar o resultado da operação.
 * @returns {Promise<void>} Retorna um JSON com o status da operação e a mensagem correspondente.
 */
APP.post(Routes.changePassword, async (req, res) => {
  console.log(`[POST / changePassword] Solicitando troca de senha...`);
  try {
    const body = req.body;
    const id = req.params.id;

    const [status, message] = await changePassword(body, id);
    res.status(status).json({ message: message });
  } catch (error) {
    res.status(500).send({ message: String(process.env.STATUS_500) });
  }
});


// -----------------------------------
// Rotas ADM
// -----------------------------------

/**
 * Rota responsável pela criação de barreiras no sistema.
 *
 * 🔒 Requer autenticação de administrador.
 *
 * @route POST /createBarreira
 * @param {Object} req.body - Dados necessários para criar uma nova barreira.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna JSON com status da operação e mensagem correspondente.
 */
APP.post(
  Routes.createBarreira,
  Middleware.authenticateTokenADM,
  async (req, res) => {
    console.log(`[POST / createBarreira] Solicitando criação de barreira...`);
    try {
      const body = req.body;

      const [status, message] = await ADM.createBarreira(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável pela criação de acessibilidades no sistema.
 *
 * 🔒 Requer autenticação de administrador.
 *
 * @route POST /createAcessibilidade
 * @param {Object} req.body - Dados necessários para criar uma nova acessibilidade.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna JSON com status da operação e mensagem correspondente.
 */
APP.post(
  Routes.createAcessibilidade,
  Middleware.authenticateTokenADM,
  async (req, res) => {
    console.log(
      `[POST / createAcessibilidade] Solicitando criação de barreira...`
    );
    try {
      const body = req.body;

      const [status, message] = await ADM.createAcess(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

/**
 * Rota responsável pela criação de subtipos no sistema.
 *
 * 🔒 Requer autenticação de administrador.
 *
 * @route POST /createSubTipo
 * @param {Object} req.body - Dados necessários para criar um novo subtipo.
 * @param {Request} req - Objeto da requisição Express.
 * @param {Response} res - Objeto de resposta Express.
 * @returns {Promise<void>} Retorna JSON com status da operação e mensagem correspondente.
 */
APP.post(
  Routes.createSubTipo,
  Middleware.authenticateTokenADM,
  async (req, res) => {
    console.log(`[POST / createSubTipo] Solicitando criação de subtipo...`);
    try {
      const body = req.body;

      const [status, message] = await ADM.createSubTipo(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  }
);

