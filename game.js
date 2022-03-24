// --------------- AUDIO----------------------
const audio = document.querySelector('audio');
const volumeValue = localStorage.getItem('volume');

function audioPlay() {
  if (localStorage.getItem('audio')) {
    audio.play();
    audio.volume = volumeValue / 100;
  }
}
audioPlay();

// --------------- GAME----------------------
const upBtn = document.querySelector('#up');
const downBtn = document.querySelector('#down');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');

const gameBoard = document.querySelector('#gameBoard');

const imageFood = document.querySelector('#imgFood');
const imageSnakeHead = document.querySelector('#snakeHead');
const imageSnakePart = document.querySelector('#snakePart');

let secondColor = '#3bc14a';
let thridColor = '#ffb400';

let imgSuffix = '';

const wallsActivated = localStorage.getItem('wallSetting') === 'activated';

// Modify speed and score calculation
const speedModificator = localStorage.getItem('speedSetting');
let speed = 200 - speedModificator * 10;
let timeBonusScore = speedModificator * 50;
if (!wallsActivated) {
  timeBonusScore = speedModificator * 20;
}

// Define the initial snake
const snake = [
  { x: 50, y: 80 },
  { x: 40, y: 80 },
  { x: 30, y: 80 },
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
  gameBoardCtx.fillStyle = secondColor;

  // Display Walls if are on
  if (wallsActivated) {
    gameBoardCtx.strokeStyle = thridColor;
    gameBoardCtx.lineWidth = 3;
  }

  // Draw a "filled" rectangle to cover the entire canvas
  gameBoardCtx.fillRect(0, 0, gameBoard.width, gameBoard.height);
  // Draw a "border" around the entire canvas
  gameBoardCtx.strokeRect(0, 0, gameBoard.width, gameBoard.height);
}

function drawFood() {
  gameBoardCtx.drawImage(imageFood, foodX, foodY, 10, 8);
}

// Draw one snake part
function drawSnakePart(snakePart) {
  imageSnakePart.src = `./assets/snakepart${imgSuffix}.png`;
  gameBoardCtx.drawImage(imageSnakePart, snakePart.x, snakePart.y, 10, 10);
}

// Draw snake head and rotate it with the direction
function drawSnakeHead(snakePart) {
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingLeft = dx === -10;
  const goingRight = dx === 10;

  if (goingUp) {
    imageSnakeHead.src = `./assets/snakeHeadUp${imgSuffix}.png`;
    gameBoardCtx.drawImage(
      imageSnakeHead,
      snakePart.x - 5,
      snakePart.y - 5,
      20,
      15
    );
  }
  if (goingDown) {
    imageSnakeHead.src = `./assets/snakeHeadDown${imgSuffix}.png`;
    gameBoardCtx.drawImage(
      imageSnakeHead,
      snakePart.x - 5,
      snakePart.y,
      20,
      15
    );
  }
  if (goingLeft) {
    imageSnakeHead.src = `./assets/snakeHeadLeft${imgSuffix}.png`;
    gameBoardCtx.drawImage(
      imageSnakeHead,
      snakePart.x - 10,
      snakePart.y - 3,
      20,
      15
    );
  }
  if (goingRight) {
    imageSnakeHead.src = `./assets/snakeHeadRight${imgSuffix}.png`;
    gameBoardCtx.drawImage(
      imageSnakeHead,
      snakePart.x,
      snakePart.y - 3,
      20,
      15
    );
  }
}

// Draw the snake on the canvas
function drawSnake() {
  drawSnakeHead(snake[0]);
  const snakeBody = snake.slice(1);
  snakeBody.forEach(drawSnakePart);
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

// controle for keyboard and gamepad
function changeDir(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  // Prevent the snake from reversing
  if (changingDir) return;
  changingDir = true;
  const dir = event.keyCode || event.target.value;
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
    speed /= 1.05; // Speed increase with the quantity of eaten food
    timeBonusScore = speedModificator * 50;
    if (!wallsActivated) {
      timeBonusScore = speedModificator * 20;
    }
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}

// Night Mode
const imgGamePad = document.querySelector('.gamepadBtn');
const iconPlay = document.getElementById('iconPlay');
function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
    imgSuffix = '_NM';
    imgGamePad.style.backgroundImage = `url('./assets/GamePad${imgSuffix}.png')`;
    secondColor = '#57acdc';
    thridColor = '#e91e63';
    iconPlay.setAttribute('src', './assets/play-circle-outlined-night.png');
  } else {
    imgGamePad.style.backgroundImage = `url('./assets/GamePad${imgSuffix}.png')`;
    iconPlay.setAttribute('src', './assets/play-circle-outlined-orange.png');
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
theme();
const countDownDisplay = document.querySelector('#countDown');
let timeleft = 3;
const startGame = setInterval(() => {
  if (timeleft < 0) {
    clearInterval(startGame);
    countDownDisplay.style.display = 'none';
    genFood();
    drawSnake();
    main();
  } else {
    countDownDisplay.innerHTML = timeleft;
    timeleft--;
  }
}, 1000);

// Event listeners
document.addEventListener('keydown', changeDir);
upBtn.addEventListener('click', changeDir);
downBtn.addEventListener('click', changeDir);
leftBtn.addEventListener('click', changeDir);
rightBtn.addEventListener('click', changeDir);
