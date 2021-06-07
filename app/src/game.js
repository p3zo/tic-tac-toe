/* Defines game logic */

const WINNING_SEQUENCES = [
    // horizontals
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // verticals
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
];

/* Returns true if the board length is invalid */
function isBoardLengthInvalid(board) {
    return board.length !== 9;
}

/* Returns true if the board contains invalid chars */
function isBoardMakeupInvalid(board) {
    let validChars = ["x", "o", " "];

    let boardCopy = board.slice();

    validChars.forEach(c => {
        boardCopy = boardCopy.replaceAll(c, "");
    });

    return boardCopy.length > 0;
}

/* Returns true if the board has no empty spaces */
function isBoardFull(board) {
    const numSpaces = board.split(" ").length - 1;

    return numSpaces < 1;
}

/* Returns true if the board is in a winning state */
function isBoardWon(board) {
    let xCurrent = [];
    let oCurrent = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "x") {
            xCurrent.push(i);
        } else if (board[i] === "o") {
            oCurrent.push(i);
        }
    }

    for (let i = 0; i < WINNING_SEQUENCES.length; i++) {
        const seq = WINNING_SEQUENCES[i];

        let xConsecutive = 0;
        let oConsecutive = 0;

        for (let j = 0; j < xCurrent.length; j++) {
            if (seq.includes(xCurrent[j])) {
                xConsecutive++;
            }
        }

        for (let k = 0; k < oCurrent.length; k++) {
            if (seq.includes(oCurrent[k])) {
                oConsecutive++;
            }
        }

        if (xConsecutive === 3 || oConsecutive === 3) {
            return true;
        }
    }

    return false;
}

/* Returns true if the board has an invalid proportion of x's to o's */
function isBoardUneven(board) {
    const numXs = board.split("x").length - 1;
    const numOs = board.split("o").length - 1;

    const diff = Math.abs(numXs - numOs);

    if (diff > 1 || diff < 0) {
        return true;
    }

    return false;
}

/* Returns true if it's necessarily x's turn */
function isXsTurn(board) {
    const numXs = board.split("x").length - 1;
    const numOs = board.split("o").length - 1;

    const diff = numXs - numOs;

    if (diff === -1) {
        return true;
    }

    return false;
}

/* Returns an error message if the board is invalid */
function validateBoard(board) {
    if (isBoardLengthInvalid(board)) {
        return "Board must be 9 characters";
    }

    if (isBoardMakeupInvalid(board)) {
        return "Board must contain only `x`, `o`, and ` `";
    }

    if (isBoardUneven(board)) {
        return "Board has an invalid proportion of x's to o's";
    }

    if (isBoardWon(board)) {
        return "Board is won";
    }

    if (isBoardFull(board)) {
        return "Board is full";
    }

    if (isXsTurn(board)) {
        return "It's X's turn";
    }

    return false;
}

/* Returns the index of a random open square */
function getRandomOpenIndex(board) {
    let openIxs = [];

    for (let i = 0; i < board.length; i++) {
        if (board[i] === " ") {
            openIxs.push(i);
        }
    }

    return openIxs[Math.floor(Math.random() * openIxs.length)];
}

/* Replaces a range of characters in a string */
function replaceCharAtIndex(str, index, char) {
    return str.substr(0, index) + char + str.substr(index + char.length);
}

/* Adds an `o` to a valid board */
function makeMove(board) {
    // TODO: use a better strategy
    const ix = getRandomOpenIndex(board);

    return replaceCharAtIndex(board, ix, "o");
}

export {
    isBoardLengthInvalid,
    isBoardMakeupInvalid,
    isBoardFull,
    isBoardWon,
    isBoardUneven,
    isXsTurn,
    validateBoard,
    makeMove,
};
