// server/data/connect.ts (ou .js)
import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

pool.on("connect", () => {
  console.log("✅ Conectado ao PostgreSQL via Pool!");
});

pool.on("error", (err) => {
  console.error("❌ Erro inesperado no pool de conexões:", err);
});
