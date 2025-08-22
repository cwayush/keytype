import WebSocket from 'ws';

export type User = {
  userId: string;
  name: string;
  image: string | null;
  ws: WebSocket;
  rooms: string[];
};

export interface ProgressUpdate {
  roomCode: string;
  userId: string;
  progress: { wpm: number; accuracy: number; progress: number };
}

