const playButton = document.querySelector('button');
const audio = document.querySelector('audio');
const volumeSlider = document.getElementById('volume-slider');
const volumeOutput = document.getElementById('volume-output');

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
