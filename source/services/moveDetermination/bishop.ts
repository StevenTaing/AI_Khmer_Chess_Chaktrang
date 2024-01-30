import { BoardState } from '../../Interfaces/BoardState.js';
import { PlayerType } from '../../Interfaces/Player.js';

export const Bishop = (
  BoardState: BoardState[],
  originPlayer: PlayerType,
  originRow: number,
  originColumn: number
) => {
  let possibleMove = [];
  let TCell = '';
  let TLCell = '';
  let TRCell = '';
  let BLCell = '';
  let BRCell = '';

  if (originPlayer === 'white') {
    TCell = `c${originRow + 1}_${originColumn}`;
    TLCell = `c${originRow + 1}_${originColumn - 1}`;
    TRCell = `c${originRow + 1}_${originColumn + 1}`;
    BLCell = `c${originRow - 1}_${originColumn - 1}`;
    BRCell = `c${originRow - 1}_${originColumn + 1}`;
  }

  if (originPlayer === 'black') {
    TCell = `c${originRow - 1}_${originColumn}`;
    TLCell = `c${originRow + 1}_${originColumn - 1}`;
    TRCell = `c${originRow + 1}_${originColumn + 1}`;
    BLCell = `c${originRow - 1}_${originColumn - 1}`;
    BRCell = `c${originRow - 1}_${originColumn + 1}`;
  }

  for (const poistion of BoardState) {
    const destinationCell = poistion.cell;
    const destinationPlayer = poistion.player;

    if (destinationCell === TCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TCell);
    }
    if (destinationCell === TLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TLCell);
    }
    if (destinationCell === TRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TRCell);
    }
    if (destinationCell === BLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BLCell);
    }
    if (destinationCell === BRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BRCell);
    }
  }
  return possibleMove;
};
