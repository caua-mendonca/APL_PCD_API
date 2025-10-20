import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";
dotenv.config();

export let authenticateTokenCand = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  logger.info("Auth Header:", authHeader);
  const secretCand = process.env.SECRET_CAND as string;
  const token = JWT.sign({ id: 321, role: "candidato" }, secretCand, {
    expiresIn: "1h",
  });
  logger.info("Secret EMP:", secretCand);
  if (!token) {
    return res.status(401).json({ msg: "Não autorizado!" });
  }
  try {
    const payload = JWT.verify(token, secretCand);
    logger.info("Payload decodificado:", payload);
    logger.info("Token válido");
    next();
  } catch (error) {
    logger.error("Erro JWT:", error);
    logger.error("Token inválido", { error: error });
    res.status(403).json({ msg: "Token inválido!" });
  }
};
export let authenticateTokenEmp = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  logger.info("Auth Header:", authHeader);
  const secretEmp = process.env.SECRET_EMP as string;
  const token = JWT.sign({ id: 123, role: "empresa" }, secretEmp, {
    expiresIn: "1h",
  });
  logger.info("Secret EMP:", secretEmp);
  if (!token) {
    return res.status(401).json({ msg: "Não autorizado!" });
  }
  try {
    const payload = JWT.verify(token, secretEmp);
    logger.info("Payload decodificado:", payload);
    logger.info("Token válido");
    next();
  } catch (error) {
    logger.error("Erro JWT:", error);
    logger.error("Token inválido", { error: error });
    res.status(403).json({ msg: "Token inválido!" });
  }
};

export let authenticateTokenADM = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  logger.info("Auth Header:", authHeader);
  const secretADM = process.env.SECRET_ADM as string;
  const token = JWT.sign({ id: 321, role: "administrador" }, secretADM, {
    expiresIn: "1h",
  });
  logger.info("Secret ADM:", secretADM);
  if (!token) {
    return res.status(401).json({ msg: "Não autorizado!" });
  }
  try {
    const payload = JWT.verify(token, secretADM);
    logger.info("Payload decodificado:", payload);
    logger.info("Token válido");

    next();
  } catch (error) {
    logger.error("Erro JWT:", error);
    logger.error("Token inválido", { error: error });
    res.status(403).json({ msg: "Token inválido!" });
  }
};
