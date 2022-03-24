const iconAbout = document.getElementById('iconAbout');

function theme() {
  if (localStorage.getItem('darkmode') === 'activated') {
    document.body.classList.add('dark');
    iconAbout.setAttribute('src', './assets/person-night.png');
  } else {
    iconAbout.setAttribute('src', './assets/person-orange.png');
  }
}
theme();
