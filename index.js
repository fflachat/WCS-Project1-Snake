// Night Mode
const imgPlayButton = document.getElementById('playButton');

function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
    document.getElementById('switchwnm').checked = true;
    imgPlayButton.setAttribute('src', './assets/PlayButton_NM.png');
  } else {
    imgPlayButton.setAttribute('src', './assets/PlayButton.png');
  }
}
theme();
