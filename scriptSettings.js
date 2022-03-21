function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
  }
}

theme();

const playButton = document.querySelector('button');
const audio = document.querySelector('audio');
const volumeSlider = document.getElementById('volume-slider');
const volumeOutput = document.getElementById('volume-output');
const nightMode = document.getElementById('switchwnm');

// sound setting
function playText() {
  if (playButton.innerText === 'PLAY') {
    playButton.innerText = 'MUTE';
    playButton.classList.toggle('buttonMute');
    audio.play();
  } else {
    playButton.innerText = 'PLAY';
    playButton.classList.toggle('buttonMute');
    audio.pause();
  }
}

playButton.addEventListener('click', playText);

volumeSlider.addEventListener('input', (e) => {
  const volumeValue = e.currentTarget.value;
  volumeOutput.innerHTML = volumeValue;
  audio.volume = volumeValue / 100;
});

// night mode setting

nightMode.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    localStorage.removeItem('darkmode');
  } else {
    document.body.classList.add('dark');
    localStorage.setItem('darkmode', 'activated');
  }
});
