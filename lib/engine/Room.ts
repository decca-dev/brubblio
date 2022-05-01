import Room from "../models/Room";
import { RoomOptions } from "../types";
import { Document, Types } from "mongoose";

type RoomType = Document<unknown, any, RoomOptions> &
  RoomOptions & {
    _id: Types.ObjectId;
  };

export class RoomHelper {
  static async create(opt: RoomOptions): Promise<RoomType> {
    const created_room = new Room({
      id: Date.now().toString(36),
      name: opt.name,
      owner: opt.owner,
      players: [opt.owner],
      rounds: opt.rounds,
      drawing_time: opt.drawing_time,
      custom_words: opt.custom_words,
      has_started: false,
      type: opt.type,
    });

    await created_room.save();

    return created_room;
  }

  static async delete(id: string): Promise<void> {
    const room_to_delete = await Room.findOne({ id: id });
    if (!room_to_delete || room_to_delete === null) {
      throw new Error(`Room with id ${id} was not found.`);
    }
    await room_to_delete.delete();
  }

  static async get(id: string): Promise<RoomType> {
    const room_to_get = await Room.findOne({ id: id });
    if (!room_to_get || room_to_get === null) {
      throw new Error(`Room with id ${id} was not found.`);
    }
    return room_to_get;
  }

  static async getRooms(): Promise<RoomType[]> {
    const rooms = await Room.find({});
    return rooms;
  }
}
