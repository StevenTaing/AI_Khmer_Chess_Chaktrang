import { BoardState } from '../Interfaces/BoardState.js';
import { Movement } from '../Interfaces/Movement.js';
import { PieceType } from '../Interfaces/Pieces.js';
import { PlayerType } from '../Interfaces/Player.js';
import { pieceScores } from '../configurations/pieceScores.js';
import { determine } from './moveDetermination/moveDetermination.js';

export const minimax = (
  node: BoardState[],
  depth: number,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean
) => {
  if (depth === 0) {
    return { score: evaluateNode(node), move: null };
  }
  const children = getChildren(node, isMaximizingPlayer);

  let bestMoves: Movement[] = [];
  let bestScore: number = isMaximizingPlayer ? -Infinity : Infinity;

  for (const child of children) {
    const score = minimax(
      child.childNode,
      depth - 1,
      alpha,
      beta,
      !isMaximizingPlayer
    ).score as number;

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
  return { score: bestScore, move: bestMoves }; // Return one of the best moves
};

const evaluateNode = (node: BoardState[]) => {
  let whiteScore = 0;
  let blackScore = 0;

  for (const childNode of node) {
    const value = pieceScores[childNode.piece as PieceType] | 0;
    if (childNode.player === 'white') {
      whiteScore += value;
    } else {
      blackScore += value;
    }
  }
  return whiteScore - blackScore;
};

const getChildren = (node: BoardState[], isMaximizingPlayer: boolean) => {
  let children = [];
  for (const poistion of node) {
    let getCell = poistion.cell as string;
    let getPiece = poistion.piece as PieceType;
    let getPlayer = poistion.player as PlayerType;
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
      ) as string[];

      for (let i = 0; i < getPossibleMove.length; i++) {
        let movement: Movement = {
          originCell: getCell,
          originPlayer: getPlayer,
          originPiece: getPiece,
          destinationcell: getPossibleMove[i],
        };
        let childNode = node.map((n) => {
          if (n.cell === getCell) {
            return { ...n, player: null, piece: null };
          } else if (n.cell === getPossibleMove[i]) {
            return { ...n, player: getPlayer, piece: getPiece };
          } else {
            return n;
          }
        }) as BoardState[];
        children.push({ movement: movement, childNode: childNode });
      }
    }
  }
  return children;
};
