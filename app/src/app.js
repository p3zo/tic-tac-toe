/* Defines routes & top-level API logic */

import express from "express";

import { makeMove, validateBoard } from "./game";

const app = express();

app.get("/", async (request, response) => {
    const board = request.query.board;

    if (!board) {
        response.status(400).send({
            error: "Expected query parameter `board`",
        });
    } else {
        console.log("Received board:", board.replaceAll(" ", "+")); // eslint-disable-line no-console

        const invalidBoardMsg = validateBoard(board);

        if (invalidBoardMsg) {
            response.status(400).send({ error: invalidBoardMsg });
        } else {
            response.status(200).send({ newBoard: makeMove(board) });
        }
    }
});

export default app;
