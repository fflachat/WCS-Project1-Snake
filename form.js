const input = document.getElementById('input');
const form = document.getElementById('form');
const message = document.getElementById('message');
const button = document.getElementById('send');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value === '' || input.value === null) {
    alert("Veuillez entrez un nom d'abord !");
  } else if (message.value === '' || message.value === null) {
    alert("veuillez saisir un message, s'il vous plait");
  } else if (input.value !== '' && message.value !== null) {
    alert(
      ' Merci ' +
        input.value +
        ' pour votre message. Nos équipes reviendront très vite vers vous !😂'
    );
    input, button, form.reset();
  }
});
