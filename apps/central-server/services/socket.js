import { Server } from "socket.io";

class SocketService {
  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server();
  }

  initListeners() {
    const io = this.io;
    console.log("Init Socket Listeners...");
    io.on("connect", (socket) => {
      console.log(`New Socket Connected`, socket.id);

      socket.on("event:message", (message) => {
        console.log("New Message Rec.", message);
      });
      socket.on("miner:ready", (message) => {
        console.log("Miner ready", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
