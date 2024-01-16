import { $, $$, $$$ } from './utilities.js';
import { chessConfig } from '../configurations/chessConfig.js';
import { chessBoard } from '../configurations/chessBoard.js';
import { gameInitialized } from '../configurations/gameInitialized.js';
import { pieceImages } from '../configurations/pieceImages.js';
import { gameState } from '../configurations/gameState.js';
import { gameNodes } from './gameNodes.js';
import { determine } from './moveDetermination/moveDetermination.js';
import { aiMove } from './aiPlayer.js';

export const gameRender = {
  render() {
    chessBoard(chessConfig.boardSelector);
    this.insertPiece(gameInitialized);
    this.reverseBoard();
    this.showCellText();
    this.addCellListener();
  },
  insertPiece(startingPositions) {
    startingPositions.forEach((poistion) => {
      const player = poistion.player;
      const pieces = poistion.pieces;
      for (const piece in pieces) {
        const cell = $(`#${piece}`);
        const pieceImage = pieceImages[`${player}_${pieces[piece]}`];
        cell.setAttribute('player', player);
        cell.setAttribute('piece', pieces[piece]);
        cell.style.backgroundImage = `url('data:image/svg+xml,${pieceImage}')`;
      }
    });
  },
  reverseBoard() {
    const flexWrap = chessConfig.whitePlaysDown ? 'wrap' : 'wrap-reverse';
    $(chessConfig.boardSelector).style.flexWrap = flexWrap;
  },
  showCellText() {
    const display = chessConfig.showCellText ? 'block' : 'none';
    const cellStyle = document.styleSheets[0].cssRules[15];
    cellStyle.style.display = display;
  },
  addCellListener() {
    const chessMessage = $('#message');
    $('#bnt-new').addEventListener('click', this.newGame);
    $('#bnt-pvp').addEventListener('click', this.chessPvP);
    $('#bnt-ai').addEventListener('click', this.chessAI);

    $$(chessConfig.cellSelector).forEach((Element) => {
      Element.addEventListener('click', () => {
        const getCell = $$$(Element, 'id');
        const getPiece = $$$(Element, 'piece');
        const getPlayer = $$$(Element, 'player');
        const getRow = parseInt(getCell.substring(1, 2));
        const getColumn = parseInt(getCell.substring(3));

        if (gameState.gameCheck || gameState.gameOver || gameState.gameDrew)
          return;

        if (gameState.aiPlayer && gameState.playerTurn === 'black') return;

        if (
          getPlayer == gameState.playerTurn &&
          gameState.pieceClick == false
        ) {
          this.clearSection();
          Element.classList.add('cell-selected');

          Object.assign(gameState.selection, {
            cell: getCell,
            piece: getPiece,
            player: getPlayer,
          });
          gameState.pieceClick = true;

          const nodes = gameNodes();
          let getPossibleMove = determine(
            nodes,
            getPiece,
            getPlayer,
            getRow,
            getColumn
          );

          if (getPossibleMove) {
            gameState.possibleMove = getPossibleMove;
            this.addSelection(getPossibleMove);
          }

          return;
        }

        if (getCell == gameState.selection.cell) {
          gameState.pieceClick = false;
          this.clearSection();
          return;
        }

        if (gameState.pieceClick == true) {
          const selectedPiece = $(`#${gameState.selection.cell}`);

          if (gameState.possibleMove.includes($$$(Element, 'id'))) {
            selectedPiece.style.backgroundImage = 'none';
            selectedPiece.removeAttribute('player');
            selectedPiece.removeAttribute('piece');
            this.clearSection();
            gameState.pieceClick = false;

            if ($$$(Element, 'piece') == 'king') {
              gameState.gameOver = true;
              $('#sound-won').play();
              if (gameState.playerTurn == 'white') {
                chessMessage.innerHTML = chessConfig.whiteWon;
              } else {
                chessMessage.innerHTML = chessConfig.blackWon;
              }

              Element.style.backgroundImage = `url('data:image/svg+xml,${
                pieceImages[
                  gameState.selection.player + '_' + gameState.selection.piece
                ]
              }')`;
              Element.setAttribute('player', gameState.selection.player);
              Element.setAttribute('piece', gameState.selection.piece);
              return;
            }

            if (
              (gameState.selection.piece === 'pawn' &&
                getCell.substring(1, 2) == 8) ||
              (gameState.selection.piece === 'pawn' &&
                getCell.substring(1, 2) == 1)
            ) {
              Element.style.backgroundImage = `url('data:image/svg+xml,${
                pieceImages[gameState.selection.player + '_pawn_pro']
              }')`;
              Element.setAttribute('player', gameState.selection.player);
              Element.setAttribute('piece', 'pawn_pro');
              if (gameState.playerTurn == 'white') {
                gameState.playerTurn = 'black';
                chessMessage.innerHTML = chessConfig.blackTurn;
              } else {
                gameState.playerTurn = 'white';
                chessMessage.innerHTML = chessConfig.whiteTurn;
              }
              if (gameState.aiPlayer) {
                aiMove();
              }
              return;
            }

            $('#sound-click').play();
            Element.style.backgroundImage = `url('data:image/svg+xml,${
              pieceImages[
                gameState.selection.player + '_' + gameState.selection.piece
              ]
            }')`;
            Element.setAttribute('player', gameState.selection.player);
            Element.setAttribute('piece', gameState.selection.piece);

            if (gameState.playerTurn == 'white') {
              gameState.playerTurn = 'black';
              chessMessage.innerHTML = chessConfig.blackTurn;
            } else {
              gameState.playerTurn = 'white';
              chessMessage.innerHTML = chessConfig.whiteTurn;
            }

            if (gameState.aiPlayer) {
              aiMove();
            }

            return;
          }
        }
      });
    });
  },
  addSelection(selections) {
    for (var i = 0; i < selections.length; i++) {
      $(`#${selections[i]}`).classList.add('cell-selected');
    }
  },
  clearSection() {
    $$('.cell-selected').forEach((selectedCell) => {
      selectedCell.classList.remove('cell-selected');
    });
  },
  newGame() {
    location.reload();
  },
  chessPvP() {
    gameState.aiPlayer = false;
  },
  chessAI() {
    gameState.aiPlayer = true;
    if (!gameState.gameOver && gameState.playerTurn === 'black') aiMove();
  },
};
