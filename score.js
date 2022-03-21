function theme() {
if (localStorage.getItem('darkmode') === 'activated') {
 document.body.classList.add('dark');
}
}
theme();