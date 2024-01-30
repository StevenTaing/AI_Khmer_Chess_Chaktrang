import { chessConfig } from '../configurations/chessConfig.js';
import { chessBoard } from '../configurations/chessBoard.js';
export const gameRender = {
    render() {
        chessBoard(chessConfig.boardSelector);
    },
};
