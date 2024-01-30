import { BoardState } from '../../Interfaces/BoardState.js';
import { PlayerType } from '../../Interfaces/Player.js';

export const Queen = (
  BoardState: BoardState[],
  originPlayer: PlayerType,
  originRow: number,
  originColumn: number
) => {
  let possibleMove = [];
  let TLCell = `c${originRow + 1}_${originColumn - 1}`;
  let TRCell = `c${originRow + 1}_${originColumn + 1}`;
  let BLCell = `c${originRow - 1}_${originColumn - 1}`;
  let BRCell = `c${originRow - 1}_${originColumn + 1}`;

  for (const poistion of BoardState) {
    const destinationCell = poistion.cell;
    const destinationPlayer = poistion.player;

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
