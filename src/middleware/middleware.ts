import { Request, Response, NextFunction } from "express";
import { validateIdCandidato, validateIdContratante } from "../validation/validateId/validateId";

export  let idIsValid = async (req: Request, res: Response, next: NextFunction) => {
    const id = String(req.params.id);

    console.log(`🔍 Validando ID contratante: ${id}`);

    let isValid: boolean = await validateIdContratante(id);
    console.log(`Resultado validação: ${isValid}`);

    if (isValid === false) {
      console.warn(
        "❌ ID inválido - apenas empresas ou colaboradores podem criar vagas."
      );
      res
        .status(400)
        .send({ message: "ID inválido, Apenas Empresas podem criar vagas!" });
    } else {
      console.log("✔️ ID validado, prosseguindo...");
      next();
    }
  };

export  let idIsValidVaga = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const id = String(req.params.id);

    console.log(`🔍 Validando ID candidato: ${id}`);

    let isValid: any = validateIdCandidato(id);
    console.log(`Resultado validação: ${isValid}`);

    if (isValid === false) {
      console.warn("❌ ID inválido - apenas candidatos podem se inscrever.");
      res
        .status(400)
        .send({
          message: "ID inválido, Apenas Candidatos podem se inscrever à vagas!",
        });
    } else {
      console.log("✔️ ID validado, prosseguindo...");
      next();
    }
  };