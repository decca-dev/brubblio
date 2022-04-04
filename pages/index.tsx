import type { NextPage } from "next";
import ChatBox from "../components/ChatBox";
import PlayerList from "../components/PlayerList";
import DrawingCanvas from "../components/DrawingCanvas";
import Palette from "../components/Palette";
import { useMetaData } from "../lib/hooks/useMetaData";

const Home: NextPage = () => {
  const players = [
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
    {
      avatar:
        "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
      name: "Ass",
      score: 69,
    },
  ];

  return (
    <>
      {useMetaData("Home", "Brubblio", "/")}
      <div className="flex flex-row mt-5">
        <PlayerList players={players} />
        <DrawingCanvas />
        <ChatBox />
      </div>
    </>
  );
};

export default Home;
