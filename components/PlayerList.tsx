import { Player } from "../lib/types";

const PlayerList = ({ players }: PlayerListOptions) => {
  return (
    <div className="playerlist w-60 h-96 bg-white shadow-gray-600 shadow-md rounded-l-3xl overflow-y-scroll flex flex-col">
      {players.map((player, i) => {
        return (
          <PlayerElement
            avatar={player.avatar}
            username={player.username}
            score={player.score}
            key={i}
          />
        );
      })}
    </div>
  );
};

const PlayerElement = ({ avatar, username, score }: Player) => {
  return (
    <div className="mb-3">
      <img
        src={"/assets/avatars/" + avatar + ".svg"}
        alt={username + `'s avatar`}
        className="rounded-full w-12 h-12 inline-block align-top mt-2"
      />
      <div className="inline-block align-middle">
        <p>{username}</p>
        <p className="text-xs">
          <strong>Score:</strong> {score}
        </p>
      </div>
    </div>
  );
};

interface PlayerListOptions {
  players: Player[];
}

export default PlayerList;
