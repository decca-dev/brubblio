import type { NextPageContext } from "next";
import { useMetaData } from "../lib/hooks/useMetaData";
import UserForm from "../components/UserForm";
import Header from "../components/Header";

const Home = ({ roomID }: { roomID: string }) => {
  return (
    <>
      {useMetaData("Home", "Brubblio", "/")}
      <div className="container">
        <div className="flex flex-col items-center text-center pb-10">
          <Header title="The most fun multiplayer scribbling game" />
          <UserForm />
          <div className="my-5"></div>
          <div className="flex flex-row items-center justify-evenly">
            {typeof roomID !== "undefined" && (
              <button
                className="bg-yellow-500 w-28 h-10 rounded-xl text-white hover:scale-95 hover:-translate-y-1 transition-all delay-100 duration-200 ease-in-out"
                onClick={() => (location.href = `/rooms/${roomID}`)}
              >
                Join room
              </button>
            )}
            {typeof roomID === "undefined" && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (context: NextPageContext) => {
  if (context.query?.id) {
    return {
      props: {
        roomID: context.query.id,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export default Home;
