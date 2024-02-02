export var pieceScores;
(function (pieceScores) {
    pieceScores[pieceScores["pawn"] = 10] = "pawn";
    pieceScores[pieceScores["knight"] = 30] = "knight";
    pieceScores[pieceScores["bishop"] = 30] = "bishop";
    pieceScores[pieceScores["queen"] = 50] = "queen";
    pieceScores[pieceScores["pawn_pro"] = 50] = "pawn_pro";
    pieceScores[pieceScores["rook"] = 90] = "rook";
    pieceScores[pieceScores["king"] = 900] = "king";
})(pieceScores || (pieceScores = {}));
