const iconAbout = document.getElementById('iconAbout');
const snakeImage = document.getElementById('snakeImage');
const paragraphe = document.getElementById('paragraphe');

function theme() {
  if (localStorage.getItem('darkmode')) {
    document.body.classList.add('dark');
    iconAbout.setAttribute('src', './assets/person-night.png');
    snakeImage.setAttribute('src', './assets/snake-night.jpg');
  } else {
    iconAbout.setAttribute('src', './assets/person-orange.png');
  }
}
theme();
