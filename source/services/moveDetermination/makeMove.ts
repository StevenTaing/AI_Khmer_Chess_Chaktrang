import { $, $$$ } from '../utilities.js';
import { chessConfig } from '../../configurations/chessConfig.js';
import { pieceImages } from '../../configurations/pieceImages.js';
import { gameState } from '../../configurations/gameState.js';
import { PlayerType } from '../../Interfaces/Player.js';
import { PieceType } from '../../Interfaces/Pieces.js';

export const makeMove = (
  originCell: string,
  originPayer: PlayerType,
  originPiece: PieceType,
  destinationCell: string
) => {
  const originPosition = $(`#${originCell}`) as HTMLDivElement;
  const destinationPosition = $(`#${destinationCell}`) as HTMLDivElement;
  const message = $('#message') as HTMLInputElement;
  const pieceImage = pieceImages[`${originPayer}_${originPiece}`];
  const wonSound = $('#sound-won') as HTMLAudioElement;
  const clickSound = $('#sound-click') as HTMLAudioElement;

  originPosition.style.backgroundImage = 'none';
  originPosition.removeAttribute('player');
  originPosition.removeAttribute('piece');
  gameState.pieceClick = false;

  if ($$$(destinationPosition, 'piece') == 'king') {
    destinationPosition.style.backgroundImage = `url('${pieceImage}')`;
    destinationPosition.setAttribute('player', originPayer);
    destinationPosition.setAttribute('piece', originPiece);

    if (gameState.playerTurn === 'white') {
      message.innerHTML = chessConfig.whiteWon;
    } else {
      message.innerHTML = chessConfig.blackWon;
    }

    gameState.gameOver = true;
    wonSound.play();

    return;
  }

  if (
    (originPiece === 'pawn' &&
      parseInt(destinationCell.substring(1, 2)) == 6) ||
    (originPiece === 'pawn' && parseInt(destinationCell.substring(1, 2)) == 3)
  ) {
    const pawnProImage = pieceImages[`${originPayer}_pawn_pro`];
    destinationPosition.style.backgroundImage = `url('${pawnProImage}')`;
    destinationPosition.setAttribute('player', originPayer);
    destinationPosition.setAttribute('piece', 'pawn_pro');
    clickSound.play();
    if (gameState.playerTurn == 'white') {
      gameState.playerTurn = 'black';
      message.innerHTML = chessConfig.blackTurn;
    } else {
      gameState.playerTurn = 'white';
      message.innerHTML = chessConfig.whiteTurn;
    }
    return;
  }

  clickSound.play();
  destinationPosition.style.backgroundImage = `url('${pieceImage}')`;
  destinationPosition.setAttribute('player', originPayer);
  destinationPosition.setAttribute('piece', originPiece);

  if (gameState.playerTurn == 'white') {
    gameState.playerTurn = 'black';
    message.innerHTML = chessConfig.blackTurn;
  } else {
    gameState.playerTurn = 'white';
    message.innerHTML = chessConfig.whiteTurn;
  }
};
