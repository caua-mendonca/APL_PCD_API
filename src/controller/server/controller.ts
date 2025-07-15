import express from "express";
import * as DB from "./data/connect.js";
import * as Routes from "./routes/routes.js";
import { controllerCandadate } from "../controllerUser/controllerCandidate.js";
import { controllerContratante } from "../controllerUser/controllerContratante.js";
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
  // ? POST Candidato
  APP.post(Routes.createCanditado, (req, res) => {
    let body = req.body;

    console.log("Dados recolhidos e passados para controller");
    let result = controllerCandadate(body);
    if (result == true) {
      res.status(200).send("Sucesso ao criar o candidato");
    } else {
      res.status(400).send({ message: result });
    }
  });

  // ! CRUD Contratante
  // ? POST Contratante
  APP.post(Routes.createContratante, (req, res) => {
    let body = req.body;
    console.log("Dados recolhidos e passados para controller");
    let result = controllerContratante(body);
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
