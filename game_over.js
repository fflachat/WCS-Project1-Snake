// Trick to go to the score page for the demo

const btnScore = document.querySelector('#nameInputBtn');

btnScore.addEventListener('click', (event) => {
  event.preventDefault();
  window.location.href = './score.html';
});
