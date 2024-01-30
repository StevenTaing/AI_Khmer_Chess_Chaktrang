export const King = (BoardState, originPlayer, originRow, originColumn) => {
    let possibleMove = [];
    let TCell = `c${originRow + 1}_${originColumn}`;
    let TLCell = `c${originRow + 1}_${originColumn - 1}`;
    let TRCell = `c${originRow + 1}_${originColumn + 1}`;
    let LCell = `c${originRow}_${originColumn - 1}`;
    let RCell = `c${originRow}_${originColumn + 1}`;
    let BCell = `c${originRow - 1}_${originColumn}`;
    let BLCell = `c${originRow - 1}_${originColumn - 1}`;
    let BRCell = `c${originRow - 1}_${originColumn + 1}`;
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
        if (destinationCell === LCell && destinationPlayer !== originPlayer) {
            possibleMove.push(LCell);
        }
        if (destinationCell === RCell && destinationPlayer !== originPlayer) {
            possibleMove.push(RCell);
        }
        if (destinationCell === BCell && destinationPlayer !== originPlayer) {
            possibleMove.push(BCell);
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
