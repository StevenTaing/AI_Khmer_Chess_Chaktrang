import { Pieces } from './Pieces.js';

export interface Player {
  player: 'black' | 'white';
  pieces?: Pieces;
}

export type PlayerType = 'black' | 'white';
