document.addEventListener("DOMContentLoaded", 
    function () {
        alert("use wasd to move" + "\nctrl/cmd + r to restart");
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
    }
);

const boardBorder = "#2a2a2a";
const boardBackground = "#2a2a2a";
const snakeColor = "#800080";
const snakeBorder = "#800080";

let snake = [{x: 200, y: 200}, 
            {x: 190, y: 200}, 
            {x: 180, y: 200}, 
            {x: 170, y: 200}, 
            {x: 160, y: 200}];

let dx = 10;    // horizontal velocity
let dy = 0;     // vertical velocity
let food_x;
let food_y;
let changingDirection = false;
var board = document.getElementById("gameCanvas");
var boardDimensions = gameCanvas.getContext("2d");

main();
foodTime();

document.addEventListener("keydown", changeDirection) // add false as 3rd arg here?

function main() {       
    if (gameEnd()) {
        main();
        return;
    }
    changingDirection = false;
    setTimeout(function onTick() { 
        clearGameCanvas();
        makeBeesechurgers();
        moveSnake();
        drawBigSnake();
        main();
    }, 175)
}

function clearGameCanvas() {
    boardDimensions.fillStyle = boardBackground;
    boardDimensions.strokestyle = boardBorder;
    boardDimensions.fillRect(0, 0, board.width, board.height);
    boardDimensions.strokeRect(0, 0, board.width, board.height);
}

function makeBeesechurgers() {
    boardDimensions.fillStyle = "#00FFFF";
    boardDimensions.strokestyle = "#00FFFF";
    boardDimensions.fillRect(food_x, food_y, 10, 10);
    boardDimensions.strokeRect(food_x, food_y, 10, 10);
}

function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const gotNomNoms = snake[0].x === food_x && snake[0].y === food_y;
    if (gotNomNoms) {
        foodTime();
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
        }});
}

function changeDirection(event) {
    const UP_KEY = 87;      // W key
    const LEFT_KEY = 65;    // A key
    const DOWN_KEY = 83;    // S key
    const RIGHT_KEY = 68;   // D key
    
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;  
    const goingLeft = dx === -10;
    
    if (keyPressed === LEFT_KEY && !goingRight) {    
        dx = -10;
        dy = 0;  
    }

    if (keyPressed === UP_KEY && !goingDown) {    
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {    
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {    
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