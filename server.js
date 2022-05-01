const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");
const express = require("express");
const { config } = require("dotenv");

config({ path: ".env.local" });

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME;
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server, { path: "/api/socket" });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  let chatClients = 0;

  io.on("connection", (socket) => {
    socket.on("chat-new-join", () => {
      chatClients++;
      io.emit("chat-user-join", chatClients);
    });
    socket.on("disconnect", () => {
      chatClients--;
      io.emit("chat-user-left", chatClients);
    });
    socket.on("new-message", (chat) => {
      io.emit("broadcast-message", chat);
    });
    socket.on("drawing", (data) => {
      io.emit("drawing", data);
    });
    socket.on("clear", () => {
      io.emit("clear-canvas");
    });
    socket.on("fill", (color) => {
      io.emit("fill-canvas", color);
    });
    socket.on("newPrivateRoom", (user) => {});
    socket.on("joinPrivateRoom", ({ roomID, user }) => {});
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
