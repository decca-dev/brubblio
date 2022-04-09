import mongo from "mongoose";
import { RoomOptions } from "../types";

export const Room = mongo.model<RoomOptions>(
  "Room",
  new mongo.Schema<RoomOptions>({
    owner: {
      username: { type: String, required: true, unique: true },
      avatar: { type: String, required: true },
      score: { type: Number, required: true },
    },
    players: [
      {
        username: { type: String, required: true, unique: true },
        avatar: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
    rounds: { type: Number, default: 2 },
    drawingTime: { type: Number, default: 40 },
  })
);
