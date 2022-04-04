interface Games {
  games: Game[];
}

interface Game {
  name: string;
  players: number;
  id: string;
}

const GamePanel = ({ games }: Games) => {
  return (
    <div className="bg-blue-600 ring-8 w-full h-full rounded-lg p-3 text-white hover:scale-110 hover:-translate-y-2 transition-all delay-300 duration-200 ease-in-out">
      <h1 className="text-center font-bold text-2xl mb-4">Available Games</h1>
      <div className="grid grid-cols-4 gap-3">
        {games.map((game, i) => {
          return (
            <Game
              key={i}
              name={game.name}
              players={game.players}
              id={game.id}
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
      <h2 className={players === 9 ? "text-red-700" : ""}>
        <strong>Players:</strong> {players}/9
      </h2>
      {players !== 9 && (
        <button
          onClick={() => (location.href = `/rooms/id`)}
          className="text-yellow-400 hover:underline"
        >
          Join
        </button>
      )}
      {players === 9 && (
        <button disabled className="text-gray-900">
          Join
        </button>
      )}
    </div>
  );
};

export default GamePanel;
