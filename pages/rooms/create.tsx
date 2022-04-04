import { useState } from "react";
import type { NextPage } from "next";
import { useMetaData } from "../../lib/hooks/useMetaData";
import Header from "../../components/Header";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
} from "unique-names-generator";

type RoomType = "public" | "private";

const create: NextPage = () => {
  const [name, setName] = useState(
    uniqueNamesGenerator({
      dictionaries: [adjectives, colors],
      length: 2,
      separator: " ",
    })
  );
  const [type, setType] = useState<RoomType>();

  const selectOnlyThis = (element: HTMLInputElement) => {
    const checkboxes = document.getElementsByName(
      "check"
    ) as NodeListOf<HTMLInputElement>;
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    element.checked = true;
  };

  return (
    <>
      {useMetaData("Create", "Create your Bubblio room", "/rooms/create")}
      <Header title="Create your Brubblio room" />
      <div className="flex flex-col items-center w-1/2 h-auto bg-slate-400 mx-auto mt-5 rounded-2xl ring-4 ring-lime-300">
        <h1 className="font-bold mt-5 mb-5">Room Name</h1>
        <input
          type="text"
          placeholder="Epic room"
          maxLength={15}
          minLength={3}
          className="rounded pl-5 border-none focus:border-none"
          onChange={(e: any) => {
            setName(e.target.value);
          }}
          value={name}
        />
        <h1 className="font-bold mt-5 mb-5">Room Type</h1>
        <div className="mb-5 space-x-5">
          <input
            type="checkbox"
            id="public"
            name="check"
            onClick={(e: any) => {
              selectOnlyThis(e.target as HTMLInputElement);
              setType("public");
            }}
          />{" "}
          Public
          <input
            type="checkbox"
            id="private"
            name="check"
            onClick={(e: any) => {
              selectOnlyThis(e.target as HTMLInputElement);
              setType("private");
            }}
          />{" "}
          Private
        </div>
        <button className="bg-green-600 w-16 h-10 rounded-xl ring ring-white text-white font-semibold hover:scale-110 hover:-translate-y-1 transition-all delay-200 duration-200 ease-in-out focus:animate-pulse mb-5">
          Create
        </button>
      </div>
    </>
  );
};

export default create;
