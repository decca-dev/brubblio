import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export interface RoomOptions {
  name: string;
  players: Player[];
  type: RoomType;
  rounds: number;
  turnOf: Player;
}

export interface Player {
  username: string;
  avatar: string;
  score: number;
}

export type RoomType = "public" | "private";
