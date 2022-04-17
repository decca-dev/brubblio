import { useContext, useEffect, Dispatch, SetStateAction } from "react";
import UserContext from "./contexts/UserContext";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Socket } from "socket.io-client";
import { ChatContent, User } from "../lib/types";

const ChatBox = ({
  socket,
  messages,
  setMessages,
  message,
  setMessage,
}: ChatBoxInterface) => {
  const user = useContext(UserContext);

  useEffect(() => {
    socket?.on("broadcast-message", (content: ChatInterface) => {
      setMessages((messages) => [...messages, content]);
    });
  }, []);

  const sendMessage = () => {
    if (message) {
      socket?.emit("new-message", {
        author: user.username,
        message: message,
      });
      setMessage("");
    } else {
      return;
    }
  };

  return (
    <div>
      <div className="chatbox w-80 h-96 bg-white shadow-gray-600 shadow-md flex flex-col overflow-y-scroll break-all">
        {messages?.map((message, i) => {
          return (
            <ChatElement
              author={message.author}
              message={message.message}
              user={user}
              key={i}
            />
          );
        })}
      </div>
      <div className="message-box bg-slate-400 w-80 py-4 pl-2">
        <textarea
          name="message"
          id="message-input"
          placeholder="message"
          rows={2}
          cols={25}
          className="resize-none inline-block align-middle rounded-md border border-black"
          value={message}
          onChange={(e: any) => setMessage(e.target.value)}
        ></textarea>
        <button
          className="inline-block align-middle ml-5 w-16 h-10 rounded-2xl text-white bg-green-600 hover:bg-green-800 transition-colors delay-150 ease-in-out duration-300"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const ChatElement = ({ author, message, user }: ChatInterface) => {
  return (
    <div className="ml-3 mt-2">
      {author === "Server" && (
        <h1 className={"font-bold inline-block align-middle text-emerald-600"}>
          {author}:
        </h1>
      )}
      {author === user.username && (
        <h1 className={"font-bold inline-block align-middle text-cyan-500"}>
          Me:
        </h1>
      )}
      {author !== user.username && author !== "Server" && (
        <h1 className={"font-bold inline-block align-middle"}>{author}:</h1>
      )}
      <p className="inline-block align-bottom text-sm ml-2">{message}</p>
    </div>
  );
};

type ChatInterface = ChatContent & { user: User };

interface ChatBoxInterface {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  messages: ChatInterface[];
  setMessages: Dispatch<SetStateAction<ChatInterface[]>>;
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
}

export default ChatBox;
