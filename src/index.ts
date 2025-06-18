import * as Server from "./server/server.js";

let PORT = process.env.PORT || "3000";

Server.conectServ(PORT);