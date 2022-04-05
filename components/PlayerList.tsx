const PlayerList = ({ players }: PlayerListInterface) => {
  return (
    <div className="playerlist w-60 h-96 bg-white shadow-gray-600 shadow-md rounded-l-3xl overflow-y-scroll flex flex-col">
      {players.map((player, i) => {
        return (
          <PlayerElement
            avatar={player.avatar}
            name={player.name}
            score={player.score}
            key={i}
          />
        );
      })}
    </div>
  );
};

const PlayerElement = ({ avatar, name, score }: PlayerElementInterface) => {
  return (
    <div className="mb-3">
      <img
        src={"/assets/avatars/" + avatar + ".svg"}
        alt={name + `'s avatar`}
        className="rounded-full w-12 h-12 inline-block align-top mt-2"
      />
      <div className="inline-block align-middle">
        <p>{name}</p>
        <p className="text-xs">
          <strong>Score:</strong> {score}
        </p>
      </div>
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

export default PlayerList;
