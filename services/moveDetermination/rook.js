export const Rook = (gameNodes, originPlayer, originRow, originColumn) => {
  let possibleMove = [];

  for (let i = 1; i < 8; i++) {
    let TTTCell = `c${originRow + i}_${originColumn}`;
    const destination = gameNodes.find((node) => node.cell === TTTCell);
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
    const destination = gameNodes.find((node) => node.cell === BBBCell);
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
    const destination = gameNodes.find((node) => node.cell === LLLCell);
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
    const destination = gameNodes.find((node) => node.cell === RRRCell);
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
