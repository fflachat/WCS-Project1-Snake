// GAME

const upBtn = document.querySelector('#up');
const downBtn = document.querySelector('#down');
const leftBtn = document.querySelector('#left');
const rightBtn = document.querySelector('#right');
const display = document.querySelector('#display');
const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');

upBtn.addEventListener('click', () => {
  display.innerHTML = 'UP';
});

downBtn.addEventListener('click', () => {
  display.innerHTML = 'DOWN';
});

leftBtn.addEventListener('click', () => {
  display.innerHTML = 'LEFT';
});

rightBtn.addEventListener('click', () => {
  display.innerHTML = 'RIGHT';
});
