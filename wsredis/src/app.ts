import { createServer } from "node:http";
import { ChatWithServer } from "./services/chat";
import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8000;
dotenv.config();

const app = express();
const httpServer = createServer(app);

new ChatWithServer(httpServer);

httpServer.listen(PORT, () =>
  console.log(`Server is running on port: ${PORT}`),
);
