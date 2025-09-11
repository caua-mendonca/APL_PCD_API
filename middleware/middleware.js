import JWT from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export let authenticateTokenCand = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header:", authHeader);
    const secretCand = process.env.SECRET_CAND;
    const token = JWT.sign({ id: 321, role: "candidato" }, secretCand, { expiresIn: "1h" });
    console.log("Secret EMP:", secretCand);
    if (!token) {
        return res.status(401).json({ msg: "Não autorizado!" });
    }
    try {
        const payload = JWT.verify(token, secretCand);
        console.log("Payload decodificado:", payload);
        next();
    }
    catch (error) {
        console.error("Erro JWT:", error);
        res.status(403).json({ msg: "Token inválido!" });
    }
};
export let authenticateTokenEmp = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log("Auth Header:", authHeader);
    const secretEmp = process.env.SECRET_EMP;
    const token = JWT.sign({ id: 123, role: "empresa" }, secretEmp, { expiresIn: "1h" });
    console.log("Secret EMP:", secretEmp);
    if (!token) {
        return res.status(401).json({ msg: "Não autorizado!" });
    }
    try {
        const payload = JWT.verify(token, secretEmp);
        console.log("Payload decodificado:", payload);
        next();
    }
    catch (error) {
        console.error("Erro JWT:", error);
        res.status(403).json({ msg: "Token inválido!" });
    }
};
