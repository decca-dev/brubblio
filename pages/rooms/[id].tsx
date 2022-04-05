import type { NextPage, NextPageContext } from "next";
import GameScreen from "../../components/GameScreen";
import { useMetaData } from "../../lib/hooks/useMetaData";
import { useRouter } from "next/router";

const room: NextPage = () => {
  const router = useRouter();
  const roomName = router.asPath.replace("/rooms/", "");

  const players = [
    {
      name: "lol",
      avatar: "1",
      score: 69,
    },
    {
      name: "lol",
      avatar: "1",
      score: 69,
    },
    {
      name: "lol",
      avatar: "1",
      score: 69,
    },
    {
      name: "lol",
      avatar: "1",
      score: 69,
    },
    {
      name: "lol",
      avatar: "1",
      score: 69,
    },
  ];

  return (
    <>
      {useMetaData(
        roomName,
        `Join the ${roomName} brubblio room.`,
        router.asPath
      )}
      <GameScreen players={players} />
    </>
  );
};

export default room;
