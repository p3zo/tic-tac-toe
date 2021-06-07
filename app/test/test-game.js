import "core-js/stable";
import "regenerator-runtime/runtime";

import { assert } from "chai";

import {
     isBoardLengthInvalid,
     isBoardMakeupInvalid,
     isBoardUneven,
     isBoardWon,
     isBoardFull,
     isXsTurn,
} from "../src/game";

function getEmptyBoard(length) {
     return new Array(length + 1).join(" ");
}

describe("A valid board", () => {
     it("should be 9 characters", done => {
          const shortBoard = getEmptyBoard(3);
          assert.equal(isBoardLengthInvalid(shortBoard), true, "board len < 9");

          const longBoard = getEmptyBoard(10);
          assert.equal(isBoardLengthInvalid(longBoard), true, "board len > 9");

          const board = getEmptyBoard(9);
          assert.equal(isBoardLengthInvalid(board), false, "board len === 9");

          done();
     });

     it("should contain only `x`, `o`, and ` `", done => {
          assert.equal(isBoardMakeupInvalid("t"), true, "board chars invalid");
          assert.equal(isBoardMakeupInvalid("x o"), false, "board chars valid");

          done();
     });

     it("should have a valid proportion of x's to o's", done => {
          assert.equal(isBoardUneven("x        "), false, "board is even 1");
          assert.equal(isBoardUneven("xo       "), false, "board is even 2");
          assert.equal(isBoardUneven("xx       "), true, "board is uneven 2");
          assert.equal(isBoardUneven("xxx      "), true, "board is uneven 3");
          assert.equal(isBoardUneven("xox      "), false, "board is even 3x");
          assert.equal(isBoardUneven("oxo      "), false, "board is even 3o");

          done();
     });

     it("should not have a winner", done => {
          assert.equal(isBoardWon("x xox xoo"), true, "board is won");
          assert.equal(isBoardWon("x xo  xoo"), false, "board is in progress");

          done();
     });

     it("should have an open square", done => {
          assert.equal(isBoardFull("xoxoxoxox"), true, "board is full");
          assert.equal(isBoardFull("xoxoxoxo "), false, "board has space");

          done();
     });

     it("should be o's turn", done => {
          assert.equal(isXsTurn("o        "), true, "it's x's turn");
          assert.equal(isXsTurn("x        "), false, "it's o's turn");

          done();
     });
});
