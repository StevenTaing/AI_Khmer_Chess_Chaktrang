export const Knight = (gameNodes, originPlayer, originRow, originColumn) => {
  let possibleMove = [];
  let TTLCell = `c${originRow + 2}_${originColumn - 1}`;
  let TTRCell = `c${originRow + 2}_${originColumn + 1}`;
  let TLLCell = `c${originRow + 1}_${originColumn - 2}`;
  let TRRCell = `c${originRow + 1}_${originColumn + 2}`;
  let BBLCell = `c${originRow - 2}_${originColumn - 1}`;
  let BBRCell = `c${originRow - 2}_${originColumn + 1}`;
  let BLLCell = `c${originRow - 1}_${originColumn - 2}`;
  let BRRCell = `c${originRow - 1}_${originColumn + 2}`;

  for (const poistion of gameNodes) {
    const destinationCell = poistion.cell;
    const destinationPlayer = poistion.player;

    if (destinationCell === TTLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TTLCell);
    }
    if (destinationCell === TTRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TTRCell);
    }
    if (destinationCell === TLLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TLLCell);
    }
    if (destinationCell === TRRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(TRRCell);
    }
    if (destinationCell === BBLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BBLCell);
    }
    if (destinationCell === BBRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BBRCell);
    }
    if (destinationCell === BLLCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BLLCell);
    }
    if (destinationCell === BRRCell && destinationPlayer !== originPlayer) {
      possibleMove.push(BRRCell);
    }
  }
  return possibleMove;
};
