import { PieceType } from '../Interfaces/Pieces';
import { PlayerType } from '../Interfaces/Player';

export const gameState = {
  playerTurn: 'white',
  pieceClick: false,
  gameOver: false,
  aiPlayer: false,
  possibleMove: [] as string[],
  selection: {
    cell: '',
    player: '' as PlayerType,
    piece: '' as PieceType,
  },
};
