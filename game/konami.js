const input = [];
const konamiCode = 'wwssadadba';

window.addEventListener('keyup', (event) => {
    console.log(event.key);
    input.push(event.key);
    input.splice(-konamiCode.length - 1, input.length - konamiCode.length);
    if (input.join('').includes(konamiCode)) {
        console.log('it works!') // enable game display here
    }
    console.log(input);
})