import { useState, useEffect } from "react";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import Image from "next/image";
import Avatar1 from "../public/assets/avatars/1.svg";
import Avatar2 from "../public/assets/avatars/2.svg";
import Avatar3 from "../public/assets/avatars/3.svg";
import Avatar4 from "../public/assets/avatars/4.svg";
import Avatar5 from "../public/assets/avatars/5.svg";
import Avatar6 from "../public/assets/avatars/6.svg";
import Avatar7 from "../public/assets/avatars/7.svg";
import Avatar8 from "../public/assets/avatars/8.svg";
import Toast from "./Toast";

const UserForm = () => {
  const randomUsername = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, colors],
    length: 2,
    separator: " ",
  });
  const [username, setUsername] = useState(randomUsername);
  const [avatar, setAvatar] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const name = localStorage.getItem("username");
    const userAvatar = localStorage.getItem("avatar");
    if (name && avatar) {
      setUsername(name);
      setAvatar(Number(userAvatar));
    } else {
      return;
    }
  }, []);

  const save = () => {
    if (username === "") {
      setUsername(randomUsername);
      localStorage.setItem("username", randomUsername);
      localStorage.setItem("avatar", avatar.toString());
      setIsSaved(true);
    } else {
      localStorage.setItem(
        "username",
        username === "" ? randomUsername : username
      );
      localStorage.setItem("avatar", avatar.toString());
      setIsSaved(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-10 rounded-3xl shadow-2xl h-full bg-white">
      <label className="font-bold">Name</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        value={username}
        className="w-56 h-10 bg-gray-400 rounded-xl border-none pl-3 focus:underline"
        onChange={(e: any) => {
          setUsername(e.target.value);
          setIsSaved(false);
        }}
      />
      <br />
      <label className="font-bold mb-5">Avatar</label>
      <img
        src={"/assets/avatars/" + avatar + ".svg"}
        width={200}
        height={200}
        className="mb-24"
      />
      <div
        className="grid grid-cols-4 gap-5 w-full h-full"
        style={{ marginTop: -50 }}
      >
        <Image
          src={Avatar1}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(1);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar2}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(2);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar3}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(3);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar4}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(4);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar5}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(5);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar6}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(6);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar7}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(7);
            setIsSaved(false);
          }}
        />
        <Image
          src={Avatar8}
          width={100}
          height={100}
          className="bg-gray-500 rounded-xl cursor-pointer hover:scale-110 transition-all delay-300 duration-200 ease-in-out shadow-2xl"
          onClick={() => {
            setAvatar(8);
            setIsSaved(false);
          }}
        />
      </div>
      {!isSaved && (
        <button
          className="w-16 h-12 bg-green-600 rounded-xl text-white mt-5"
          onClick={save}
        >
          Save
        </button>
      )}
      {isSaved && (
        <Toast
          title="Success!"
          description="Your changes were saved"
          type="success"
        />
      )}
    </div>
  );
};

export default UserForm;
