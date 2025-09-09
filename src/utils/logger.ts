import express from "express";
import * as Routes from "../routes/routes.js";
import * as controllerCandidate from "../controller/user/controllerCandidate.js";
import * as controllerContratante from "../controller/user/controllerContratante.js";
import * as controllerColaborador from "../controller/user/controllerColaborador.js";
import * as Middleware from "../middleware/middleware.js";
import cors from "cors";

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
    console.log(`✔️ Servidor iniciado e escutando na porta ${PORT}`);
  });

  // -----------------------------------
  // Rotas CRUD Candidato
  // -----------------------------------

  APP.post(Routes.createCanditado, async (req, res) => {
    let body = req.body;
    console.log("🚀 [POST /candidato] Requisição recebida, corpo:", body);

    let result = await controllerCandidate.controllerPostCandadate(body);

    if ((await result) == true) {
      console.log("✔️ [POST /candidato] Candidato criado com sucesso.");
      res.status(200).send("Sucesso ao criar o candidato");
    } else {
      console.warn("❌ [POST /candidato] Falha ao criar candidato:", result);
      res.status(400).send({ message: result });
    }
  });

  APP.get(
    Routes.getCanditado,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      console.log("🚀 [GET /candidato] Requisição recebida");

      try {
        let result = await controllerCandidate.controllerGetCandidato();
        console.log("✔️ [GET /candidato] Resultado recebido:", result);

        if (Array.isArray(result)) {
          res.status(200).send(result);
        } else {
          console.warn(
            "⚠️ [GET /candidato] Nenhum candidato encontrado:",
            result
          );
          res.status(404).send({ message: result });
        }
      } catch (error) {
        console.error("❌ [GET /candidato] Erro ao buscar candidatos:", error);
        res.status(500).send({ message: "Erro interno no servidor" });
      }
    }
  );

  APP.get(
    Routes.getCanditadoById,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [GET /candidato/${id}] Requisição recebida`);

      try {
        let result = await controllerCandidate.controllerGetCandidatoById(id);
        console.log(`✔️ [GET /candidato/${id}] Resultado recebido:`, result);

        if (result && typeof result === "object") {
          res.status(200).send(result);
        } else {
          console.warn(
            `⚠️ [GET /candidato/${id}] Candidato não encontrado:`,
            result
          );
          res.status(404).send({ message: result });
        }
      } catch (error) {
        console.error(
          `❌ [GET /candidato/${id}] Erro ao buscar candidato:`,
          error
        );
        res.status(500).send({ message: "Erro interno no servidor" });
      }
    }
  );

  APP.delete(
    Routes.deleteCanditado,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [DELETE /candidato/${id}] Requisição recebida`);

      try {
        let result = await controllerCandidate.controllerDeleteCandidato(id);
        if (result) {
          console.log(
            `✔️ [DELETE /candidato/${id}] Candidato deletado com sucesso.`
          );
          res.status(200).send({ message: "Candidato deletado com sucesso!" });
        } else {
          console.warn(
            `⚠️ [DELETE /candidato/${id}] Candidato não encontrado.`
          );
          res.status(404).send({ message: "Candidato não encontrado!" });
        }
      } catch (error) {
        console.error(
          `❌ [DELETE /candidato/${id}] Erro ao deletar candidato:`,
          error
        );
        res.status(500).send({ message: "Erro interno no servidor" });
      }
    }
  );

  APP.put(
    Routes.updateCanditado,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      console.log(
        `🚀 [PUT /candidato/${id}] Requisição recebida com dados:`,
        body
      );

      try {
        const result = await controllerCandidate.controllerUpdateCandidato(
          id,
          body
        );
        console.log(`✔️ [PUT /candidato/${id}] Atualização concluída:`, result);
        res.status(200).json({ status: "sucesso", result });
      } catch (error) {
        console.error(`❌ [PUT /candidato/${id}] Erro na atualização:`, error);
        res.status(500).json({ error: "Erro ao atualizar candidato." });
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Contratante
  // -----------------------------------

  APP.post(Routes.createContratante, async (req, res) => {
    let body = req.body;
    console.log("🚀 [POST /contratante] Requisição recebida, corpo:", body);

    let result = await controllerContratante.controllerContratante(body);
    if ((await result) == true) {
      console.log("✔️ [POST /contratante] Contratante criado com sucesso.");
      res.status(200).send(result);
    } else {
      console.warn(
        "❌ [POST /contratante] Falha ao criar contratante:",
        result
      );
      res.status(400).send({ message: result });
    }
  });

  APP.get(
    Routes.getContratante,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      console.log("🚀 [GET /contratante] Requisição recebida");

      let result = await controllerContratante.controllerGetContratante();
      console.log("✔️ [GET /contratante] Resultado recebido:", result);

      if (result) {
        res.status(200).send(result);
      } else {
        console.warn("⚠️ [GET /contratante] Nenhum contratante encontrado.");
        res.status(400).send({ message: result });
      }
    }
  );

  APP.get(
    Routes.getContratanteById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [GET /contratante/${id}] Requisição recebida`);

      let result = await controllerContratante.controllerGetContratanteById(id);
      console.log(`✔️ [GET /contratante/${id}] Resultado recebido:`, result);

      if (result) {
        res.status(200).send(result);
      } else {
        console.warn(`⚠️ [GET /contratante/${id}] Contratante não encontrado.`);
        res.status(400).send({ message: result });
      }
    }
  );

  APP.delete(
    Routes.deleteContratante,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [DELETE /contratante/${id}] Requisição recebida`);

      let result = await controllerContratante.controllerDeleteContratante(id);
      if (result) {
        console.log(
          `✔️ [DELETE /contratante/${id}] Contratante deletado com sucesso.`
        );
        res.status(200).send(result);
      } else {
        console.warn(
          `⚠️ [DELETE /contratante/${id}] Contratante não encontrado.`
        );
        res.status(400).send({ message: result });
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
        `🚀 [PUT /contratante/${id}] Requisição recebida com dados:`,
        body
      );

      let result = await controllerContratante.controllerUpdateContratante(
        id,
        body
      );
      if (result) {
        console.log(`✔️ [PUT /contratante/${id}] Atualização concluída.`);
        res.status(200).send(result);
      } else {
        console.warn(`❌ [PUT /contratante/${id}] Falha na atualização.`);
        res.status(400).send({ message: result });
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
      let body = req.body;
      let id = req.params.id;

      console.log(
        `🚀 [POST /colaborador/${id}] Requisição recebida, corpo:`,
        body
      );

      let result = await controllerColaborador.controllerColaborador(body, id);
      if (result) {
        console.log(
          `✔️ [POST /colaborador/${id}] Colaborador criado com sucesso.`
        );
        res.status(200).send(result);
      } else {
        console.warn(
          `❌ [POST /colaborador/${id}] Falha ao criar colaborador.`
        );
        res.status(400).send({ message: "Erro ao criar colaborador!" });
      }
    }
  );

  APP.get(
    Routes.getColaborador,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`🚀 [GET /colaborador/${id}] Requisição recebida`);

      console.log(`Tipo do ID recebido: ${typeof id}`);

      let result = await controllerColaborador.controllerGetColaborador(
        "tb_empresa",
        id
      );
      if (result) {
        console.log(`✔️ [GET /colaborador/${id}] Resultado recebido.`);
        res.status(200).send(result);
      } else {
        console.warn(
          `❌ [GET /colaborador/${id}] Erro ao buscar colaboradores.`
        );
        res.status(400).send({ message: "Erro ao buscar colaboradores!" });
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Vaga
  // -----------------------------------

  APP.post(Routes.createVaga, Middleware.authenticateTokenEmp, (req, res) => {
    let body = req.body;
    let id = req.params.id;

    console.log(`🚀 [POST /vaga/${id}] Requisição recebida, corpo:`, body);

    let result = controllerColaborador.postVaga(body, id);

    if (result) {
      console.log(`✔️ [POST /vaga/${id}] Vaga criada com sucesso.`);
      res.status(200).send(result);
    } else {
      console.warn(`❌ [POST /vaga/${id}] Falha ao criar vaga.`);
      res.status(400).send({ message: "Erro ao criar vaga!" });
    }
  });

  APP.post(
    Routes.candidatarVaga,
    Middleware.authenticateTokenCand,
    (req, res) => {
      let id_vaga = String(Object.values(req.body));
      let id_candidate = req.params.id;

      console.log(
        `🚀 [POST /vaga/candidatar/${id_candidate}] Requisição recebida para vaga: ${id_vaga}`
      );

      let result = controllerCandidate.candidatarVaga(id_candidate, id_vaga);
      if (result) {
        console.log(
          `✔️ [POST /vaga/candidatar/${id_candidate}] Candidatura realizada com sucesso.`
        );
        res.status(200).send(result);
      } else {
        console.warn(
          `❌ [POST /vaga/candidatar/${id_candidate}] Falha ao candidatar.`
        );
        res.status(400).send({ message: "Erro ao candidatar a vaga!" });
      }
    }
  );

  APP.get(
    Routes.getVagas,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      console.log(`🚀 [POST /vagas] Requisição recebida`);

      let result = await controllerColaborador.getVaga();

      if (result) {
        console.log(`✔️ [POST /vagas] Vagas encontradas: ${result.length}`);
        res.status(200).send(result);
      } else {
        console.warn(`❌ [POST /vagas] Erro ao buscar vagas.`);
        res.status(400).send({ message: "Erro ao buscar vagas!" });
      }
    }
  );

  APP.get(
    Routes.getVagasById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let id = String(req.params.id);

      console.log(`🚀 [GET /vaga/${id}] Requisição recebida`);

      let result = await controllerColaborador.getVagaById(id);

      if (result) {
        console.log(`✔️ [GET /vaga/${id}] Vaga encontrada: ${result.length}`);
        res.status(200).send(result);
      } else {
        console.warn(`❌ [GET /vaga/${id}] Erro ao buscar vaga.`);
        res.status(400).send({ message: "Erro ao buscar vaga!" });
      }
    }
  );

  APP.delete(
    Routes.deleteVaga,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let id = String(req.params.id);

      console.log(`🚀 [DELETE /vaga/${id}] Requisição recebida`);

      let result = await controllerColaborador.deleteVaga(id);

      if (result) {
        console.log(`✔️ [DELETE /vaga/${id}] Vaga deletada com sucesso.`);
        res.status(200).send(result);
      } else {
        console.warn(`❌ [DELETE /vaga/${id}] Erro ao deletar vaga.`);
        res.status(400).send({ message: "Erro ao deletar vaga!" });
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

      console.log(`📥 [POST /evento/${id}] Iniciando criação de evento...`, {
        payload: body,
      });

      try {
        const result = await controllerColaborador.postEvento(body, id);

        if (result === true) {
          console.log(`✅ [POST /evento/${id}] Evento criado com sucesso.`, {
            eventoId: id,
          });

          res.status(201).json({
            success: true,
            message: "Evento criado com sucesso.",
            data: {
              eventoId: id,
              ...body,
            },
          });
        } else {
          console.error(`❌ [POST /evento/${id}] Falha ao criar evento.`, {
            eventoId: id,
            payload: body,
          });

          res.status(400).json({
            success: false,
            message: "Erro ao criar evento.",
          });
        }
      } catch (error) {
        console.error(`💥 [POST /evento/${id}] Erro inesperado:`, error);

        res.status(500).json({
          success: false,
          message: "Erro interno ao processar a requisição.",
          error: error instanceof Error ? error.message : error,
        });
      }
    }
  );

  APP.get(
    Routes.getEvento,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`📥 [GET /evento/${id}] Solicitando eventos...`);

      try {
        const result = await controllerColaborador.getEvento(id);

        if (result && result.length > 0) {
          console.log(`✅ [GET /evento/${id}] Eventos encontrados.`, {
            quantidade: result.length,
          });

          res.status(200).json({
            success: true,
            message: `Foram encontrados ${result.length} evento(s) para o calendário ${id}.`,
            data: result,
          });
        } else {
          console.warn(`⚠️ [GET /evento/${id}] Nenhum evento encontrado.`);

          res.status(404).json({
            success: false,
            message: `Nenhum evento encontrado para o calendário ${id}.`,
            data: [],
          });
        }
      } catch (error) {
        console.error(`💥 [GET /evento/${id}] Erro ao buscar eventos:`, error);

        res.status(500).json({
          success: false,
          message: "Erro interno ao buscar eventos.",
          error: error instanceof Error ? error.message : error,
        });
      }
    }
  );

  APP.delete(
    Routes.deleteEvento,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(
        `📥 [DELETE /evento/${id}] Solicitando exclusão de evento...`
      );

      try {
        const result = await controllerColaborador.deleteEvento(id);

        if (result && result.rowCount > 0) {
          console.log(`✅ [DELETE /evento/${id}] Evento deletado com sucesso.`);

          res.status(200).json({
            success: true,
            message: `Evento ${id} deletado com sucesso.`,
            data: { eventoId: id },
          });
        } else {
          console.warn(
            `⚠️ [DELETE /evento/${id}] Nenhum evento encontrado para deletar.`
          );

          res.status(404).json({
            success: false,
            message: `Nenhum evento encontrado com o ID ${id}.`,
            data: [],
          });
        }
      } catch (error) {
        console.error(
          `💥 [DELETE /evento/${id}] Erro ao deletar evento:`,
          error
        );

        res.status(500).json({
          success: false,
          message: "Erro interno ao deletar evento.",
          error: error instanceof Error ? error.message : error,
        });
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
      console.log(
        `📥 [POST /calendario/${id}] Iniciando criação de calendário...`
      );

      try {
        const result = await controllerColaborador.postCalendario(id);

        if (result) {
          console.log(
            `✅ [POST /calendario/${id}] Calendário criado com sucesso.`
          );

          res.status(201).json({
            success: true,
            message: `Calendário criado com sucesso para a empresa ${id}.`,
            data: { empresaId: id },
          });
        } else {
          console.warn(
            `⚠️ [POST /calendario/${id}] Falha ao criar calendário.`
          );

          res.status(400).json({
            success: false,
            message: `Não foi possível criar o calendário para a empresa ${id}.`,
          });
        }
      } catch (error) {
        console.error(
          `💥 [POST /calendario/${id}] Erro ao criar calendário:`,
          error
        );

        res.status(500).json({
          success: false,
          message: "Erro interno ao criar calendário.",
          error: error instanceof Error ? error.message : error,
        });
      }
    }
  );

  APP.get(Routes.getCalendario, async (req, res) => {
    const id = String(req.params.id);
    console.log(`📥 [GET /calendario/${id}] Solicitando calendários...`);

    try {
      const result = await controllerColaborador.getCalendario(id);

      if (result && result.length > 0) {
        console.log(`✅ [GET /calendario/${id}] Calendários encontrados.`, {
          quantidade: result.length,
        });

        res.status(200).json({
          success: true,
          message: `Foram encontrados ${result.length} calendário(s) para a empresa ${id}.`,
          data: result,
        });
      } else {
        console.warn(
          `⚠️ [GET /calendario/${id}] Nenhum calendário encontrado.`
        );

        res.status(404).json({
          success: false,
          message: `Nenhum calendário encontrado para a empresa ${id}.`,
          data: [],
        });
      }
    } catch (error) {
      console.error(
        `💥 [GET /calendario/${id}] Erro ao buscar calendários:`,
        error
      );

      res.status(500).json({
        success: false,
        message: "Erro interno ao buscar calendários.",
        error: error instanceof Error ? error.message : error,
      });
    }
  });
};
