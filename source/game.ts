import { chessConfig } from './configurations/chessConfig.js';
import { chessBoard } from './configurations/chessBoard.js';
import { pieceImages } from './configurations/pieceImages.js';
import { gameInitialized } from './configurations/gameInitialized.js';
import { gameState } from './configurations/gameState.js';
import { $, $$, $$$ } from './services/utilities.js';
import { addSelection, clearSection } from './services/selection.js';
import { boardStates } from './services/boardState.js';
import { determine } from './services/moveDetermination/moveDetermination.js';
import { makeMove } from './services/moveDetermination/makeMove.js';
import { aiMove } from './services/iaPlayer.js';
import { Player, PlayerType } from './Interfaces/Player.js';
import { PieceType } from './Interfaces/Pieces.js';

addEventListener('DOMContentLoaded', (_) => {
  chessBoard(chessConfig.boardSelector);
  insertPiece(gameInitialized);
  addCellListener();
});

const insertPiece = (startingPositions: Player[]) => {
  startingPositions.forEach((poistion) => {
    const player = poistion.player;
    const pieces = poistion.pieces;
    for (const piece in pieces) {
      const cell = $(`#${piece}`) as HTMLDivElement;
      const pieceImage = pieceImages[`${player}_${pieces[piece]}`];
      cell.setAttribute('player', player);
      cell.setAttribute('piece', pieces[piece]);
      cell.style.backgroundImage = `url('${pieceImage}')`;
    }
  });
};

const addCellListener = () => {
  const switchPlayer = $('#switch-player');
  switchPlayer?.addEventListener('click', () => {
    if (switchPlayer.textContent === 'Play with Machine') {
      switchPlayer.textContent = 'Play with Human';
      gameState.aiPlayer = true;
      console.log(gameState.aiPlayer);
      if (!gameState.gameOver && gameState.playerTurn === 'black') aiMove();
    } else {
      switchPlayer.textContent = 'Play with Machine';
      gameState.aiPlayer = false;
      console.log(gameState.aiPlayer);
    }
  });

  const cellText = $('#cell-text') as HTMLInputElement;
  cellText?.addEventListener('change', () => {
    const display = cellText?.checked ? 'block' : 'none';
    document.documentElement.style.setProperty('--cell-display', display);
  });

  const boardText = $('#board-text') as HTMLInputElement;
  boardText?.addEventListener('change', () => {
    const display = boardText?.checked ? 'block' : 'none';
    document.documentElement.style.setProperty('--board-display', display);
  });

  const upsideDown = $('#upside-down') as HTMLInputElement;
  upsideDown?.addEventListener('change', () => {
    const flexWrap = upsideDown.checked ? 'wrap-reverse' : 'wrap';
    const content = upsideDown.checked
      ? '"1 2 3 4 5 6 7 8"'
      : '"8 7 6 5 4 3 2 1"';
    const board = $(chessConfig.boardSelector) as HTMLDivElement;
    if (board) {
      board.style.flexWrap = flexWrap;
      document.documentElement.style.setProperty('--column-text', content);
    }
  });

  $$(chessConfig.cellSelector).forEach((Element: Element) => {
    Element.addEventListener('click', () => {
      const getCell = $$$(Element, 'id') as string;
      const getPiece = $$$(Element, 'piece') as PieceType;
      const getPlayer = $$$(Element, 'player') as PlayerType;
      const getRow = parseInt(getCell.substring(1, 2)) as number;
      const getColumn = parseInt(getCell.substring(3)) as number;

      if (gameState.gameOver) return;
      if (gameState.aiPlayer && gameState.playerTurn === 'black') return;

      if (getPlayer == gameState.playerTurn && gameState.pieceClick == false) {
        clearSection();
        Element.classList.add('cell-selected');

        Object.assign(gameState.selection, {
          cell: getCell,
          piece: getPiece,
          player: getPlayer,
        });
        gameState.pieceClick = true;

        const states = boardStates();
        let getPossibleMove = determine(
          states,
          getPiece,
          getPlayer,
          getRow,
          getColumn
        ) as string[];

        if (getPossibleMove) {
          gameState.possibleMove = getPossibleMove;
          addSelection(getPossibleMove);
        }

        return;
      }

      if (getCell == gameState.selection.cell) {
        gameState.pieceClick = false;
        clearSection();
        return;
      }

      if (gameState.pieceClick == true) {
        const destinationCell = $$$(Element, 'id') as string;

        if (gameState.possibleMove.includes(destinationCell)) {
          makeMove(
            gameState.selection.cell,
            gameState.selection.player,
            gameState.selection.piece,
            destinationCell
          );
          clearSection();
        }

        if (gameState.aiPlayer && gameState.playerTurn !== 'black') {
          aiMove();
        }
      }
    });
  });
};
