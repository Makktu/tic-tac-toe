"use strict";

function updateBoard(squareClickedOn) {
    console.log(squareClickedOn);
    gameSquares.forEach(square, (ind) => {
        square.textContent = Gameboard[ind];
    });
}

function clickLocation(clickLoc) {
    let theSquareClicked;
    let xRow;
    let yRow;
    const xCoordinate = clickLoc.offsetX;
    const yCoordinate = clickLoc.offsetY;
    console.log(xCoordinate, yCoordinate);
    if (xCoordinate < 130) {
        xRow = 1;
    } else if (xCoordinate > 155 && xCoordinate < 278) {
        xRow = 2;
    } else if (xCoordinate > 303) {
        xRow = 3;
    } else return;

    if (yCoordinate < 134) {
        yRow = 1;
    } else if (yCoordinate > 153 && yCoordinate < 276) {
        yRow = 2;
    } else if (yCoordinate > 299) {
        yRow = 3;
    } else return;

    // theSquareClicked = xCoordinate;
    console.log(yRow, xRow);
}

const theGrid = document.querySelector(".the__grid");

theGrid.addEventListener("click", (e) => {
    clickLocation(e);
});

const Gameboard = {
    sq1: "X",
    sq2: "O",
    sq3: "O",
    sq4: "X",
    sq5: "O",
    sq6: "X",
    sq7: "O",
    sq8: "O",
    sq9: "O",
};

const gameSquares = document.querySelectorAll(".sq");

console.log(gameSquares);

gameSquares.forEach((square) => {
    console.log(square);
    square.addEventListener("click", (e) => {
        updateBoard(e.target.className);
    });
});

// * set up starting values
