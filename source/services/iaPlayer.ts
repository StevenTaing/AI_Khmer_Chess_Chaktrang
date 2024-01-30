import { $ } from './utilities.js';
import { minimax } from './minimax.js';
import { boardStates } from './boardState.js';
import { makeMove } from './moveDetermination/makeMove.js';

export const aiMove = () => {
  const level = $('#level') as HTMLInputElement;
  const depth = parseInt(level.value) | 3;
  const bestMoveResult = minimax(
    boardStates(),
    depth,
    -Infinity,
    Infinity,
    false
  );
  const bestMoves = bestMoveResult.move;

  if (bestMoves) {
    const randomIndex = Math.floor(Math.random() * bestMoves.length);
    const move = bestMoves[randomIndex];

    makeMove(
      move.originCell,
      move.originPlayer,
      move.originPiece,
      move.destinationcell
    );
  }
};
