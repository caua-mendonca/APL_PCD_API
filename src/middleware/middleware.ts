import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export let authenticateTokenCand = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Não autorizado!" });
  }
  try {
    const secretCand = process.env.SECRET_CAND
    JWT.verify(token, secretCand as string);
    next();

  } catch (error) {
    res.status(403).json({ msg: "Token inválido!" });
  }
};
export let authenticateTokenEmp = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Não autorizado!" });
  }
  try {
    const secretEmp = process.env.SECRET_EPM
    JWT.verify(token, secretEmp as string);
    next();

  } catch (error) {
    res.status(403).json({ msg: "Token inválido!" });
  }
};
