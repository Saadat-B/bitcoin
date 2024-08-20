import http from "http";
import express from "express";
import SocketService from "./services/socket.js";

async function init() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = process.env.PORT ? process.env.PORT : 8000;
  const socketService = new SocketService();

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`HTTP Server started at PORT: ${PORT}`);
  });

  socketService.initListeners();
}

init();
