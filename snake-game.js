// Snake Game Logic

// Initial parameters
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20;

let snake = [{x: 10 * box, y: 10 * box}];
let direction;
let food = {x: Math.floor(Math.random() * 20 + 1) * box, y: Math.floor(Math.random() * 20 + 1) * box};

// Function to create food
function placeFood() {
    food = {x: Math.floor(Math.random() * 20 + 1) * box,
             y: Math.floor(Math.random() * 20 + 1) * box};
}

// Movement control
document.addEventListener('keydown', directionControl);
function directionControl(event) {
    if (event.keyCode == 37 && direction != 'RIGHT') { // Left
        direction = 'LEFT';
    } else if (event.keyCode == 38 && direction != 'DOWN') { // Up
        direction = 'UP';
    } else if (event.keyCode == 39 && direction != 'LEFT') { // Right
        direction = 'RIGHT';
    } else if (event.keyCode == 40 && direction != 'UP') { // Down
        direction = 'DOWN';
    }
}

// Function to update snake position
function updateSnake() {
    let head = {x: snake[0].x, y: snake[0].y};

    // Move snake in the current direction
    if(direction == 'LEFT') head.x -= box;
    if(direction == 'UP') head.y -= box;
    if(direction == 'RIGHT') head.x += box;
    if(direction == 'DOWN') head.y += box;

    // Check for collision with food
    if(head.x == food.x && head.y == food.y) {
        placeFood();
    } else {
        snake.pop(); // Remove last part of snake
    }

    // Check for collision with walls or itself
    if(head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head, snake)) {
        clearInterval(game);
    }

    // Add new head
    snake.unshift(head);
}

// Function to check for collision with itself
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
}

// Game loop
let game = setInterval(function() {
    updateSnake();
    draw();
}, 100);