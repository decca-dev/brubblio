import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/helpers/dbConnect";
import { RoomHelper } from "../../../lib/engine/Room";
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
        const rooms = await RoomHelper.getRooms();
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
        const {
          name,
          owner,
          rounds,
          drawing_time,
          custom_words,
          type,
        }: RoomOptions = req.body;
        const room = await RoomHelper.create({
          name: name,
          owner: owner,
          rounds: rounds,
          drawing_time: drawing_time,
          custom_words: custom_words,
          type: type,
        });
        res.status(200).json({
          success: true,
          message: "Room was created successfully",
          data: room,
        });
      } catch (error: any) {
        res.status(400).json({
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
