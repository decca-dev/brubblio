import { useState } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState<ChatElementInterface[]>([]);

  const sendMessage = () => {
    const chatbox = document.querySelector(".chatbox") as HTMLDivElement;
    const textArea = document.querySelector(
      "#message-input"
    ) as HTMLTextAreaElement;
    const message = textArea.value;
    if (message !== "" || message.length > 0) {
      setMessages([...messages!, { author: "ur mom", message: message }]);
      textArea.value = "";
      chatbox.scrollTop = chatbox.scrollHeight;
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
          className="inline-block align-middle rounded-md border border-black"
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

const ChatElement = ({ author, message }: ChatElementInterface) => {
  return (
    <div className="ml-3 mt-2">
      <h1 className="font-bold inline-block align-middle">{author}:</h1>
      <p className="inline-block align-bottom text-sm ml-2">{message}</p>
    </div>
  );
};

interface ChatElementInterface {
  author: string;
  message: string;
}

export default ChatBox;
