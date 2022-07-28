document.addEventListener("DOMContentLoaded", 
    function () {
        alert("wasd: move" + "\nspace: shoot" + "\nctrl/cmd + r to restart");
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
    }
);

const boardBorder = "#000000";
const boardBackground = "#000000";
const asteroidColor = "#c5c7c9";
const shipColor = "#04ccde";

let score = 0;
let changingDirection = false;
var board = document.getElementById("gameCanvas");
var boardDimensions = gameCanvas.getContext("2d");

main();

document.addEventListener("keydown", changeDirection)

function main() {       
    if (gameEnd()) {
        alert("try again! score: " + score);
        document.location.reload(true);
        return;
    }
    changingDirection = false;
    setTimeout(function onTick() { 
        clearGameCanvas();

        main();
    }, 75)
}

function clearGameCanvas() {
    boardDimensions.fillStyle = boardBackground;
    boardDimensions.strokestyle = boardBorder;
    boardDimensions.fillRect(0, 0, board.width, board.height);
    boardDimensions.strokeRect(0, 0, board.width, board.height);
}