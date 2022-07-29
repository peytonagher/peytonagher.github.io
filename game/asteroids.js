document.addEventListener("DOMContentLoaded", 
    function () {
        alert("wasd: move" + "\nspace: shoot" + "\nctrl/cmd + r to restart");
        pTag = document.querySelector("div");
        newVal = document.createElement("p");
        newVal.innerHTML = '';
        pTag.appendChild(newVal);
    }
);

const boardColor = "#000000";
const asteroidColor = "#c5c7c9";
const shipColor = "#04ccde";

let board;
let boardCtx;
let keys = [];
let score = 0;

main();

function main() {       
    if (gameEnd()) {
        alert("try again! score: " + score);
        document.location.reload(true);
        return;
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
}

let ship = new Ship();

function Render() {

}