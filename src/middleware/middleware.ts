import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";
import redisClient from "../utils/redisClient.js";
dotenv.config();

export let authenticateTokenCand = async (req: any, res: any, next: any) => {
  let token = req.headers["authorization"].split(" ")[1];
  logger.info("TESTE: " + token);
  const secretCand = process.env.SECRET_CAND as string;
  logger.info("SECRET: " + secretCand);
  try {
    const decoded: any = JWT.decode(token);
    logger.info(decoded);
    const storedToken = await redisClient.get(`token:${decoded.id}`);
    logger.info("STORED TOKEN: " + storedToken);

    if (token !== storedToken) {
      logger.error("Token não corresponde ao armazenado");
      return res.status(403).json({ msg: "Token inválido!" });
    }
    next();
  } catch (error) {
    logger.error("Erro na verificação do token:", error);
    res.status(403).json(error);
  }
};
export let authenticateTokenEmp = async (req: any, res: any, next: any) => {
  let token = req.headers["authorization"].split(" ")[1];
  logger.info("TESTE: " + token);
  const secretEmp = process.env.SECRET_EMP as string;
  logger.info("SECRET: " + secretEmp);
  try {
    const decoded: any = JWT.decode(token);
    logger.info(decoded);
    const storedToken = await redisClient.get(`token:${decoded.id}`);
    logger.info("STORED TOKEN: " + storedToken);

    if (token !== storedToken) {
      logger.error("Token não corresponde ao armazenado");
      return res.status(403).json({ msg: "Token inválido!" });
    }
    next();
  } catch (error) {
    logger.error("Erro na verificação do token:", error);
    res.status(403).json(error);
  }
};

export let authenticateTokenADM = async (req: any, res: any, next: any) => {
  let token = req.headers["authorization"].split(" ")[1];
  logger.info("TESTE: " + token);
  const secretAdm = process.env.SECRET_ADM as string;
  logger.info("SECRET: " + secretAdm);
  try {
    const decoded: any = JWT.decode(token);
    logger.info(decoded);
    const storedToken = await redisClient.get(`token:${decoded.id}`);
    logger.info("STORED TOKEN: " + storedToken);

    if (token !== storedToken) {
      logger.error("Token não corresponde ao armazenado");
      return res.status(403).json({ msg: "Token inválido!" });
    }
    next();
  } catch (error) {
    logger.error("Erro na verificação do token:", error);
    res.status(403).json(error);
  }
};

export let createJWT = async (
  role: string,
  id: string,
  EX: number
): Promise<string> => {
  const secretADM = process.env.SECRET_ADM as string;
  const secretEmp = process.env.SECRET_EMP as string;
  const secretCand = process.env.SECRET_CAND as string;
  let token;
  switch (role) {
    case "candidato":
      token = JWT.sign({ id: id, role: "candidato" }, secretCand, {
        expiresIn: EX,
      });
      break;
    case "empresa":
      token = JWT.sign({ id: id, role: "empresa" }, secretEmp, {
        expiresIn: EX,
      });
      break;
    case "administrador":
      token = JWT.sign({ id: id, role: "administrador" }, secretADM, {
        expiresIn: EX,
      });
      break;
    default:
      throw new Error("Role inválido");
  }
  return token;
};
