import { Pawn } from './pawn.js';
import { Pawn_Pro } from './pawn_pro.js';
import { Bishop } from './bishop.js';
import { Rook } from './rook.js';
import { Knight } from './knight.js';
import { King } from './king.js';
import { Queen } from './queen.js';
export const determine = (BoardState, originPiece, originPlayer, originRow, originColumn) => {
    const pieceMoves = {
        pawn: Pawn,
        pawn_pro: Pawn_Pro,
        bishop: Bishop,
        rook: Rook,
        knight: Knight,
        king: King,
        queen: Queen,
    };
    try {
        const functionToCall = pieceMoves[originPiece];
        if (typeof functionToCall === 'function') {
            return functionToCall(BoardState, originPlayer, originRow, originColumn);
        }
        else {
            console.error(`Function ${originPiece} is not found or is not a function.`);
            return false;
        }
    }
    catch (error) {
        console.error(`Error calling function ${originPiece}:`, error);
        return false;
    }
};
