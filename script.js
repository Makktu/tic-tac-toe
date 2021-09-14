"use strict";

const theGame = (() => {
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
        messageArea.textContent = "";
        turnTaken = 1;
        messageArea.classList.remove("notify-flash");

        gameSquares.forEach((square) => {
            if (square.classList.contains("winning-line")) {
                square.classList.remove("winning-line");
            }
        });

        refreshBoard();
    }

    function checkForWin() {
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
                    // highlight winning squares here!
                    gameSquares.forEach((square) => {
                        // stuff
                        if (square.classList.contains(`sq${win1}`))
                            square.classList.add("winning-line");
                        if (square.classList.contains(`sq${win2}`))
                            square.classList.add("winning-line");
                        if (square.classList.contains(`sq${win3}`))
                            square.classList.add("winning-line");
                    });
                    // here !

                    let winner = Gameboard[`sq${win1}`];
                    messageArea.textContent = `${winner} WINS !`;
                    messageArea.classList.add("notify-flash");
                    if (soundOn) gameWonSound.play();
                    whoseTurnItIs = ""; // prevents further turns (and new move sounds) until NEW GAME clicked
                }

                if (turnTaken === 10) {
                    messageArea.textContent = "A DRAW...";
                }
            }
        });
        if (soundOn && whoseTurnItIs) playingSound.play();
    }

    function refreshBoard() {
        gameSquares.forEach((square, ind) => {
            square.textContent = Gameboard[`sq${ind + 1}`];
        });
    }

    function updateBoard(squareClickedOn) {
        squareClickedOn = squareClickedOn.substring(3);

        if (!whoseTurnItIs || Gameboard[`${squareClickedOn}`] !== "") {
            if (soundOn) noMoveSound.play();
            return;
        } // only allows a turn to be taken if the game is not won (the checkForWin function sets variable to "" if winning condition is met)

        if (Gameboard[`${squareClickedOn}`] === "") {
            Gameboard[`${squareClickedOn}`] = whoseTurnItIs;
            whoseTurnItIs === "X"
                ? (whoseTurnItIs = "O")
                : (whoseTurnItIs = "X");
            turnTaken++;
            refreshBoard();
            checkForWin();
        }
    }

    function clickLocation(clickLoc) {
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

    const noMoveSound = document.querySelector(".no-move");

    const gameWonSound = document.querySelector(".game-won");

    const soundButton = document.querySelector(".sound_control");

    soundButton.addEventListener("click", () => {
        if (soundOn === true) {
            soundOn = false;
            soundToggle.textContent = "on/*OFF";
        } else {
            soundOn = true;
            soundToggle.textContent = "*ON/off";
        }
    });

    const newGameBtn = document.querySelector(".new_game_btn");

    newGameBtn.addEventListener("click", newGame);

    const soundToggle = document.getElementById("#sound-toggle");

    const messageArea = document.querySelector(".updates");

    let turnTaken = 1;

    const winningConditions = [123, 456, 789, 147, 258, 369, 159, 357];

    refreshBoard();
})();

// new MainLoop();
