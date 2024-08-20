import { io } from "socket.io-client";

// Replace with the address of your central server
const socket = io("http://localhost:8000");

// Handle connection
socket.on("connect", () => {
  console.log("Connected to the central server as miner:", socket.id);

  // Emit a message to the central server to indicate readiness
  socket.emit("miner:ready", { message: "Miner server is ready" });
});

// Listen for messages from the central server
socket.on("event:message", (message) => {
  console.log("Message received from the central server:", message);

  // Example: emit a response back to the central server
  socket.emit("miner:response", { message: "Received message" });
});

// Handle disconnection
socket.on("disconnect", () => {
  console.log("Disconnected from the central server");
});
