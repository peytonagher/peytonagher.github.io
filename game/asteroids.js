import {Ship, Bullet, Asteroid} from './classes.js';

let board;
let boardCtx;
let boardWidth = 1200;
let boardHeight = 800;
let keys = [];
let ship;
let bullets = [];
let asteroids = [];
let lives = 2;
let score = 0;

const boardColor = "#000000";
const shipColor = "#04ccde";


document.addEventListener("DOMContentLoaded", function () {

    alert("wasd: move" + "\nspace: shoot" + "\nctrl/cmd + r to restart");
    pTag = document.querySelector("div");
    newVal = document.createElement("p");
    newVal.innerHTML = '';
    pTag.appendChild(newVal);
    board = document.getElementById("gameCanvas");
    boardCtx = board.getContext("2d");
    board.width = boardWidth;
    board.height = boardHeight;
    boardCtx.fillStyle = boardColor;
    boardCtx.fillRect(0, 0, board.width, board.height);
    ship = new Ship();

    for (let i = 0; i < 8; i++) {

        asteroids.push(new Asteroid());
    
    }

    document.body.addEventListener("keydown", handleKeyDown);
    document.body.addEventListener("keyup", handleKeyUp);

    Render();

});



function handleKeyDown(e) {

    keys[e.keyCode] = true;

}



function handleKeyUp(e) {

    keys[e.keyCode] = false;

    if (e.keyCode === 32) {
        bullets.push(new Bullet(ship.angle));
    }

}



function CircleCollision(p1x, p1y, p2x, p2y, r1, r2) {

    let radiusSum, xDiff, yDiff;

    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;

    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
        return true;
    }
    else {
        return false;
    }

}



function DrawLifeShips() {

    let startX = 1350;
    let startY = 10;
    let points = [[9, 9],[-9, 9]];
    ctx.strokeStyle = shipColor;

    for (let i = 0; i < lives; i++) {

        ctx.beginPath();
        ctx.moveTo(startX, startY);

        for (let j = 0; j < points.length; j++) {

            ctx.lineTo(startX + points[j][0], startY + points[j][1]);
        
        }

        ctx.closePath();
        ctx.stroke();
        startX -= 30;
    }

}



function Render() {

    ship.movingForward = (keys[87]);

    if (keys[68]) {
        ship.Rotate(1);
    }
    if (keys[65]) {
        ship.Rotate(-1);
    }

    ctx.clearRect(0, 0, boardWidth, boardHeight);

    if (lives <= 0) {

        document.body.removeEventListener("keydown", HandleKeyDown);
        document.body.removeEventListener("keyup", HandleKeyUp);

        ship.visible = false;
        ctx.fillStyle = '#ff0000';
        ctx.font = '40px Consolas';
        ctx.fillText("GAME OVER", boardWidth / 2 - 150, boardHeight / 2);
    
    }

    if (asteroids.length === 0) {

        ship.x = boardWidth / 2;
        ship.y = boardHeight / 2;
        ship.vx = 0;
        ship.vy = 0;

        for (let i = 0; i < 8; i++) {

            let asteroid = new Asteroid();
            asteroid.speed += 0.5;
            asteroids.push(asteroid);
        
        }

    }

    DrawLifeShips();

    if (asteroids.length !== 0) {

        for (let k = 0; k < asteroids.length; k++) {

            if (CircleCollision(ship.x, ship.y, asteroids[k].x, asteroids[k].y, 11, asteroids[k].collisionRadius)) {
                
                ship.x = boardWidth / 2;
                ship.y = boardHeight / 2;
                ship.vx = 0;
                ship.vy = 0;
                lives -= 1;

            }

        }

    }

    if (asteroids.length !== 0 && bullets.length != 0) {

        for (let l = 0; l < asteroids.length; l++) {

            for (let m = 0; m < bullets.length; m++) {

                if (CircleCollision(bullets[m].x, bullets[m].y, asteroids[l].x, asteroids[l].y, 3, asteroids[l].collisionRadius)) {

                    if (asteroids[l].level === 1) {

                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 25, 2, 22));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 25, 2, 22));
                    
                    }
                    else if(asteroids[l].level === 2){

                        asteroids.push(new Asteroid(asteroids[l].x - 5, asteroids[l].y - 5, 15, 3, 12));
                        asteroids.push(new Asteroid(asteroids[l].x + 5, asteroids[l].y + 5, 15, 3, 12));
                    
                    }

                    asteroids.splice(l,1);
                    bullets.splice(m,1);
                    score += 20;

                    break;

                }

            }

        }

    }

    if (ship.visible) {

        ship.Update();
        ship.Draw();

    }
    if (bullets.length !== 0) {

        for (let i = 0; i < bullets.length; i++) {

            bullets[i].Update();
            bullets[i].Draw();

        }

    }
    if (asteroids.length !== 0) {

        for (let j = 0; j < asteroids.length; j++) {

            asteroids[j].Update();
            asteroids[j].Draw(j);

        }

    }

    requestAnimationFrame(Render);
    
}