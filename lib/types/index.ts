export interface RoomOptions {
  name: string;
  players: Player[];
  type: RoomType;
  rounds: number;
  turnOf: Player;
}

export interface Player {
  username: string;
  avatar: string;
  score: number;
}

export type RoomType = "public" | "private";
