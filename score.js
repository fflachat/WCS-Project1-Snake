// Night Mode
function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
  }
}
theme();

const playerTable = JSON.parse(localStorage.getItem('playerTable')) || [];

console.log(playerTable);

function sortPlayer() {
  for (let i = 0; i < playerTable.length; i++) {
    for (let j = 0; j < playerTable.length; j++) {
      const p1 = playerTable[i].score || 0;
      const p2 = playerTable[j].score || 0;
      if (p1 > p2) {
        const playerTampon = playerTable[i];
        playerTable[i] = playerTable[j];
        playerTable[j] = playerTampon;
      }
    }
  }
}

// REMPLACER LES SCORES SUR LE PODIUM ET LE CLASSEMENT
const tablePointElements = [];

const fisrtPoints = document.getElementById('firstPoints');
const secondPoints = document.getElementById('secondPoints');
const thirdPoints = document.getElementById('thirdPoints');
const fourthPoints = document.getElementById('fourthPoints');
const fifthPoints = document.getElementById('fifthPoints');
const sixthPoints = document.getElementById('sixthPoints');
const seventhPoints = document.getElementById('seventhPoints');
const eigthPoints = document.getElementById('eigthPoints');

tablePointElements.push(
  fisrtPoints,
  secondPoints,
  thirdPoints,
  fourthPoints,
  fifthPoints,
  sixthPoints,
  seventhPoints,
  eigthPoints
);

// REMPLACER LES NOMS SUR LE PODIUM ET LE CLASSEMENT
const tableNameElements = [];

const firstPlayerName = document.getElementById('firstPlayerName');
const secondPlayerName = document.getElementById('secondPlayerName');
const thirdPlayerName = document.getElementById('thirdPlayerName');
const fourthPlayerName = document.getElementById('fourthPlayerName');
const fifthPlayerName = document.getElementById('fifthPlayerName');
const sixthPlayerName = document.getElementById('sixthPlayerName');
const seventhPlayerName = document.getElementById('seventhPlayerName');
const eigthPlayerName = document.getElementById('eigthPlayerName');

tableNameElements.push(
  firstPlayerName,
  secondPlayerName,
  thirdPlayerName,
  fourthPlayerName,
  fifthPlayerName,
  sixthPlayerName,
  seventhPlayerName,
  eigthPlayerName
);

function triClassemnt() {
  for (let i = 0; i < playerTable.length; i++) {
    tableNameElements[i].innerText = playerTable[i].name;
    tablePointElements[i].innerText = playerTable[i].score;
  }
}

// DISPLAY LEADERBOARD
sortPlayer();
triClassemnt();
