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

        // slow ship when no input
        this.vx *= 0.99;
        this.vy *= 0.99;

        // chanve val w/ air friction
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

    constructor(x, y, radius, level, collisionRadius) {
        this.visible = true;
        this.x = x || Math.floor(Math.random() * boardWidth);
        this.y = y || Math.floor(Math.random() * boardHeight);
        this.speed = 3;
        this.radius = radius || 50;
        this.angle = Math.floor(Math.random() * 359);
        this.strokeColor = "#c5c7c9";
        this.collisionRadius = collisionRadius || 46;
    }

    Update() {
        var radians = this.angle / Math.PI * 180;
        this.x += Math.cos(radians) * this.speed;
        this.y += Math.sin(radians) * this.speed;

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
    }

    Draw() {
        ctx.beginPath();
        var vertAng = ((Math.PI * 2) / 6);
        var radians = this.angle / Math.PI * 180;

        for (let i = 0; i < 6; i++) {

            ctx.lineTo(this.x - this.radius * Math.cos(vertAng * i + radians), this.y - this.radius * Math.sin(vertAng * i + radians));
        
        }

        ctx.closePath();
        ctx.stroke();
    }
}

export {Ship, Bullet, Asteroid};