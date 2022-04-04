import DrawingCanvas from "./DrawingCanvas";
import PlayerList from "./PlayerList";
import ChatBox from "./ChatBox";

const GameScreen = ({ players }: PlayerListInterface) => {
  return (
    <div className="flex flex-row mt-5">
      <PlayerList players={players} />
      <DrawingCanvas />
      <ChatBox />
    </div>
  );
};

interface PlayerElementInterface {
  avatar: string;
  name: string;
  score: number;
}

interface PlayerListInterface {
  players: PlayerElementInterface[];
}

export default GameScreen;
