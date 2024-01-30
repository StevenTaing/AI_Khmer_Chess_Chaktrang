import { $$, $$$ } from './utilities.js';
import { chessConfig } from '../configurations/chessConfig.js';
import { BoardState } from '../Interfaces/BoardState.js';
import { PlayerType } from '../Interfaces/Player.js';
import { PieceType } from '../Interfaces/Pieces.js';

export const boardStates = () => {
  let states: BoardState[] = [];
  $$(chessConfig.cellSelector).forEach((element) => {
    states.push({
      cell: $$$(element, 'id') as string,
      player: $$$(element, 'player') as PlayerType,
      piece: $$$(element, 'piece') as PieceType,
    });
  });
  return states;
};
