const clickTest = document.querySelector('h1');

const playerTable = [] || JSON.parse(localStorage.getItem('playerTable'));

function sortPlayer() {
  for (let i = 0; i < playerTable.length; i++) {
    for (let j = 0; j < playerTable.length; j++) {
      if (playerTable[i].score < playerTable[j].score) {
        const playerTampon = playerTable[i];
        playerTable[i] = playerTable[j];
        playerTable[j] = playerTampon;
      }
    }
  }
}

// REMPLACER LES SCORES SUR LE PODIUM ET LE CLASSEMENT
const firstPoints = document.getElementById('firstPoints');
const secondPoints = document.getElementById('secondPoints');
const thirdPoints = document.getElementById('thirdPoints');
const fourthPoints = document.getElementById('fourthPoints');
const fifthPoints = document.getElementById('fifthPoints');
const sixthPoints = document.getElementById('sixthPoints');
const seventhPoints = document.getElementById('seventhPoints');
const eigthPoints = document.getElementById('eigthPoints');

// REMPLACER LES NOMS SUR LE PODIUM ET LE CLASSEMENT
const firstPlayerName = document.getElementById('firstPlayerName');
const secondPlayerName = document.getElementById('secondPlayerName');
const thirdPlayerName = document.getElementById('thirdPlayerName');
const fourthPlayerName = document.getElementById('fourthPlayerName');
const fifthPlayerName = document.getElementById('fifthPlayerName');
const sixthPlayerName = document.getElementById('sixthPlayerName');
const seventhPlayerName = document.getElementById('seventhPlayerName');
const eigthPlayerName = document.getElementById('eigthPlayerName');

function triClassemnt() {
  firstPoints.innerText = playerTable[0].value;
  secondPoints.innerText = playerTable[1].value;
  thirdPoints.innerText = playerTable[2].value;
  fourthPoints.innerText = playerTable[3].value;
  fifthPoints.innerText = playerTable[4].value;
  sixthPoints.innerText = playerTable[5].value;
  seventhPoints.innerText = playerTable[6].value;
  eigthPoints.innerText = playerTable[7].value;

  firstPlayerName.innerText = playerTable[0].value;
  secondPlayerName.innerText = playerTable[1].value;
  thirdPlayerName.innerText = playerTable[2].value;
  fourthPlayerName.innerText = playerTable[3].value;
  fifthPlayerName.innerText = playerTable[4].value;
  sixthPlayerName.innerText = playerTable[5].value;
  seventhPlayerName.innerText = playerTable[6].value;
  eigthPlayerName.innerText = playerTable[7].value;
}

// TEST AJOUT RANDOM ET RETRI
clickTest.addEventListener('click', () => {
  sortPlayer();
  triClassemnt();
});
function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
  }
}
theme();
