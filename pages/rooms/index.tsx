import type { NextPage } from "next";
import { useMetaData } from "../../lib/hooks/useMetaData";
import Header from "../../components/Header";
import GamePanel from "../../components/GamePanel";

const index: NextPage = () => {
  const games = [
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 9,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
    {
      name: "sex time",
      players: 7,
      id: "lol",
    },
  ];

  return (
    <div className="container">
      {useMetaData("Rooms", "Browse all the available rooms", "/rooms")}
      <Header title="Browse all the available games" />
      <GamePanel games={games} />
    </div>
  );
};

export default index;
