import { PieceType } from './Pieces';
import { PlayerType } from './Player';

export interface Movement {
  originCell: string;
  originPlayer: PlayerType;
  originPiece: PieceType;
  destinationcell: string;
}
