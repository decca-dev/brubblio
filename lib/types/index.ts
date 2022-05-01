export interface ChatContent {
  author: string;
  message: string;
}

export interface User {
  username: string;
  avatar: string;
  id: string;
}
export interface Player extends User {
  score: number;
}

export interface RoomOptions {
  id?: string;
  name: string;
  owner: Player;
  players?: Player[];
  rounds: number;
  drawing_time: number;
  custom_words: string[];
  has_started?: boolean;
  type: "public" | "private" | "sandbox";
}

export interface DrawingData {
  start: {
    x: number;
    y: number;
  };
  end: {
    x: number;
    y: number;
  };
  color: string;
  lineWidth: number;
}
