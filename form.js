// const input = document.getElementById('input');
// const form = document.getElementById('form');
// const message = document.getElementById('message');


// form.addEventListener('submit', (e) => {
//         e.preventDefault();
//     if (input.value === '' || input.value === null) {
//             alert("Veuillez entrez un nom d'abord !");
//         }
//     else if
//         (message.value === '' || message.value === null) {
//             alert("veuillez aussi saisir un message, s'il vous plait");
    
//         }
    
//     else if(input.value !== '' && message.value !== null ){
//             alert("Nous avons bien reçu votre message. Merci de nous avoir contacté !");
//         }

// });
    
const input = document.getElementById('input');
const form = document.getElementById('form');
const message = document.getElementById('message');
const button = document.getElementById('send');
// const errorElement = document.getElementById('error');

form.addEventListener('submit', (e) => {
        e.preventDefault();
    if (input.value === '' || input.value === null) {
            alert("Veuillez entrez un nom d'abord !");
        }
    else if
        (message.value === '' || message.value === null) {
            alert("veuillez saisir un message, s'il vous plait");
    
        }
    // else if (message.value <= 0) {
    //         alert("Veuillez saisir au moins 5 caractères pour votre message");
    //     }
    else if(input.value !== '' && message.value !== null ){
            alert (" Merci " +input.value + " pour votre message. Nos équipes reviendront très vite vers vous !😂");
            input, button, form.reset();
        }
// else alert("votre message n'est pas complet") ("Votre message a été envoyé avec succés. Merci de nous avoir contacté !");
});
    

