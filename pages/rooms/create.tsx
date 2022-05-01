import type { NextPage } from "next";
import Header from "../../components/Header";
import { useState, useRef } from "react";
import { useMetaData } from "../../lib/hooks/useMetaData";
import { useSession } from "next-auth/react";
import Toast from "../../components/Toast";

const create: NextPage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [toast, setToast] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: "error" | "success";
  }>({ show: false, title: "", description: "", type: "error" });
  const rRef = useRef<HTMLSelectElement>(null);
  const dtRef = useRef<HTMLSelectElement>(null);
  const tRef = useRef<HTMLSelectElement>(null);
  const { data: session } = useSession();

  const createRoom = () => {
    const payload = {
      name: name,
      owner: {
        username: session?.user?.name,
        avatar:
          localStorage.getItem("avatar") ||
          (Math.floor(Math.random() * 8) + 1).toString(),
        score: 0,
        id: session?.user?.id,
      },
      custom_words: words,
      rounds: rRef.current?.value,
      drawing_time: dtRef.current?.value,
      type: tRef.current?.value,
    };

    fetch("/api/rooms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setToast({
          show: true,
          title: "Room created!",
          description: "redirecting you to your room shortly",
          type: "success",
        });
        setTimeout(() => {
          location.href = `/rooms/${data.data.id}`;
        }, 2300);
      } else {
        setToast({
          show: true,
          title: "Error!",
          description: "Room was not created.",
          type: "error",
        });
        setTimeout(() => {
          setToast({
            show: false,
            title: "",
            description: "",
            type: "error",
          });
        }, 2806);
      }
    });
  };

  return (
    <>
      {useMetaData("Create", "Create a new room", "/rooms/create")}
      <Header title="Create a new room" />
      <div className="container">
        <div className="flex flex-row items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-full">
            <h1 className="text-center text-xl font-bold mb-3">Settings</h1>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-5">
                <h1 className="inline-block h-auto bg-gray-300 p-2 align-middle font-semibold -mt-2">
                  Name
                </h1>
                <input
                  type="text"
                  placeholder="epic room"
                  className="border border-black h-10"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <h1 className="inline-block h-auto bg-gray-300 p-2 align-middle font-semibold">
                  Type
                </h1>
                <select
                  id="type"
                  className="inline-block h-10 w-40 align-middle"
                  ref={tRef}
                >
                  <option value="public">public</option>
                  <option value="private">private</option>
                  <option value="sandbox">sandbox</option>
                </select>
              </div>
              <div className="mb-5">
                <h1 className="inline-block h-auto bg-gray-300 p-2 align-middle font-semibold">
                  Rounds
                </h1>
                <select
                  id="rounds"
                  className="inline-block h-10 w-40 align-middle"
                  ref={rRef}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div className="mb-5">
                <h1 className="inline-block h-auto bg-gray-300 p-2 align-middle font-semibold">
                  Drawing Time
                </h1>
                <select
                  id="rounds"
                  className="inline-block h-10 w-40 align-middle"
                  ref={dtRef}
                >
                  <option value="40">40</option>
                  <option value="60">60</option>
                  <option value="80">80</option>
                  <option value="100">100</option>
                  <option value="120">120</option>
                  <option value="140">140</option>
                  <option value="160">160</option>
                </select>
              </div>
              <div>
                <h1
                  className="pt-14 inline-block bg-gray-300 p-2 align-middle font-semibold "
                  style={{ height: "20vh" }}
                >
                  Custom Words
                </h1>
                <textarea
                  className="align-middle border border-black pl-2 pt-4 w-32 resize-none"
                  placeholder="word1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;word2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;word3"
                  style={{ height: "20vh" }}
                  onChange={(e) => {
                    setWords(e.target.value.split("\n"));
                  }}
                ></textarea>
              </div>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <button
                onClick={createRoom}
                className="bg-green-500 w-28 h-10 rounded-xl text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
              >
                Create Room
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-5"></div>
      {toast.show && (
        <Toast
          title={toast.title}
          description={toast.description}
          type={toast.type}
        />
      )}
    </>
  );
};

export default create;
