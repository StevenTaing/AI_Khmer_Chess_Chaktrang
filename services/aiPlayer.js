import { $, $$$ } from './utilities.js';
import { gameState } from '../configurations/gameState.js';
import { chessConfig } from '../configurations/chessConfig.js';
import { pieceImages } from '../configurations/pieceImages.js';
import { gameNodes } from './gameNodes.js';
import { minimax } from './minimax.js';

export const aiMove = () => {
  const chessMessage = $('#message');
  const bestMoveResult = minimax(gameNodes(), 3, -Infinity, Infinity, false);
  const bestMoves = bestMoveResult.move;
  const randomIndex = Math.floor(Math.random() * bestMoves.length);
  const move = bestMoves[randomIndex];

  const originPosition = $(`#${move.fromCell}`);
  const destinationPosition = $(`#${move.cell}`);

  originPosition.style.backgroundImage = 'none';
  originPosition.removeAttribute('player');
  originPosition.removeAttribute('piece');
  gameState.pieceClick = false;

  if ($$$(destinationPosition, 'piece') == 'king') {
    gameState.gameOver = true;
    $('#sound-won').play();
    if (gameState.playerTurn == 'white') {
      chessMessage.innerHTML = chessConfig.whiteWon;
    } else {
      chessMessage.innerHTML = chessConfig.blackWon;
    }

    destinationPosition.style.backgroundImage = `url('data:image/svg+xml,${
      pieceImages[move.player + '_' + move.piece]
    }')`;
    destinationPosition.setAttribute('player', move.player);
    destinationPosition.setAttribute('piece', move.piece);
    return;
  }

  if (
    (move.piece === 'pawn' && move.fromCell.substring(1, 2) == 8) ||
    (move.piece === 'pawn' && move.fromCell.substring(1, 2) == 1)
  ) {
    destinationPosition.style.backgroundImage = `url('data:image/svg+xml,${
      pieceImages[move.player + '_pawn_pro']
    }')`;
    destinationPosition.setAttribute('player', move.player);
    destinationPosition.setAttribute('piece', 'pawn_pro');
    if (gameState.playerTurn == 'white') {
      gameState.playerTurn = 'black';
      chessMessage.innerHTML = chessConfig.blackTurn;
    } else {
      gameState.playerTurn = 'white';
      chessMessage.innerHTML = chessConfig.whiteTurn;
    }
    return;
  }

  $('#sound-click').play();
  destinationPosition.style.backgroundImage = `url('data:image/svg+xml,${
    pieceImages[move.player + '_' + move.piece]
  }')`;
  destinationPosition.setAttribute('player', move.player);
  destinationPosition.setAttribute('piece', move.piece);

  if (gameState.playerTurn == 'white') {
    gameState.playerTurn = 'black';
    chessMessage.innerHTML = chessConfig.blackTurn;
  } else {
    gameState.playerTurn = 'white';
    chessMessage.innerHTML = chessConfig.whiteTurn;
  }
};
