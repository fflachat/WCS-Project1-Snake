function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
    document.getElementById('switchwnm').checked = true;
  }
}

theme();

function wallActivated() {
  if (localStorage.getItem('wallSetting')) {
    document.getElementById('switchw').checked = true;
  }
}

wallActivated();

const playButton = document.querySelector('button');
const audio = document.querySelector('audio');
const volumeSlider = document.getElementById('volume-slider');
const volumeOutput = document.getElementById('volume-output');
const nightModeBtn = document.getElementById('switchwnm');
const speedSlider = document.getElementById('speed-slider');
const wallBtn = document.getElementById('switchw');

// speed setting = dans le localStorage, valeur 'speedValue'

speedSlider.value = localStorage.getItem('speedSetting');

speedSlider.addEventListener('input', (e) => {
  const speedValue = e.currentTarget.value;
  localStorage.setItem('speedSetting', speedValue);
});

// sound setting
function playText() {
  if (playButton.innerText === '►') {
    playButton.innerText = '❙❙';
    playButton.classList.toggle('buttonMute');
    audio.play();
  } else {
    playButton.innerText = '►';
    playButton.classList.toggle('buttonMute');
    audio.pause();
  }
}

playButton.addEventListener('click', playText);

volumeSlider.addEventListener('input', (e) => {
  const volumeValue = e.currentTarget.value;
  volumeOutput.innerHTML = volumeValue;
  audio.volume = volumeValue / 100;
  localStorage.setItem('volume', volumeValue);
});

// night mode setting

nightModeBtn.addEventListener('click', () => {
  if (document.body.classList.contains('dark')) {
    document.body.classList.remove('dark');
    localStorage.removeItem('darkmode');
  } else {
    document.body.classList.add('dark');
    localStorage.setItem('darkmode', 'activated');
  }
});

// wall setting = dans le localStorage clé 'wallSetting'

wallBtn.addEventListener('click', () => {
  if (localStorage.getItem('wallSetting')) {
    localStorage.removeItem('wallSetting');
  } else {
    localStorage.setItem('wallSetting', 'activated');
  }
});
