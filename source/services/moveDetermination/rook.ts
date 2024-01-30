import { BoardState } from '../../Interfaces/BoardState.js';
import { PlayerType } from '../../Interfaces/Player.js';

export const Rook = (
  BoardState: BoardState[],
  originPlayer: PlayerType,
  originRow: number,
  originColumn: number
) => {
  let possibleMove = [];

  for (let i = 1; i < 8; i++) {
    let TTTCell = `c${originRow + i}_${originColumn}`;
    const destination = BoardState.find((state) => state.cell === TTTCell);
    if (destination) {
      if (destination.piece === null) {
        possibleMove.push(TTTCell);
      } else if (
        destination.piece !== null &&
        destination.player !== originPlayer
      ) {
        possibleMove.push(TTTCell);
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    let BBBCell = `c${originRow - i}_${originColumn}`;
    const destination = BoardState.find((state) => state.cell === BBBCell);
    if (destination) {
      if (destination.piece === null) {
        possibleMove.push(BBBCell);
      } else if (
        destination.piece !== null &&
        destination.player !== originPlayer
      ) {
        possibleMove.push(BBBCell);
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    let LLLCell = `c${originRow}_${originColumn - i}`;
    const destination = BoardState.find((state) => state.cell === LLLCell);
    if (destination) {
      if (destination.piece === null) {
        possibleMove.push(LLLCell);
      } else if (
        destination.piece !== null &&
        destination.player !== originPlayer
      ) {
        possibleMove.push(LLLCell);
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  for (let i = 1; i < 8; i++) {
    let RRRCell = `c${originRow}_${originColumn + i}`;
    const destination = BoardState.find((state) => state.cell === RRRCell);
    if (destination) {
      if (destination.piece === null) {
        possibleMove.push(RRRCell);
      } else if (
        destination.piece !== null &&
        destination.player !== originPlayer
      ) {
        possibleMove.push(RRRCell);
        break;
      } else {
        break;
      }
    } else {
      break;
    }
  }
  return possibleMove;
};
