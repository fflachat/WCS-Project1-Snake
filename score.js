const clickTest = document.querySelector('h1');
const score = [1, 90, 4, 87, 43, 99, 77, 21];
const firstPlayer = document.getElementById('firstPlayer');

const player1 = {
  name: 'julie',
  score: 2000,
};

score.push(player1.score);

// TRI DECROISSANT (sort tri croissant- reverse tri decroissant- trinumbers trier les nombres)
function triNumbers(a, b) {
  return a - b;
}

score.sort(triNumbers);
score.reverse();

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
  firstPoints.innerText = score[0];
  secondPoints.innerText = score[1];
  thirdPoints.innerText = score[2];
  fourthPoints.innerText = score[3];
  fifthPoints.innerText = score[4];
  sixthPoints.innerText = score[5];
  seventhPoints.innerText = score[6];
  eigthPoints.innerText = score[7];
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
      firstPlayer.innerText = player1.name;
    }
  }
});
