// Night Mode
const imgPlayButton = document.getElementById('playButton');
const iconHome = document.getElementById('iconHome');

function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
    document.getElementById('switchwnm').checked = true;
    imgPlayButton.setAttribute('src', './assets/PlayButton_NM.png');
    iconHome.setAttribute('src', './assets/home-night.png');
  } else {
    imgPlayButton.setAttribute('src', './assets/PlayButton.png');
    iconHome.setAttribute('src', './assets/home-orange.png');
  }
}
theme();
