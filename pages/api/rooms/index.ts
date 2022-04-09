import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/helpers/dbConnect";
import { Room } from "../../../lib/models/Room";
import { RoomOptions } from "../../../lib/types/index";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  switch (method) {
    case "GET":
      try {
        const rooms = await Room.find({});
        res.status(200).json({
          success: true,
          message: "Room data was found.",
          data: rooms,
        });
      } catch (error: any) {
        res.status(400).json({
          success: false,
          message: `Room data was not found. Error: ${error.message}`,
        });
      }
      break;
    case "POST":
      try {
        const { owner, players, rounds, drawingTime }: RoomOptions = req.body;
        const room = new Room({
          owner: owner,
          players: players,
          rounds: rounds,
          drawingTime: drawingTime,
        });
        await room.save();
        res.status(200).json({
          success: true,
          message: "Room was created successfully",
          data: room,
        });
      } catch (error: any) {
        res.status(200).json({
          success: false,
          message: `Room was not created. Error: ${error.message}`,
        });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
