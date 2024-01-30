export interface Pieces {
  [cell: string]: PieceType;
}

export type PieceType =
  | 'pawn'
  | 'pawn_pro'
  | 'rook'
  | 'knight'
  | 'bishop'
  | 'queen'
  | 'king';
