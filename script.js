"use strict";

function newGame() {
    whoseTurnItIs = "X";
    Gameboard = {
        sq1: "",
        sq2: "",
        sq3: "",
        sq4: "",
        sq5: "",
        sq6: "",
        sq7: "",
        sq8: "",
        sq9: "",
    };
    refreshBoard();
}

function checkForWin() {
    // winning patterns are:
    // 123, 456, 789, 147, 258, 369, 159, 357
    winningConditions.forEach((winCon) => {
        for (let k = 1; k < 4; k++) {
            let win1 = parseInt(winCon.toString()[0]);
            let win2 = parseInt(winCon.toString()[1]);
            let win3 = parseInt(winCon.toString()[2]);
            // check for the SAME CHARACTER present in all
            if (Gameboard[`sq${win1}`] === "") break;
            if (
                Gameboard[`sq${win1}`] === Gameboard[`sq${win2}`] &&
                Gameboard[`sq${win2}`] === Gameboard[`sq${win3}`]
            ) {
                let winner = Gameboard[`sq${win1}`];
                console.log(winner, "WINS!");
                newGame();
            }
        }
    });
}

function refreshBoard() {
    gameSquares.forEach((square, ind) => {
        square.textContent = Gameboard[`sq${ind + 1}`];
    });
}

function updateBoard(squareClickedOn) {
    squareClickedOn = squareClickedOn.substring(3);
    if (Gameboard[`${squareClickedOn}`] === "") {
        Gameboard[`${squareClickedOn}`] = whoseTurnItIs;
        whoseTurnItIs === "X" ? (whoseTurnItIs = "O") : (whoseTurnItIs = "X");
        refreshBoard();
        if (soundOn) playingSound.play();
        checkForWin();
    } else {
        // put no-move sound in here
        return;
    }
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

let Gameboard = {
    sq1: "",
    sq2: "",
    sq3: "",
    sq4: "",
    sq5: "",
    sq6: "",
    sq7: "",
    sq8: "",
    sq9: "",
};

const gameSquares = document.querySelectorAll(".sq");

gameSquares.forEach((square) => {
    console.log(square);
    square.addEventListener("click", (e) => {
        updateBoard(e.target.className);
    });
});

let whoseTurnItIs = "X";
let soundOn = true;

const playingSound = document.querySelector(".click");

const soundButton = document.querySelector(".sound_control");

soundButton.addEventListener("click", () => {
    soundOn === true ? (soundOn = false) : (soundOn = true);
});

const newGameBtn = document.querySelector(".new_game_btn");

newGameBtn.addEventListener("click", newGame);

const winningConditions = [123, 456, 789, 147, 258, 369, 159, 357];

refreshBoard();
