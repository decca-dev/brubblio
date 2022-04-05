import { Server as IOServer } from "socket.io";
import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../lib/types";
import { Server as HTTPServer } from "http";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("Initializing socket connection...");

    const server: HTTPServer = res.socket.server as any;

    const io = new IOServer(server, {
      path: "/api/socket",
    });

    res.socket.server.io = io;
  }
  res.end();
}
