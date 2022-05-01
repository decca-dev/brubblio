import type { NextPageContext } from "next";
import { useMetaData } from "../../lib/hooks/useMetaData";
import { useEffect, useRef, useState } from "react";
import * as socketIO from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ChatContent, User, RoomOptions } from "../../lib/types";
import GameScreen from "../../components/GameScreen";
import { useSession } from "next-auth/react";

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

const Room = ({ room }: { room: RoomOptions }) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatInterface[]>([]);
  const [message, setMessage] = useState("");
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
        room.name,
        `Join the ${room.name} brubblio room.`,
        `/rooms/${room.id}`
      )}
      <GameScreen
        message={message}
        setMessage={setMessage}
        messages={messages}
        setMessages={setMessages}
        socket={socketRef.current!}
        players={room.players!}
        canvasRef={canvasRef}
        ctxRef={ctxRef}
        user={{
          username: session?.user?.name!,
          id: session?.user?.id!,
          avatar:
            localStorage.getItem("avatar") ||
            (Math.floor(Math.random() * 8) + 1).toString(),
        }}
      />
    </>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/rooms/${context.req?.url?.replace(
      "/rooms/",
      ""
    )}`
  );
  const data = await res.json();
  if (res.ok) {
    return {
      props: {
        room: data.data,
      },
    };
  }
};

export default Room;
