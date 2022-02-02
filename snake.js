// https://www.educative.io/blog/javascript-snake-game-tutorial

const board = document.getElementById("gameCanvas");
const boardDimensions = gameCanvas.getContext("2d");

let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}, 
    {x: 170, y: 200}, {x: 160, y: 200}];

document.addEventListener("keydown", changeDirection)

function drawSnake(snake) {
    boardDimensions.fillStyle = 'lightblue';
    boardDimensions.strokestyle = "darkblue";
    boardDimensions.fillRect(snake.x, snake.y, 10, 10);
    boardDimensions.strokeRect(snake.x, snake.y, 10, 10);
}


function draw() {
    snake.forEach(drawSnake);
}


function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
    setTimeout(function onTick() {  clearCanvas();  moveSnake();  drawSnake();}, 100);
    setTimeout(function onTick() {  clearCanvas();  moveSnake();  drawSnake();}, 100);
    drawSnake();
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
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (has_collided) 
      return true
  }
  const hitLeftWall = snake[0].x < 0;  
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitToptWall = snake[0].y &lt; 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;
 
  
  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}


function main() {
    setTimeout(function onTick() { 
        clearBoard();
        moveSnake();
        draw();
        main();
    }, 100)
}