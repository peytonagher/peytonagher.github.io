var pattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 
                'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

var current = 0;

var keyHandler = function (event) {
    console.log(event.key);

    if (pattern.indexOf(event.key) < 0 || event.key !== pattern[current]) {
        current = 0;
        return;
    }

    current++;

    if (pattern.length === current) {
        window.alert("something cool coming soon");
        document.getElementById("snakeGame").src = "game/pong.js";
    }
}

document.addEventListener('keydown', keyHandler, false);