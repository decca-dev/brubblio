import mongo, { Model } from "mongoose";
import { RoomOptions } from "../types";

const RoomSchema = new mongo.Schema<RoomOptions>({
  id: { type: String, unique: true },
  name: { type: String, required: true, unique: true },
  owner: {
    username: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    score: { type: Number, required: true },
    id: { type: String, unique: true },
  },
  players: [
    {
      username: { type: String, required: true, unique: true },
      avatar: { type: String, required: true },
      score: { type: Number, required: true },
      id: { type: String, unique: true },
    },
  ],
  rounds: { type: Number, default: 2 },
  drawing_time: { type: Number, default: 40 },
  custom_words: { type: [String], default: [] },
  has_started: { type: Boolean, default: false },
  type: { type: String },
});

let Room: Model<RoomOptions, {}, {}, {}>;

try {
  Room = mongo.model("Room", RoomSchema);
} catch (e) {
  Room = mongo.model("Room");
}

export default Room;
