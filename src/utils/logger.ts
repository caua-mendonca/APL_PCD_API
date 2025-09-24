import express from "express";
import * as Routes from "../routes/routes.js";
import * as candidateController from "../controller/user/candidateController.js";
import * as companyController from "../controller/user/companyController.js";
import * as employeeController from "../controller/user/employeeController.js";
import * as Middleware from "../middleware/middleware.js";
import cors from "cors";
import * as Login from "../controller/login/login.js";
import { changePassword } from "../controller/login/changePass.js";
import * as Admin from "../controller/admin/adminController.js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.status" });

const APP = express();
APP.use(express.json());
APP.use(
  cors({
    origin: "https://localhost:3333",
  })
);

export let conectServ = (PORT: number) => {
  APP.listen(PORT, () => {
    try {
      console.log(`Servidor iniciado e escutando na porta ${PORT}`);
    } catch (error) {
      console.error("Erro ao iniciar o servidor:", error);
    }
  });

  // Candidate routes
  APP.post(Routes.createCandidate, async (req, res) => {
    try {
      let body = req.body;
      let [status, message] = await candidateController.createCandidateController(body);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.get(Routes.getCandidate, Middleware.authenticateTokenCand, async (req, res) => {
    try {
      let [status, message] = await candidateController.getCandidatesController();
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Company routes
  APP.post(Routes.createCompany, async (req, res) => {
    try {
      let body = req.body;
      let [status, message] = await companyController.createCompanyController(body);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Employee routes
  APP.post(Routes.createEmployee, Middleware.authenticateTokenEmp, async (req, res) => {
    try {
      let body = req.body;
      let id = req.params.id;
      let [status, message] = await employeeController.createEmployeeController(body, id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Job routes
  APP.post(Routes.createJob, Middleware.authenticateTokenEmp, async (req, res) => {
    try {
      let body = req.body;
      let id = req.params.id;
      let [status, message] = await employeeController.createJobController(body, id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.applyToJob, Middleware.authenticateTokenCand, async (req, res) => {
    try {
      let job_id = String(Object.values(req.body));
      let candidate_id = req.params.id;
      let [status, message] = await candidateController.applyToJobController(candidate_id, job_id);
      res.status(status).send({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Event routes
  APP.post(Routes.createEvent, Middleware.authenticateTokenEmp, async (req, res) => {
    try {
      const body = req.body;
      const id = req.params.id;
      const [status, message] = await employeeController.createEventController(body, id);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Calendar routes
  APP.post(Routes.createCalendar, Middleware.authenticateTokenEmp, async (req, res) => {
    try {
      const id = req.params.id;
      const [status, message] = await employeeController.createCalendarController(id);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Login routes
  APP.post(Routes.loginCompany, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Login.loginCompany(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.loginCandidate, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Login.loginCandidate(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.loginAdmin, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Login.loginAdmin(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  // Admin routes
  APP.post(Routes.createBarrier, Middleware.authenticateTokenADM, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Admin.createBarrierController(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.createAccessibility, Middleware.authenticateTokenADM, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Admin.createAccessibilityController(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });

  APP.post(Routes.createSubType, Middleware.authenticateTokenADM, async (req, res) => {
    try {
      const body = req.body;
      const [status, message] = await Admin.createSubTypeController(body);
      res.status(status).json({ message: message });
    } catch (error) {
      res.status(500).send({ message: String(process.env.STATUS_500) });
    }
  });
};