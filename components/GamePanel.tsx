import { Player } from "../lib/types";

interface Game {
  name: string;
  players: Player[];
  id: string;
}

const GamePanel = ({ games }: { games: Game[] }) => {
  return (
    <div className="bg-blue-600 ring-8 min-w-min h-full rounded-lg p-3 text-white">
      <h1 className="text-center font-bold text-2xl mb-4">Available Games</h1>
      <div className="grid grid-cols-4 gap-3">
        {games.map((game, i) => {
          return (
            <Game
              name={game.name}
              players={game.players}
              id={game.id}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

const Game = ({ name, players, id }: Game) => {
  return (
    <div className="font-mono">
      <h1>
        <strong>Name:</strong> {name}
      </h1>
      <h2 className={players?.length === 9 ? "text-red-700" : ""}>
        <strong>Players:</strong> {players?.length}/9
      </h2>
      {players?.length !== 9 && (
        <button
          onClick={() => (location.href = `/rooms/${id}`)}
          className="text-yellow-400 hover:underline"
        >
          Join
        </button>
      )}
      {players?.length === 9 && (
        <button disabled className="text-gray-900">
          Join
        </button>
      )}
    </div>
  );
};

export default GamePanel;
