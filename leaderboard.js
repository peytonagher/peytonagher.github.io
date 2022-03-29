function load() {
    const name = localStorage.getItem('player');
    document.getElementById('name').value = name;
}

function playAsGuest() {
    const playerName = document.getElementById('name').value;
    alert('enter your name: ');
    localStorage.setItem('player', playerName);
}

function createPlayer() {
    
}