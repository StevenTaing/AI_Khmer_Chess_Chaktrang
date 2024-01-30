export var pieceScores;
(function (pieceScores) {
    pieceScores[pieceScores["pawn"] = 10] = "pawn";
    pieceScores[pieceScores["knight"] = 30] = "knight";
    pieceScores[pieceScores["bishop"] = 30] = "bishop";
    pieceScores[pieceScores["rook"] = 50] = "rook";
    pieceScores[pieceScores["queen"] = 90] = "queen";
    pieceScores[pieceScores["pawn_pro"] = 90] = "pawn_pro";
    pieceScores[pieceScores["king"] = 900] = "king";
})(pieceScores || (pieceScores = {}));
