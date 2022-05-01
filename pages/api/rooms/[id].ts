import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/helpers/dbConnect";
import { RoomHelper } from "../../../lib/engine/Room";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
    body,
  } = req;
  switch (method) {
    case "GET":
      try {
        const room = await RoomHelper.get(id as string);
        res.status(200).json({
          success: true,
          message: "Room was found",
          data: room,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: "Room was not found!",
        });
      }
      break;
    case "DELETE":
      break;
    case "PUT":
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
