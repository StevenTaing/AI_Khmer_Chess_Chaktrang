import { pieceScores } from '../configurations/pieceScores.js';
import { determine } from './moveDetermination/moveDetermination.js';

export const minimax = (node, depth, alpha, beta, isMaximizingPlayer) => {
  if (depth === 0) {
    return { score: evaluateNode(node), move: null };
  }
  const children = getChildren(node, isMaximizingPlayer);

  let bestMoves = [];
  let bestScore = isMaximizingPlayer ? -Infinity : Infinity;

  for (const child of children) {
    const score = minimax(
      child.childNode,
      depth - 1,
      alpha,
      beta,
      !isMaximizingPlayer
    ).score;

    if (isMaximizingPlayer) {
      if (score > bestScore) {
        bestScore = score;
        bestMoves = [child.movement]; // Reset to a single move
      } else if (score === bestScore) {
        bestMoves.push(child.movement); // Add to the list of best moves
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break; // Prune subtree
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMoves = [child.movement];
      } else if (score === bestScore) {
        bestMoves.push(child.movement);
      }
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break; // Prune subtree
      }
    }
  }
  // console.log({ score: bestScore, move: bestMoves });
  return { score: bestScore, move: bestMoves }; // Return one of the best moves
};

const evaluateNode = (node) => {
  let whiteScore = 0;
  let blackScore = 0;

  for (const childNode of node) {
    const value = pieceScores[childNode.piece];
    if (childNode.player === 'white') {
      whiteScore += value;
    } else {
      blackScore += value;
    }
  }
  return whiteScore - blackScore;
};

const getChildren = (node, isMaximizingPlayer) => {
  let children = [];
  for (const poistion of node) {
    let getCell = poistion.cell;
    let getPiece = poistion.piece;
    let getPlayer = poistion.player;
    let getRow = parseInt(poistion.cell.substring(1, 2));
    let getColumn = parseInt(poistion.cell.substring(3));
    let originPlayer = isMaximizingPlayer ? 'white' : 'black';

    if (getPlayer === originPlayer) {
      let getPossibleMove = determine(
        node,
        getPiece,
        getPlayer,
        getRow,
        getColumn
      );
      for (let i = 0; i < getPossibleMove.length; i++) {
        let movement = {
          fromCell: getCell,
          cell: getPossibleMove[i],
          player: getPlayer,
          piece: getPiece,
        };
        let childNode = node.map((n) => {
          if (n.cell === getCell) {
            return { ...n, player: null, piece: null };
          } else if (n.cell === getPossibleMove[i]) {
            return { ...n, player: getPlayer, piece: getPiece };
          } else {
            return n;
          }
        });
        children.push({ movement: movement, childNode: childNode });
      }
    }
  }
  return children;
};
