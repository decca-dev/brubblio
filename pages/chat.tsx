import type { NextPage } from "next";
import { useEffect, useState, useContext } from "react";
import * as socketIO from "socket.io-client";
import UserContext from "../components/contexts/UserContext";
import { useMetaData } from "../lib/hooks/useMetaData";

const Chat: NextPage = () => {
  const [messages, setMessages] = useState<ChatElementInterface[]>([]);
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState("");
  const user = useContext(UserContext);

  useEffect((): any => {
    const socket = socketIO.connect(window.location.origin, {
      path: "/api/socket",
    });

    socket?.on("connect", () => {
      console.log(`Connected as ${socket?.id}`);
      setConnected(true);
      messages.push({
        author: "Server",
        message: `You have joined the chatroom!`,
      });
      setMessages([...messages]);
    });

    socket?.on("message", (content: ChatElementInterface) => {
      messages.push(content);
      setMessages([...messages]);
    });

    if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (message) {
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ author: user.username, message: message }),
      });

      if (resp.ok) setMessage("");
    } else {
      return;
    }
  };

  return (
    <>
      {useMetaData("Chat", "Chat with fellow Brubblians", "/chat")}
      <div className="flex flex-col items-center mt-5 container">
        <div className="chatbox w-full h-96 bg-white shadow-gray-600 shadow-md flex flex-col overflow-y-scroll break-all">
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
