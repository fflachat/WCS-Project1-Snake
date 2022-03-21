// GAME

const upBtn = document.querySelector('#up');
const downBtn = document.querySelector('#down');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

const gameBoard = document.querySelector('#gameBoard');

const bgColor = '#4da167';
const secondColor = '#3bc14a';
const thridColor = '#ffb400';
const fourthColor = '#c43408';

let wallsActivated = false;

let speed = 200;
let timeBonusScore = 100;

// give some colors to the snake and the game board
const boardBorder = 'black';
const boardBg = secondColor;
const snakeCol = thridColor;
const snakeBorder = 'black';

// Define the initial snake
const snake = [
  { x: 20, y: 20 },
  { x: 19, y: 20 },
  { x: 18, y: 20 },
];

// set the score
let score = 0;
// True if changing direction
let changingDir = false;
// Horizontal velocity
let foodX;
let foodY;
let dx = 10;
// Vertical velocity
let dy = 0;

// Return a two dimensional drawing context
const gameBoardCtx = gameBoard.getContext('2d');

// draw a border around the canvas
function clearBoard() {
  //  Select the colour to fill the drawing
  gameBoardCtx.fillStyle = boardBg;
  // Draw a "filled" rectangle to cover the entire canvas
  gameBoardCtx.fillRect(0, 0, gameBoard.width, gameBoard.height);
  // Draw a "border" around the entire canvas
  gameBoardCtx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

// draw the food on the canvas
function drawFoodCircle() {
  gameBoardCtx.beginPath();
  gameBoardCtx.fillStyle = fourthColor;
  gameBoardCtx.arc(foodY, foodX, 5, 0, 2 * Math.PI);
  gameBoardCtx.fill();
}

function drawFood() {
  gameBoardCtx.fillStyle = 'lightgreen';
  gameBoardCtx.strokestyle = 'darkgreen';
  gameBoardCtx.fillRect(foodX, foodY, 10, 10);
  gameBoardCtx.strokeRect(foodX, foodY, 10, 10);
}

// Draw one snake part
function drawSnakePart(snakePart) {
  // Set the colour of the snake part
  gameBoardCtx.fillStyle = snakeCol;
  // Set the border colour of the snake part
  gameBoardCtx.strokestyle = snakeBorder;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  gameBoardCtx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  gameBoardCtx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart);
}

// verify the status of the game
function hasGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }
  // End game if snake hit walls if the option is activated
  if (wallsActivated) {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }
  return false;
}

// randomize the food position
function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

// generate food
function genFood() {
  // Generate a random number the food x-coordinate
  foodX = randomFood(0, gameBoard.width - 10);
  // Generate a random number for the food y-coordinate
  foodY = randomFood(0, gameBoard.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach((part) => {
    const hasEaten = part.x === foodX && part.y === foodY;
    if (hasEaten) {
      genFood();
    }
  });
}

// controle for the desktop version with keyboard
function changeDir(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  // Prevent the snake from reversing
  if (changingDir) return;
  changingDir = true;
  const dir = event.keyCode || event.target.value;
  console.log(dir);
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if ((dir === LEFT_KEY || dir === 'LEFT') && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if ((dir === UP_KEY || dir === 'UP') && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if ((dir === RIGHT_KEY || dir === 'RIGHT') && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if ((dir === DOWN_KEY || dir === 'DOWN') && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

// Function for mobile version with gamepad control

// move the snake
function moveSnake() {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);

  // Replace snake position at the opposite if walls are desactivated
  if (!wallsActivated) {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 10;

    if (hitLeftWall) {
      snake[0].x = gameBoard.width - 10;
    }
    if (hitRightWall) {
      snake[0].x = 0;
    }
    if (hitToptWall) {
      snake[0].y = gameBoard.height - 10;
    }
    if (hitBottomWall) {
      snake[0].y = 0;
    }
  }

  const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFood) {
    // Increase score
    if (timeBonusScore < 0) timeBonusScore = 0;
    score += 10 + timeBonusScore;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    genFood();
    speed -= 5; // Speed increase with the quantity of eaten food
    timeBonusScore = 100;
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

// display a start countdown
const countDownDisplay = document.querySelectorAll('#countDown');
let timeLeft = 10;
function countdown() {
  timeLeft--;
  countDownDisplay.innerText = timeLeft;
  if (timeLeft > 0) {
    setTimeout(countdown, 1000);
  }
}

// main function called repeatedly to keep the game running
function main() {
  if (hasGameEnded()) {
    window.location.href = './game_over.html';
    window.localStorage.setItem('Score', score);
  }
  changingDir = false;
  setTimeout(() => {
    timeBonusScore -= 1;
    clearBoard();
    moveSnake();
    drawSnake();
    drawFood();
    // Repeat
    main();
  }, speed); // En modifiant speed on joue sur la vitesse du serpent
}

// Start game
setTimeout(countdown, 1000);
main();
genFood();
drawSnake();

// Event listeners
document.addEventListener('keydown', changeDir);
upBtn.addEventListener('click', changeDir);
downBtn.addEventListener('click', changeDir);
leftBtn.addEventListener('click', changeDir);
rightBtn.addEventListener('click', changeDir);
