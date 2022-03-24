// Trick to go to the score page for the demo
const btnScore = document.querySelector('#nameInputBtn');

document.getElementById('score').innerHTML =
  window.localStorage.getItem('Score');

btnScore.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = './score.html';
});

// Night Theme mode
function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
  }
}
theme();
