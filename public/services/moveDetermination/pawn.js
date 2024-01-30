export const Pawn = (BoardState, originPlayer, originRow, originColumn) => {
    let possibleMove = [];
    let TCell = null;
    let TLCell = null;
    let TRCell = null;
    if (originPlayer === 'white') {
        TCell = `c${originRow + 1}_${originColumn}`;
        TLCell = `c${originRow + 1}_${originColumn - 1}`;
        TRCell = `c${originRow + 1}_${originColumn + 1}`;
    }
    if (originPlayer === 'black') {
        TCell = `c${originRow - 1}_${originColumn}`;
        TLCell = `c${originRow - 1}_${originColumn - 1}`;
        TRCell = `c${originRow - 1}_${originColumn + 1}`;
    }
    for (const poistion of BoardState) {
        const destinationCell = poistion.cell;
        const destinationPlayer = poistion.player;
        const destinationPiece = poistion.piece;
        if (destinationCell === TCell && destinationPiece === null) {
            possibleMove.push(TCell);
        }
        if (destinationCell === TLCell &&
            destinationPiece !== null &&
            destinationPlayer !== originPlayer) {
            possibleMove.push(TLCell);
        }
        if (destinationCell === TRCell &&
            destinationPiece !== null &&
            destinationPlayer !== originPlayer) {
            possibleMove.push(TRCell);
        }
    }
    return possibleMove;
};
