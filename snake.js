// snake game in js

document.addEventListener("DOMContentLoaded", 
    function () {
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
    }
);


const boardBorder = "purple";
const boardBackground = "black";
const snakeColor = "darkblue";
const snakeBorder = "lightblue";

var board = document.getElementById("gameCanvas");
var boardDimensions = gameCanvas.getContext("2d");

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

main();
foodTime();
// add false as 3rd arg here?
document.addEventListener("keydown", changeDirection) 

function clearGameCanvas() {
    boardDimensions.fillStyle = boardBackground;
    boardDimensions.strokestyle = boardBorder;
    boardDimensions.fillRect(0, 0, board.width, board.height);
    boardDimensions.strokeRect(0, 0, board.width, board.height);
}


function drawLittleSnake(snake) {
    boardDimensions.fillStyle = 'lightblue';
    boardDimensions.strokestyle = "darkblue";
    boardDimensions.fillRect(snake.x, snake.y, 10, 10);
    boardDimensions.strokeRect(snake.x, snake.y, 10, 10);
}


function drawBigSnake() {
    snake.forEach(drawLittleSnake);
}


function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    const gotNomNoms = snake[0].x === food_x && snake[0].y === food_y;
    if (gotNomNoms) {
        score += 10;
        foodTime();
    }
    else {
        snake.pop();
    }
}


function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    
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
    const hitRightWall = snake[0].x > snakeboard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > snakeboard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}


function beesechurgers(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}


function makeBeesechurgers() {
    boardDimensions.fillStyle = "red";
    boardDimensions.strokestyle = "beige";
    boardDimensions.fillRect(food_x, food_y, 10, 10);
    boardDimensions.strokeRect(food_x, food_y, 10, 10);
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


function main() {
    if (gameEnd()) return;
    changingDirection = false;
    setTimeout(function onTick() { 
        clearGameCanvas();
        makeBeesechurgers();
        moveSnake();
        drawBigSnake();
        main();
    }, 100)
}