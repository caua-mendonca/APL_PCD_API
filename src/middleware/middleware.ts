import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * Middleware para autenticação de Candidatos
 */
export let authenticateTokenCand = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Não autorizado!" });

  const token = authHeader.split(" ")[1]; // Bearer <token>
  const secretCand = process.env.SECRET_CAND as string;

  try {
    const payload = JWT.verify(token, secretCand);
    req.user = payload; // Adiciona informações do usuário ao request
    console.log("Payload decodificado:", payload);
    next();
  } catch (error) {
    console.error("Erro JWT:", error);
    res.status(403).json({ msg: "Token inválido!" });
  }
};

/**
 * Middleware para autenticação de Empresas
 */
export let authenticateTokenEmp = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Não autorizado!" });

  const token = authHeader.split(" ")[1];
  const secretEmp = process.env.SECRET_EMP as string;

  try {
    const payload = JWT.verify(token, secretEmp);
    req.user = payload;
    console.log("Payload decodificado:", payload);
    next();
  } catch (error) {
    console.error("Erro JWT:", error);
    res.status(403).json({ msg: "Token inválido!" });
  }
};

/**
 * Middleware para autenticação de Administradores
 */
export let authenticateTokenADM = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(401).json({ msg: "Não autorizado!" });

  const token = authHeader.split(" ")[1];
  const secretADM = process.env.SECRET_ADM as string;

  try {
    const payload = JWT.verify(token, secretADM);
    req.user = payload;
    console.log("Payload decodificado:", payload);
    next();
  } catch (error) {
    console.error("Erro JWT:", error);
    res.status(403).json({ msg: "Token inválido!" });
  }
};
