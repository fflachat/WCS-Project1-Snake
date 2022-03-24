// Trick to go to the score page for the demo
const btn = document.querySelector('#nameInputBtn');

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.id = name + score;
  }
}

const playerTable = JSON.parse(localStorage.getItem('playerTable')) || [];

const score = localStorage.getItem('Score');

document.getElementById('score').innerHTML = score;

btn.addEventListener('click', (event) => {
  event.preventDefault();
  const name = document.getElementById('nameInput').value;
  const player = new Player(name, score);
  playerTable.push(player);
  const playerTableJSON = JSON.stringify(playerTable);
  localStorage.setItem('playerTable', playerTableJSON);
  window.location.href = './score.html';
});

// Night Theme mode
function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
  }
}
theme();
