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

  expressApp.get("*", (req, res) => {
    return handle(req, res);
  });

  io.on("connection", (socket) => {
    socket.on("new-join", () => {
      io.emit("user-join", io.sockets.sockets.size);
    });
    socket.on("disconnect", () => {
      io.emit("user-left", io.sockets.sockets.size);
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
