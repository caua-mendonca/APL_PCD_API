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

  APP.post(Routes.createCandidate, async (req, res) => {
    try {
      let body = req.body;

      let [status, message] =
        await candidateController.createCandidateController(body);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.get(
    Routes.getCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      try {
        let [status, message] =
          await candidateController.getCandidatesController();
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.delete(
    Routes.deleteCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      try {
        const id = String(req.params.id);
        let [status, message] =
          await candidateController.deleteCandidateController(id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.put(
    Routes.updateCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;

      try {
        const [status, message] =
          await candidateController.updateCandidateController(id, body);
        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  );

  // -----------------------------------
  // Rotas CRUD Contratante
  // -----------------------------------

  APP.post(Routes.createCompany, async (req, res) => {
    let body = req.body;
    try {
      let [status, message] = await companyController.createCompanyController(
        body
      );
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.get(
    Routes.getCompany,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      try {
        let [status, message] =
          await companyController.getCompaniesController();
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(
    Routes.getCompanyById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);

      try {
        let [status, message] =
          await companyController.getCompanyByIdController(id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.delete(
    Routes.deleteCompany,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      try {
        let [status, message] = await companyController.deleteCompanyController(
          id
        );
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.put(
    Routes.updateCompany,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      const body = req.body;
      try {
        let [status, message] = await companyController.updateCompanyController(
          id,
          body
        );
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
    Routes.createEmployee,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      try {
        let body = req.body;
        let id = req.params.id;

        let [status, message] =
          await employeeController.createEmployeeController(body, id);
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(
    Routes.getEmployee,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);

      try {
        let [status, message] = await employeeController.getEmployeeController(
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
    Routes.createJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let body = req.body;
      let id = req.params.id;

      try {
        let [status, message] = await employeeController.createJobController(
          body,
          id
        );
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
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

  APP.get(Routes.getJobs, Middleware.authenticateTokenEmp, async (req, res) => {
    try {
      let [status, message] = await employeeController.getJobsController();
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.get(
    Routes.getJobById,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      let id = String(req.params.id);
      try {
        let [status, message] = await employeeController.getJobByIdController(
          id
        );
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(
    Routes.getJobsByCandidate,
    Middleware.authenticateTokenCand,
    async (req, res) => {
      let id = String(req.params.id);

      console.log(`[GET / vaga] Requisição recebida`);

      try {
        let [status, message] =
          await candidateController.getCandidateJobsController(id);

        res.status(status).json(message);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  );

  APP.delete(
    Routes.deleteJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      try {
        let id = String(req.params.id);
        let [status, message] = await employeeController.deleteJobController(
          id
        );
        res.status(status).send({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.put(
    Routes.updateJob,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      try {
        let body = req.body;
        let id = String(req.params.id);
        let [status, message] = await employeeController.updateJobController(
          body,
          id
        );
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
    Routes.createEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const body = req.body;
      const id = req.params.id;

      console.log(`[POST / Evento] Iniciando criação de evento...`, {
        payload: body,
      });

      try {
        const [status, message] =
          await employeeController.createEventController(body, id);

        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(
    Routes.getEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);

      try {
        const [status, message] = await employeeController.getEventController(
          id
        );

        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.delete(
    Routes.deleteEvent,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = String(req.params.id);
      console.log(`[DELETE / Evento] Solicitando exclusão de evento...`);

      try {
        const [status, message] =
          await employeeController.deleteEventController(id);

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
    Routes.createCalendar,
    Middleware.authenticateTokenEmp,
    async (req, res) => {
      const id = req.params.id;

      try {
        const [status, message] =
          await employeeController.createCalendarController(id);

        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.get(Routes.getCalendar, async (req, res) => {
    const id = String(req.params.id);
    console.log(`[GET / calendario] Solicitando calendários...`);

    try {
      const result = (await employeeController.getCalendarController(id)) ?? [];
      const [status, message] = result;

      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // -----------------------------------
  // Rotas CRUD Login
  // -----------------------------------

  APP.post(Routes.loginCompany, async (req, res) => {
    const body = req.body;
    try {
      const [status, message] = await Login.loginCompany(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.loginCandidate, async (req, res) => {
    const body = req.body;
    try {
      const [status, message] = await Login.loginCandidate(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.loginAdmin, async (req, res) => {
    const body = req.body;
    try {
      const [status, message] = await Login.loginAdmin(body);
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

  // -----------------------------------
  // Rotas ADM
  // -----------------------------------

  APP.post(
    Routes.createBarrier,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      try {
        const body = req.body;

        const [status, message] = await adminController.createBarrierController(
          body
        );
        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.post(
    Routes.createAccessibility,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      try {
        const body = req.body;

        const [status, message] =
          await adminController.createAccessibilityController(body);
        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );

  APP.post(
    Routes.createSubType,
    Middleware.authenticateTokenADM,
    async (req, res) => {
      try {
        const body = req.body;

        const [status, message] = await adminController.createSubTypeController(
          body
        );
        res.status(status).json({ message: message });
      } catch (error) {
        res.status(500).send({ message: String(process.env.STATUS_500) });
      }
    }
  );
};
