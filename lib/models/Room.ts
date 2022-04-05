import mongo from "mongoose";
import { RoomOptions } from "../types";

export const Room = mongo.model<RoomOptions>(
  "Room",
  new mongo.Schema<RoomOptions>({
    name: { type: String, required: true, unique: true },
    players: [
      {
        username: { type: String, required: true, unique: true },
        avatar: { type: String, required: true },
        score: { type: Number, required: true },
      },
    ],
    type: { type: String, required: true, default: "public" },
    rounds: { type: Number, default: 3 },
    turnOf: {
      username: { type: String, required: true, unique: true },
      avatar: { type: String, required: true },
      score: { type: Number, required: true },
    },
  })
);
