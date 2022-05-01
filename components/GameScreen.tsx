import DrawingCanvas from "./DrawingCanvas";
import PlayerList from "./PlayerList";
import ChatBox from "./ChatBox";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";
import { Dispatch, SetStateAction, RefObject, MutableRefObject } from "react";
import { ChatContent, User, Player } from "../lib/types";

const GameScreen = ({
  players,
  socket,
  messages,
  setMessages,
  message,
  setMessage,
  canvasRef,
  ctxRef,
  user,
}: GameScreenInterface) => {
  return (
    <>
      <div className="flex flex-col mt-5 xl:flex-row">
        <PlayerList players={players} />
        <DrawingCanvas socket={socket} canvasRef={canvasRef} ctxRef={ctxRef} />
        <ChatBox
          message={message}
          setMessage={setMessage}
          messages={messages}
          setMessages={setMessages}
          socket={socket}
          author={user}
        />
      </div>
    </>
  );
};

type ChatInterface = ChatContent & { user: User };
interface GameScreenInterface {
  players: Player[];
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  messages: ChatInterface[];
  setMessages: Dispatch<SetStateAction<ChatInterface[]>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  canvasRef: RefObject<HTMLCanvasElement>;
  ctxRef: MutableRefObject<CanvasRenderingContext2D>;
  user: User;
}

export default GameScreen;
