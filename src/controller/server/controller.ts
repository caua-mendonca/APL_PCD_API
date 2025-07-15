import express from "express";
import * as DB from "./data/connect.js";
import * as Routes from "./routes/routes.js";
import * as controllerCandidate from "../controllerUser/controllerCandidate.js";
import * as controllerContratante from "../controllerUser/controllerContratante.js";
import { controllerIFBR } from "../IFBR/controllerIFBR.js";
import { controllerColaborador } from "../colaborador/controllerColaborador.js";
import cors from "cors";

const APP = express();
APP.use(express.json());
APP.use(cors());

export let conectServ = (PORT: string) => {
  let HTTP_PORT: number = Number(PORT);

  // ! Iniciando Servidor HTTP
  APP.listen(HTTP_PORT, () => {
    console.log(`Server is running on port ${HTTP_PORT}`);
  });

  // ! CRUD Candidato
  // * POST Candidato
  APP.post(Routes.createCanditado, (req, res) => {
    let body = req.body;

    console.log("Dados recolhidos e passados para controller");
    let result = controllerCandidate.controllerPostCandadate(body);
    if (result == true) {
      res.status(200).send("Sucesso ao criar o candidato");
    } else {
      res.status(400).send({ message: result });
    }
  });

  // * GET Candidato
  APP.get(Routes.getCanditado, async (req, res) => {
    console.log("Dados recolhidos e passados para controller");

    try {
      let result = await controllerCandidate.controllerGetCandidato();

      if (Array.isArray(result)) {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: result });
      }
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });
  APP.get(Routes.getCanditadoById, async (req, res) => {
    const id = Number(req.params.id);
    console.log("Dados recolhidos e passados para controller");

    try {
      let result = await controllerCandidate.controllerGetCandidatoById(id);

      if (result && typeof result === "object") {
        res.status(200).send(result);
      } else {
        res.status(404).send({ message: result });
      }
    } catch (error) {
      console.error("Erro ao buscar candidatos:", error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });

  // * DELETE Candidato
  APP.delete(Routes.deleteCanditado, async (req, res) => {
    const id = Number(req.params.id);
    console.log("Dados recolhidos e passados para controller");

    try {
      let result = await controllerCandidate.controllerDeleteCandidato(id);

      if (result) {
        res.status(200).send({ message: "Candidato deletado com sucesso!" });
      } else {
        res.status(404).send({ message: "Candidato não encontrado!" });
      }
    } catch (error) {
      console.error("Erro ao deletar candidato:", error);
      res.status(500).send({ message: "Erro interno no servidor" });
    }
  });
  // * UPDATE Candidato
APP.put(Routes.updateCanditado, async (req, res) => {
  const id = Number(req.params.id);
  const body = req.body;
  console.log("Dados recolhidos e passados para controller");

  try {
    const result = await controllerCandidate.controllerUpdateCandidato(id, body);
    res.status(200).json({ status: "sucesso", result });
  } catch (error) {
    console.error("Erro na rota PUT:", error);
    res.status(500).json({ error: "Erro ao atualizar candidato." });
  }
});

  // ! CRUD Contratante
  // * POST Contratante
  APP.post(Routes.createContratante, (req, res) => {
    let body = req.body;
    console.log("Dados recolhidos e passados para controller");
    let result = controllerContratante.controllerContratante(body);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: result });
    }
  });

  // * GET Contratante
  APP.get(Routes.getContratante, async (req, res) => {
    console.log("Dados recolhidos e passados para controller");
    let result = await controllerContratante.controllerGetContratante();
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: result });
    }
  })

  APP.get(Routes.getContratanteById, async (req, res) => {
    const id = Number(req.params.id);
    console.log("Dados recolhidos e passados para controller");
    let result = await controllerContratante.controllerGetContratanteById(id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: result });
    }
  })

  // * DELETE Contratante
  APP.delete(Routes.deleteContratante, async (req, res) => {
    const id = Number(req.params.id);
    console.log("Dados recolhidos e passados para controller");
    let result = await controllerContratante.controllerDeleteContratante(id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: result });
    }
  });
  // ! CRUD IFBR
  // ? POST Formulário IFBR
  APP.post(Routes.formIFBR, async (req, res) => {
    const ID = req.params.id;
    const form = req.body;

    console.log("Dados recolhidos e passados para controller");
    let result = controllerIFBR(ID, form);
    if ((await result) == true) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "Erro ao criar candidato!" });
    }
  });

  // ! CRUD Colaborador
  // ? POST Colaborador
  APP.post(Routes.createColaborador, (req, res) => {
    let body = req.body;

    console.log("Dados recolhidos e passados para controller");
    let result = controllerColaborador(body);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "Erro ao criar colaborador!" });
    }
  });
};
