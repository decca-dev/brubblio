import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/helpers/dbConnect";
import { Room } from "../../../lib/models/Room";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "GET":
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
