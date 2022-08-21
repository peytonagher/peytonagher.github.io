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
const asteroidColor = "#c5c7c9";
const shipColor = "#04ccde";


document.addEventListener("DOMContentLoaded", 
    function () {
        alert("wasd: move" + "\nspace: shoot" + "\nctrl/cmd + r to restart");
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
        board = document.getElementById("canvas");
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
    }
);

function handleKeyDown(e) {
    keys[e.keyCode] = true;
}

function handleKeyUp(e) {
    keys[e.keyCode] = false;
    if (e.keyCode === 32) {
        bullets.push(new Bullet(ship.angle));
    }
}


function GameCanvas() {

    board = document.getElementById("gameCanvas");
    boardCtx = board.getContext("2d");
    board.width = 700;
    board.height = 700;
    boardCtx.fillstyle = boardColor;
    boardCtx.fillRect(0, 0, board.width, board.height);
    document.body.addEventListener("keydown", function(e) {
        keys[e.key] = true;
    });
    
}


class Ship {
    constructor() {
        this.visible = true;
        this.invisible = false;
        this.x = board.width / 2;
        this.y = board.height / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.vx = 0;
        this.vy = 0;
        this.rotation = 0.001;
        this.radius = 14;
        this.angle = 0;
        this.strokeColor = shipColor;
        this.noseX = boardWidth / 2 + 15;
        this.noseY = boardHeight / 2;
    }

    Rotate(dir) {
        this.angle += this.rotation * dir;
    }

    Update() {
        let radians = this.angle / Math.PI * 180;
        // oldX + cos(rad) * distance
        // oldY + sin(rad) * distance
        if (this.movingForward) {
            this.vx += Math.cos(radians) * this.speed;
            this.vy += Math.sin(radians) * this.speed;
        }
        if(this.x < this.radius) {
            this.x = board.width;
        }
        if(this.x > board.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = board.height;
        }
        if(this.y > board.height) {
            this.y = this.radius;
        }
        this.vx *= 0.99;
        this.vy *= 0.99;

        // air friction
        this.x -= this.vx;
        this.y -= this.vy;
    }

    Draw() {
        boardCtx.strokeStyle = this.strokeColor;
        boardCtx.beginPath();

        let vAngle = ((Math.PI * 2) / 3);
        let radian = this.angle / Math.PI * 180;

        this.noseX = this.x - this.rotation * Math.cos(radian);
        this.noseY = this.y - this.rotation * Math.sin(radian);

        for (let i = 0; i < 3; i++) {
            boardCtx.lineTo(this.x - this.radius * Math.cos(vAngle * i + radians), this.y - this.radius * Math.sin(vAngle * i + radian));
        }

        boardCtx.closePath();
        boardCtx.stroke();
        
    }
}

class Bullet {
    constructor(angle) {
        this.visible = true;
        this.x = ship.noseX;
        this.y = ship.noseY;
        this.angle = angle;
        this.height = 4;
        this.width = 4;
        this.speed = 5;
        this.vx = 0;
        this.vy = 0;
    }

    Update() {
        let radian = this.angle / Math.PI * 180;
        this.x -= Math.cos(radian) * this.speed;
        this.y -= Math.sin(radian) * this.speed;
    }

    Draw() {
        boardCtx.fillStyl = shipColor;
        boardCtx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Asteroid {
    
}

function CircleCollision() {

}

function DrawLifeShips() {

}

function Render() {

}