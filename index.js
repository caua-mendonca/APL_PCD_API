import * as Server from "./utils/logger.js";
import dotenv from 'dotenv';
dotenv.config();
let PORT = Number(process.env.PORT);
Server.conectServ(PORT);
