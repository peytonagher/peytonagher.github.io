document.addEventListener("DOMContentLoaded", 
    function () {
        alert("use wasd keys to move" + "\nctrl/cmd + r to restart" 
        + "\n\nnote: this page is for desktop browser use only");
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
    }
);

const boardBorder = "#2a2a2a";
const boardBackground = "#2a2a2a";
const snakeColor = rainbowMachine();
const snakeBorder = rainbowMachine();
const foodColor = rainbowMachine();

let snake = [{x: 200, y: 200}, 
            {x: 190, y: 200}, 
            {x: 180, y: 200}, 
            {x: 170, y: 200}, 
            {x: 160, y: 200}];

let dx = 10;    // horizontal velocity
let dy = 0;     // vertical velocity
let food_x;
let food_y;
let score = 0;
let changingDirection = false;
var board = document.getElementById("gameCanvas");
var boardDimensions = gameCanvas.getContext("2d");

main();
foodTime();

document.addEventListener("keydown", changeDirection)

function main() {       
    if (gameEnd()) {
        alert("try again, " + "score: " + score);
        document.location.reload(true);
        return;
    }
    changingDirection = false;
    setTimeout(function onTick() { 
        clearGameCanvas();
        makeBeesechurgers();
        moveSnake();
        drawBigSnake();
        main();
    }, 75)
}

function rainbowMachine() {
    let randomHex = Math.random() * 0xFFFFFF;
    randomHex = Math.floor(randomHex);
    randomHex = randomHex.toString(16);
    let color = randomHex.padStart(6,0);
    return '#' + color.toUpperCase();
}

function clearGameCanvas() {
    boardDimensions.fillStyle = boardBackground;
    boardDimensions.strokestyle = boardBorder;
    boardDimensions.fillRect(0, 0, board.width, board.height);
    boardDimensions.strokeRect(0, 0, board.width, board.height);
}

function makeBeesechurgers() {
    boardDimensions.fillStyle = foodColor;
    boardDimensions.strokestyle = foodColor;
    boardDimensions.fillRect(food_x, food_y, 10, 10);
    boardDimensions.strokeRect(food_x, food_y, 10, 10);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const gotNomNoms = snake[0].x === food_x && snake[0].y === food_y;
    if (gotNomNoms) {
        foodTime();
        score += 1; // will go here or in foodTime
    }
    else {
        snake.pop();
    }
}

function drawBigSnake() {
    snake.forEach(drawLittleSnake);
}

function drawLittleSnake(snakeChunk) {
    boardDimensions.fillStyle = snakeColor;
    boardDimensions.strokestyle = snakeBorder;
    boardDimensions.fillRect(snakeChunk.x, snakeChunk.y, 10, 10);
    boardDimensions.strokeRect(snakeChunk.x, snakeChunk.y, 10, 10);
}

function beesechurgers(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function foodTime() {
    food_x = beesechurgers(0, board.width - 10);
    food_y = beesechurgers(0, board.height - 10);
    snake.forEach(function isSnakeHungy(part) {
        const isFull = part.x == food_x && part.y == food_y;
        if (isFull) {
            foodTime();
            score += 1; // will go here or in moveSnake
        }});
}

function changeDirection(event) {
    const W_KEY = 87;
    const A_KEY = 65;
    const S_KEY = 83;
    const D_KEY = 68;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;  
    const goingLeft = dx === -10;

    if (keyPressed === (A_KEY) && !goingRight) {    
        dx = -10;
        dy = 0;  
    }
    if (keyPressed === (W_KEY) && !goingDown) {    
        dx = 0;
        dy = -10;
    }
    if (keyPressed === (D_KEY) && !goingLeft) {    
        dx = 10;
        dy = 0;
    }
    if (keyPressed === (S_KEY) && !goingUp) {    
        dx = 0;
        dy = 10;
    }
}

function gameEnd() {  
    for (let i = 4; i < snake.length; i++) {    
        const collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
        if (collided) {
            return true
        }
    }
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > board.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > board.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


async function sendScore(score) {
    if (!isLoggedIn) return;
    const path = '/~/leaderboard.js';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' }
	const name = playername;
	const body = JSON.stringify({ name, score });
	await fetch(path, { method, headers, body });
}