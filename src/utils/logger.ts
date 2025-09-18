import express from "express";
import * as Routes from "../routes/routes.js";
import * as controllerCandidate from "../controller/user/controllerCandidate.js";
import * as controllerContratante from "../controller/user/controllerContratante.js";
import * as controllerColaborador from "../controller/user/controllerColaborador.js";
import * as Middleware from "../middleware/middleware.js";
import cors from "cors";
import * as Login from "../controller/login/login.js";
import { changePassword } from "../controller/login/changePass.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

const APP = express();
APP.use(express.json());
APP.use(cors());

/**
 * Inicia o servidor e configura as rotas principais da aplicação
 * @param PORT - Porta do servidor HTTP
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

  APP.post(Routes.createCanditado, async (req, res) => {
    console.log(`Requisição recebida em ${Routes.createCanditado}`);
    try {
      let body = req.body;
      console.log(
        `[POST ${Routes.createCanditado}] Requisição recebida, corpo:`,
        body
      );

      let [status, message] = await controllerCandidate.controllerPostCandadate(
        body
      );
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

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

  APP.get(
    Routes.getCanditadoById,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      console.log(`Requisição recebida em ${Routes.getCanditadoById}`);

      try {
        const id = String(req.params.id);
        console.log(
          `[GET ${Routes.getCanditadoById}] Requisição recebida, corpo:`,
          id
        );
        let [status, message] =
          await controllerCandidate.controllerGetCandidatoById(id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.delete(
    Routes.deleteCanditado,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      console.log(`Requisição recebida em ${Routes.deleteCanditado}`);
      try {
        const id = String(req.params.id);
        console.log(
          `[GET ${Routes.deleteCanditado}] Requisição recebida, corpo:`,
          id
        );
        let [status, message] =
          await controllerCandidate.controllerDeleteCandidato(id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.put(
    Routes.updateCanditado,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      console.log(`🚀 [PUT / Candidato] Requisição recebida com dados:`, body);

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

  APP.post(Routes.createContratante, async (req, res) => {
    let body = req.body;
    console.log("[POST /contratante] Requisição recebida, corpo:", body);
    try {
      let [status, messagem] =
        await controllerContratante.controllerContratante(body);
      res.status(status).send({ message: messagem });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

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

  APP.delete(
    Routes.deleteContratante,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [DELETE / contratante] Requisição recebida`);
      try {
        let [status, message] =
          await controllerContratante.controllerDeleteContratante(id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.put(
    Routes.updateContratante,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      console.log(
        `🚀 [PUT / contratante] Requisição recebida com dados:`,
        body
      );

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

  APP.post(
    Routes.createColaborador,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      console.log(`🚀 [POST /colaborador] Requisição recebida`);
      try {
        let body = req.body;
        let id = req.params.id;

        let [status, message] =
          await controllerColaborador.controllerColaborador(body, id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(
    Routes.getColaborador,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [GET / colaborador] Requisição recebida`);

      try {
        let [status, message] =
          await controllerColaborador.controllerGetColaborador(
            "tb_empresa",
            id
          );
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Vaga
  // -----------------------------------

  APP.post(
    Routes.createVaga,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let body = req.body;
      let id = req.params.id;

      console.log(`🚀 [POST / vaga] Requisição recebida, corpo`);
      try {
        let [status, message] = await controllerColaborador.postVaga(body, id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.post(
    Routes.candidatarVaga,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      console.log(`🚀 [POST / vaga candidatar]`);
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

  APP.get(
    Routes.getVagas,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      console.log(`[POST /vagas] Requisição recebida`);

      try {
        let [status, message] = await controllerColaborador.getVaga();
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

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

  // -----------------------------------
  // Rotas CRUD Evento
  // -----------------------------------

  APP.post(
    Routes.createEvento,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const body = req.body;
      const id = req.params.id;

      console.log(`[POST / Evento] Iniciando criação de evento...`, {
        payload: body,
      });

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

  APP.get(
    Routes.getEvento,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`[GET / evento ] Solicitando eventos...`);

      try {
        const [status, message] = await controllerColaborador.getEvento(id);

        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

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

  APP.post(
    Routes.createCalendario,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = req.params.id;
      console.log(`[POST / calendario] Iniciando criação de calendário...`);

      try {
        const [status, message] = await controllerColaborador.postCalendario(
          id
        );

        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

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

  APP.post(Routes.loginEmp, async (req, res) => {
    const body = req.body;
    console.log(`[POST / login] Solicitando login de candidato...`);
    try {
      const [status, message] = await Login.loginEmp(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

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

  APP.post(Routes.loginAdm, async (req, res) => {
    const body = req.body;
    console.log(`[POST / login] Solicitando login de candidato...`);
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
};
