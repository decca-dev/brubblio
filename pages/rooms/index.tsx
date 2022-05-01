import type { NextPageContext } from "next";
import { useMetaData } from "../../lib/hooks/useMetaData";
import Header from "../../components/Header";
import GamePanel from "../../components/GamePanel";
import { Player, RoomOptions } from "../../lib/types";
interface Game {
  name: string;
  players: Player[];
  id: string;
}

const index = ({ games }: { games: Game[] }) => {
  console.log(games);
  return (
    <div className="container">
      {useMetaData("Rooms", "Browse all the available rooms", "/rooms")}
      <Header title="Browse all the available games" />
      <GamePanel games={games} />
    </div>
  );
};

export const getServerSideProps = async (ctx: NextPageContext) => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/rooms`);
  const data: { error: boolean; message: string; data: RoomOptions[] } =
    await res.json();

  return {
    props: {
      games: data.data.filter((game) => game.has_started === false),
    },
  };
};

export default index;
