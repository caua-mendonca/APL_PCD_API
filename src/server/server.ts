import express from "express";
import * as DB from "./data/connect.js";
import * as Routes from "./routes/routes.js";
import { controllerCandadate } from "../controller/controllerCandidate.js";
import { controllerContratante } from "../controller/controllerContratante.js";
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

  APP.post(Routes.createCanditado, (req, res) => {
    let {
      name,
      email,
      confirme_email,
      senha,
      confirme_senha,
      telefone,
      cpf,
      data_nascimento,
    } = req.body;

    let user = {
      name,
      email,
      confirme_email,
      senha,
      confirme_senha,
      telefone,
      cpf,
      data_nascimento,
    };
    let result = controllerCandadate(user);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "Erro ao criar candidato!" });
    }
  });

  APP.post(Routes.createContratante, (req, res) => {
    let {
      nome_fantasia,
      razao_social,
      email,
      confirme_email,
      senha,
      confirme_senha,
      cnpj,
      telefone,
    } = req.body;
    let user = {
      nome_fantasia,
      razao_social,
      email,
      confirme_email,
      senha,
      confirme_senha,
      cnpj,
      telefone,
    };
    let result = controllerContratante(user);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(400).send({ message: "Erro ao criar candidato!" });
    }
  });
};
