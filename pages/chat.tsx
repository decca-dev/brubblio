import type { NextPage } from "next";
import { useEffect, useState, useContext, useRef } from "react";
import * as socketIO from "socket.io-client";
import UserContext from "../components/contexts/UserContext";
import { useMetaData } from "../lib/hooks/useMetaData";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<ChatElementInterface[]>([]);
  const [message, setMessage] = useState("");
  const [clients, setClients] = useState(0);
  const socketRef =
    useRef<socketIO.Socket<DefaultEventsMap, DefaultEventsMap>>();
  const user = useContext(UserContext);

  useEffect(() => {
    const socket = socketIO.connect(window.location.origin, {
      path: "/api/socket",
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socketRef.current = socket;

    socket?.on("connect", () => {
      console.log(`Connected as ${socket?.id}`);
      socket.emit("new-join");
    });

    socket.on("user-left", (size) => {
      setClients(size);
    });

    socket.on("user-join", (size) => {
      setClients(size);
    });

    socket?.on("broadcast-message", (content: ChatElementInterface) => {
      setMessages((messages) => [...messages, content]);
    });
  }, []);

  const sendMessage = async () => {
    if (message) {
      socketRef.current?.emit("new-message", {
        author: user.username,
        message: message,
      });
      setMessage("");
    } else {
      return;
    }
  };

  return (
    <>
      {useMetaData("Chat", "Chat with fellow Brubblians", "/chat")}
      <div className="flex flex-col items-center mt-5 container">
        <div className="chatbox w-full h-96 bg-white shadow-gray-600 shadow-md flex flex-col overflow-y-scroll break-all">
          <h1>{clients} online.</h1>
          {messages?.map((message, i) => {
            return (
              <div className="ml-3 mt-2">
                {message.author === "Server" && (
                  <h1
                    className={
                      "font-bold inline-block align-middle text-emerald-600"
                    }
                  >
                    {message.author}:
                  </h1>
                )}
                {message.author === user.username && (
                  <h1
                    className={
                      "font-bold inline-block align-middle text-cyan-500"
                    }
                  >
                    Me:
                  </h1>
                )}
                {message.author !== user.username &&
                  message.author !== "Server" && (
                    <h1 className={"font-bold inline-block align-middle"}>
                      {message.author}:
                    </h1>
                  )}
                <p className="inline-block align-bottom text-sm ml-2">
                  {message.message}
                </p>
              </div>
            );
          })}
        </div>
        <div className="message-box bg-slate-400 w-full py-4 pl-2">
          <textarea
            name="message"
            id="message-input"
            placeholder="message"
            rows={2}
            cols={50}
            className="inline-block align-middle rounded-md border border-black"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          ></textarea>
          <button
            className="inline-block align-middle ml-5 w-16 h-10 rounded-2xl text-white bg-green-600 hover:bg-green-800 transition-colors delay-150 ease-in-out duration-300"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
};

interface ChatElementInterface {
  author: string;
  message: string;
}

export default Chat;
