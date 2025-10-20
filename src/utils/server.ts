import express from "express";
import * as Routes from "../routes/routes.js";
import * as candidateController from "../controller/user/candidateController.js";
import * as companyController from "../controller/user/companyController.js";
import * as employeeController from "../controller/user/employeeController.js";
import * as Middleware from "../middleware/middleware.js";
import cors from "cors";
import * as Login from "../controller/login/login.js";
import { changePassword } from "../controller/login/changePass.js";
import * as adminController from "../controller/admin/adminController.js";
import { logger } from "../utils/logger.js";
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
    logger.info(`Servidor iniciado e escutando na porta ${PORT}`);
  });

  APP.get("/", (req, res) => {
    logger.info("Rota inicial chamada");
    res.send("API APL PCD funcionando!");
  });

  // -----------------------------------
  // Rotas CRUD Candidato
  // -----------------------------------

  APP.post(Routes.createCandidate, async (req, res) => {
    logger.http(`rota: ${Routes.createCandidate}. Operação: Create Candidate`);
    try {
      let body = req.body;
      let [status, message] =
        await candidateController.createCandidateController(body);
      res.status(status).send({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  APP.get(
    Routes.getCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      logger.http(`rota: ${Routes.getCandidate}. Operação: Get Candidate`);
      try {
        let [status, message] =
          await candidateController.getCandidatesController();
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.delete(
    Routes.deleteCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      logger.http(
        `rota: ${Routes.deleteCandidate}. Operação: Delete Candidate`
      );
      try {
        const id = String(req.params.id);
        let [status, message] =
          await candidateController.deleteCandidateController(id);
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.put(
    Routes.updateCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      logger.http(
        `rota: ${Routes.updateCandidate}. Operação: Update Candidate`
      );
      try {
        const [status, message] =
          await candidateController.updateCandidateController(id, body);
        res.status(status).json({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).json({ error: error });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Contratante
  // -----------------------------------

  APP.post(Routes.createCompany, async (req, res) => {
    let body = req.body;
    logger.http(`rota: ${Routes.createCompany}. Operação: Create Company`);
    try {
      let [status, message] = await companyController.createCompanyController(
        body
      );
      res.status(status).send({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  APP.get(
    Routes.getCompany,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      logger.http(`rota: ${Routes.getCompany}. Operação: Get Company`);
      try {
        let [status, message] =
          await companyController.getCompaniesController();
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.get(
    Routes.getCompanyById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      logger.http(
        `rota: ${Routes.getCompanyById}. Operação: Get Company By Id`
      );

      try {
        let [status, message] =
          await companyController.getCompanyByIdController(id);
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.delete(
    Routes.deleteCompany,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      logger.http(`rota: ${Routes.deleteCompany}. Operação: Delete Company`);
      try {
        let [status, message] = await companyController.deleteCompanyController(
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.put(
    Routes.updateCompany,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      logger.http(`rota: ${Routes.updateCompany}. Operação: Update Company`);
      try {
        let [status, message] = await companyController.updateCompanyController(
          id,
          body
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );
  // -----------------------------------
  // Rotas CRUD Colaborador
  // -----------------------------------

  APP.post(
    Routes.createEmployee,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      logger.http(`rota: ${Routes.createEmployee}. Operação: Create Employee`);

      try {
        let body = req.body;
        let id = req.params.id;

        let [status, message] =
          await employeeController.createEmployeeController(body, id);
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.get(
    Routes.getEmployee,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      logger.http(`rota: ${Routes.getEmployee}. Operação: Get Employee`);

      try {
        let [status, message] = await employeeController.getEmployeeController(
          "tb_colaborador",
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Vaga
  // -----------------------------------

  APP.post(
    Routes.createJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let body = req.body;
      let id = req.params.id;
      logger.http(`rota: ${Routes.createJob}. Operação: Create Job`);

      try {
        let [status, message] = await employeeController.createJobController(
          body,
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.post(
    Routes.applyToJob,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      try {
        let id_vaga = String(Object.values(req.body));
        let id_candidate = req.params.id;
        let [status, message] = await candidateController.applyToJobController(
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
    Routes.getJobs,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      logger.http(`rota: ${Routes.getJobs}. Operação: Get Jobs`);

      try {
        let [status, message] = await employeeController.getJobsController();
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.get(
    Routes.getJobById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let id = String(req.params.id);
      logger.http(`rota: ${Routes.getJobById}. Operação: Get Job By Id`);

      try {
        let [status, message] = await employeeController.getJobByIdController(
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.get(
    Routes.getJobsByCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      let id = String(req.params.id);
      logger.http(
        `rota: ${Routes.getJobsByCandidate}. Operação: Get Jobs By Candidate`
      );
      try {
        logger.info(`[GET / vaga] Requisição recebida`);
        let [status, message] =
          await candidateController.getCandidateJobsController(id);

        res.status(status).json(message);
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).json(error);
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.delete(
    Routes.deleteJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      logger.http(`rota: ${Routes.deleteJob}. Operação: Delete Job`);

      try {
        let id = String(req.params.id);
        let [status, message] = await employeeController.deleteJobController(
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.put(
    Routes.updateJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      logger.http(`rota: ${Routes.updateJob}. Operação: Update Job`);
      try {
        let body = req.body;
        let id = String(req.params.id);
        let [status, message] = await employeeController.updateJobController(
          body,
          id
        );
        res.status(status).send({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Evento
  // -----------------------------------

  APP.post(
    Routes.createEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      res.status(503).send({ message: "Serviço indisponível" });

      // const body = req.body;
      // const id = req.params.id;
      // logger.http(`rota: ${Routes.createEvent}. Operação: Create Event`);
      // try {
      //   logger.info(`[POST / Evento] Iniciando criação de evento...`);
      //   const [status, message] =
      //     await employeeController.createEventController(body, id);

      //   res.status(status).json({ message: message });
      //   logger.info("Rota completa com sucesso.", {
      //     message: message,
      //     status: status,
      //   });
      // } catch (error) {
      //   res.status(500).send({ message: String(process.env.STATUS_500) });
      //   logger.error("Erro na rota: " + error);
      // }
    }
  );

  APP.get(
    Routes.getEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      res.status(503).send({ message: "Serviço indisponível" });

      // const id = String(req.params.id);
      // logger.http(`rota: ${Routes.getEvent}. Operação: Get Event`);

      // try {
      //   const [status, message] = await employeeController.getEventController(
      //     id
      //   );

      //   res.status(status).json({ message: message });
      //   logger.info("Rota completa com sucesso.", {
      //     message: message,
      //     status: status,
      //   });
      // } catch (error) {
      //   res.status(500).send({ message: String(process.env.STATUS_500) });
      //   logger.error("Erro na rota: " + error);
      // }
    }
  );

  APP.delete(
    Routes.deleteEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      res.status(503).send({ message: "Serviço indisponível" });

      // const id = String(req.params.id);
      // logger.http(`rota: ${Routes.deleteEvent}. Operação: Delete Event`);

      // try {
      //   logger.info(`[DELETE / Evento] Solicitando exclusão de evento...`);
      //   const [status, message] =
      //     await employeeController.deleteEventController(id);

      //   res.status(status).json({ message: message });
      //   logger.info("Rota completa com sucesso.", {
      //     message: message,
      //     status: status,
      //   });
      // } catch (error) {
      //   res.status(500).send({ message: String(process.env.STATUS_500) });
      //   logger.error("Erro na rota: " + error);
      // }
    }
  );

  // -----------------------------------
  // Rotas CRUD Calendario
  // -----------------------------------

  APP.post(
    Routes.createCalendar,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      res.status(503).send({ message: "Serviço indisponível" });

      // const id = req.params.id;
      // logger.http(`rota: ${Routes.createCalendar}. Operação: Create Calendar`);

      // try {
      //   const [status, message] =
      //     await employeeController.createCalendarController(id);

      //   res.status(status).json({ message: message });
      //   logger.info("Rota completa com sucesso.", {
      //     message: message,
      //     status: status,
      //   });
      // } catch (error) {
      //   res.status(500).send({ message: String(process.env.STATUS_500) });
      //   logger.error("Erro na rota: " + error);
      // }
    }
  );

  APP.get(Routes.getCalendar, async (req, res) => {
    res.status(503).send({ message: "Serviço indisponível" });

    // const id = String(req.params.id);
    // logger.http(`rota: ${Routes.getCalendar}. Operação: Get Calendar`);

    // try {
    //   logger.info(`[GET / calendario] Solicitando calendários...`);
    //   const result = (await employeeController.getCalendarController(id)) ?? [];
    //   const [status, message] = result;

    //   res.status(status).json({ message: message });
    //   logger.info("Rota completa com sucesso.", {
    //     message: message,
    //     status: status,
    //   });
    // } catch (error) {
    //   res.status(500).send({ message: String(process.env.STATUS_500) });
    //   logger.error("Erro na rota: " + error);
    // }
  });

  // -----------------------------------
  // Rotas CRUD Login
  // -----------------------------------

  APP.post(Routes.loginCompany, async (req, res) => {
    const body = req.body;
    logger.http(`rota: ${Routes.loginCompany}. Operação: Login Company`);

    try {
      const [status, message] = await Login.loginCompany(body);
      res.status(status).json({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  APP.post(Routes.loginCandidate, async (req, res) => {
    const body = req.body;
    logger.http(`rota: ${Routes.loginCandidate}. Operação: Login Candidate`);
    try {
      const [status, message] = await Login.loginCandidate(body);
      res.status(status).json({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  APP.post(Routes.loginAdmin, async (req, res) => {
    const body = req.body;
    logger.http(`rota: ${Routes.loginAdmin}. Operação: Login Admin`);

    try {
      const [status, message] = await Login.loginAdmin(body);
      res.status(status).json({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  // -----------------------------------
  // Rotas Change Password
  // -----------------------------------

  APP.post(Routes.changePassword, async (req, res) => {
    logger.http(`rota: ${Routes.changePassword}. Operação: Change Password`);

    try {
      logger.info(`[POST / changePassword] Solicitando troca de senha...`);
      const body = req.body;
      const id = req.params.id;

      const [status, message] = await changePassword(body, id);
      res.status(status).json({ message: message });
      logger.info("Rota completa com sucesso.", {
        message: message,
        status: status,
      });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
      logger.error("Erro na rota: " + error);
    }
  });

  // -----------------------------------
  // Rotas ADM
  // -----------------------------------

  APP.post(
    Routes.createBarrier,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      logger.http(`rota: ${Routes.createBarrier}. Operação: Create Barrier`);

      try {
        const body = req.body;

        const [status, message] = await adminController.createBarrierController(
          body
        );
        res.status(status).json({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.post(
    Routes.createAccessibility,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      logger.http(
        `rota: ${Routes.createAccessibility}. Operação: Create Accessibility`
      );

      try {
        const body = req.body;

        const [status, message] =
          await adminController.createAccessibilityController(body);
        res.status(status).json({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );

  APP.post(
    Routes.createSubType,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      logger.http(`rota: ${Routes.createSubType}. Operação: Create Sub Type`);

      try {
        const body = req.body;

        const [status, message] = await adminController.createSubTypeController(
          body
        );
        res.status(status).json({ message: message });
        logger.info("Rota completa com sucesso.", {
          message: message,
          status: status,
        });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
        logger.error("Erro na rota: " + error);
      }
    }
  );
};
