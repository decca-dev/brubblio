export interface ChatContent {
  author: string;
  message: string;
}

export interface User {
  username: string;
  avatar: string;
}

export interface RoomOptions {
  owner: Player;
  players: Player[];
  rounds: number;
  drawingTime: number;
}

export interface Player {
  username: string;
  avatar: string;
  score: number;
}
