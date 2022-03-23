const clickTest = document.querySelector('h1');
const firstPlayerName = document.getElementById('firstPlayerName');

const playerTable = [] || JSON.parse(localStorage.getItem('playerTable'));

for (i in playerTable) {
  if (playerTable[i].score < playerTable[i + 1].score) {
  }
}

// TRI DECROISSANT (sort tri croissant- reverse tri decroissant- trinumbers trier les nombres)
function triNumbers(a, b) {
  return a - b;
}

score.sort(triNumbers);

// REMPLACER LES SCORES SUR LE PODIUM ET LE CLASSEMENT
const firstPoints = document.getElementById('firstPoints');
const secondPoints = document.getElementById('secondPoints');
const thirdPoints = document.getElementById('thirdPoints');
const fourthPoints = document.getElementById('fourthPoints');
const fifthPoints = document.getElementById('fifthPoints');
const sixthPoints = document.getElementById('sixthPoints');
const seventhPoints = document.getElementById('seventhPoints');
const eigthPoints = document.getElementById('eigthPoints');

function triClassemnt() {
  firstPoints.innerText = playerTable[0];
  secondPoints.innerText = playerTable[1];
  thirdPoints.innerText = playerTable[2];
  fourthPoints.innerText = playerTable[3];
  fifthPoints.innerText = playerTable[4];
  sixthPoints.innerText = playerTable[5];
  seventhPoints.innerText = playerTable[6];
  eigthPoints.innerText = playerTable[7];
}
triClassemnt();

// TEST AJOUT RANDOM ET RETRI
clickTest.addEventListener('click', () => {
  const random = Math.floor(Math.random() * 500);
  score.push(random);
  score.sort(triNumbers);
  score.reverse();
  triClassemnt();
  for (let i = 0; i < score.length; i++) {
    if (score[i] === player1.score) {
      firstPlayerName.innerText = player1.name;
    }
  }
});
