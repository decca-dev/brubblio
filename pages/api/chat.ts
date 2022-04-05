import type { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../lib/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (req.method === "POST") {
    const { message, author } = req.body as { message: string; author: string };
    const content = { message: message, author: author };
    res?.socket?.server?.io.emit("message", content);

    res.status(201).json(content);
  }
}
