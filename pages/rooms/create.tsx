import type { NextPage } from "next";
import Header from "../../components/Header";
import { useState, useContext, useRef } from "react";
import { useMetaData } from "../../lib/hooks/useMetaData";
import UserContext from "../../components/contexts/UserContext";

const create: NextPage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [link, setLink] = useState(`${process.env.URL}/rooms`);
  const rRef = useRef<HTMLSelectElement>(null);
  const dtRef = useRef<HTMLSelectElement>(null);
  const user = useContext(UserContext);

  const createRoom = () => {};

  return (
    <>
      {useMetaData("Create", "Create a new room", "/rooms/create")}
      <Header title="Create a new room" />
      <div className="container">
        <div className="grid grid-cols-2 gap-9">
          <div className="bg-white p-5 rounded-lg">
            <h1 className="text-center text-xl font-bold mb-3">Settings</h1>
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
            <div className="mt-5 flex flex-col items-center">
              <button
                onClick={createRoom}
                className="bg-green-500 w-28 h-10 rounded-xl text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
              >
                Create Room
              </button>
            </div>
          </div>
          <div className="p-5">
            <h1 className="text-xl font-bold mb-3 text-center">Players</h1>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
              <div>
                <img
                  src={"/assets/avatars/" + user?.avatar + ".svg"}
                  className="w-24 h-24 rounded-full"
                />
                <p className="text-white">{user?.username}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-5">
          <h1 className="font-bold text-xl mb-5">Invite your friends</h1>
          <div>
            <span className="text-center inline-block align-middle w-96 py-2 border border-black pl-3 bg-white">
              {link}
            </span>
            <button
              className="inline-block align-middle border border-black py-2 -ml-1 w-12 bg-yellow-500 font-semibold"
              onClick={() => navigator.clipboard.writeText(link)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>
      <div className="pb-5"></div>
    </>
  );
};

export default create;
