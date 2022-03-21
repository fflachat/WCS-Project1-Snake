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

let wallsActivated = true;

// Code à comprendre

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
  console.log('drawSnake');
}

function hasGameEnded() {
  console.log('has Game Ended running');
  console.log(snake.length);
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  if (wallsActivated) {
    const hitLeftWall = snake[0].x < 0;
    const hitRightWall = snake[0].x > gameBoard.width - 10;
    const hitToptWall = snake[0].y < 0;
    const hitBottomWall = snake[0].y > gameBoard.height - 10;
    return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
  }
  return false;
}

function randomFood(min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

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
  console.log('genFood is running');
}

function changeDir(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  // Prevent the snake from reversing
  if (changingDir) return;
  changingDir = true;
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

// Function for mobile version with gamepad control
function changeDirGamePad(event) {
  if (changingDir) return;
  changingDir = true;

  const dir = event.target.value;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (dir === 'LEFT' && !goingRight) {
    dx = 10;
    dy = 0;
  }
  if (dir === 'UP' && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (dir === 'RIGHT' && !goingLeft) {
    dx = -10;
    dy = 0;
  }
  if (dir === 'DOWN' && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function moveSnake() {
  // Create the new Snake's head
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const hasEatenFood = snake[0].x === foodX && snake[0].y === foodY;
  if (hasEatenFood) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    genFood();
  } else {
    // Remove the last part of snake body
    snake.pop();
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
    clearBoard();
    drawFood();
    moveSnake();
    drawSnake();
    // Repeat
    main();
  }, 100);
}

// Start game
main();
genFood();
drawSnake();

document.addEventListener('keydown', changeDir);

upBtn.addEventListener('click', changeDirGamePad);

downBtn.addEventListener('click', changeDirGamePad);

leftBtn.addEventListener('click', changeDirGamePad);

rightBtn.addEventListener('click', changeDirGamePad);
