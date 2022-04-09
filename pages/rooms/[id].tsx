import type { NextPage } from "next";
import { useMetaData } from "../../lib/hooks/useMetaData";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as socketIO from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatContent, User } from "../../lib/types";
import GameScreen from "../../components/GameScreen";

const players = [
  {
    username: "lol",
    avatar: "1",
    score: 69,
  },
  {
    username: "lol",
    avatar: "1",
    score: 69,
  },
];

type ChatInterface = ChatContent & { user: User };

interface DrawingData {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
  color: string;
  lineWidth: number;
}

const room: NextPage = () => {
  const [messages, setMessages] = useState<ChatInterface[]>([]);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const roomName = router.asPath.replace("/rooms/", "");
  const socketRef =
    useRef<socketIO.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D>(
    canvasRef.current?.getContext("2d")!
  );

  useEffect(() => {
    const socket = socketIO.connect(window.location.origin, {
      path: "/api/socket",
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket?.on("broadcast-message", (content: ChatInterface) => {
      setMessages((messages) => [...messages, content]);
    });

    socket?.on("drawing", ({ start, end, color, lineWidth }: DrawingData) => {
      const { width, height } = canvasRef.current!;
      start.x *= width;
      start.y *= height;
      end.x *= width;
      end.y *= height;
      ctxRef.current!.strokeStyle = color;
      ctxRef.current!.lineWidth = lineWidth;
      ctxRef.current!.lineCap = "round";
      ctxRef.current!.lineTo(start.x, start.y);
      ctxRef.current!.stroke();
      ctxRef.current!.lineTo(end.x, end.y);
      ctxRef.current!.stroke();
      ctxRef.current?.beginPath();
    });

    socket?.on("clear-canvas", () => {
      ctxRef.current!.clearRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    });

    socket?.on("fill-canvas", (color: string) => {
      ctxRef.current!.fillStyle = color;
      ctxRef.current?.fillRect(
        0,
        0,
        canvasRef.current!.width,
        canvasRef.current!.height
      );
    });
  }, []);

  return (
    <>
      {useMetaData(
        roomName,
        `Join the ${roomName} brubblio room.`,
        router.asPath
      )}
      <GameScreen
        message={message}
        setMessage={setMessage}
        messages={messages}
        setMessages={setMessages}
        socket={socketRef.current!}
        players={players}
        canvasRef={canvasRef}
        ctxRef={ctxRef}
      />
    </>
  );
};

export default room;
