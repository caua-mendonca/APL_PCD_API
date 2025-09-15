import * as Server from "./utils/logger.js";
import dotenv from 'dotenv';
dotenv.config();

let PORT:number = Number(process.env.PORT);

Server.conectServ(PORT);