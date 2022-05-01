import type { NextPage } from "next";
import { useMetaData } from "../lib/hooks/useMetaData";
import UserForm from "../components/UserForm";
import Header from "../components/Header";
import { useSession, signIn } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      {useMetaData("Home", "Brubblio", "/")}
      <div className="container">
        {session && (
          <div className="flex flex-col items-center text-center pb-10">
            <Header title="The most fun multiplayer scribbling game" />
            <UserForm username={session?.user?.name!} />
            <div className="my-5"></div>
            <div className="flex flex-row items-center justify-evenly"></div>
          </div>
        )}
        {!session && (
          <div className="flex flex-col items-center justify-center h-screen">
            <button
              className="bg-yellow-500 w-28 h-10 rounded-xl font-bold text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
              onClick={() => signIn()}
            >
              Login
            </button>
          </div>
        )}
        <div className="flex flex-row items-center justify-center pb-10">
          <div>
            <button
              className="bg-green-500 w-28 h-10 rounded-xl text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
              onClick={() => (location.href = "/rooms")}
            >
              Browse rooms
            </button>
            <button
              className="bg-violet-500 w-28 h-10 rounded-xl text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
              onClick={() => (location.href = "/rooms/create")}
            >
              Create room
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
