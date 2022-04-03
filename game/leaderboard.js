// some bullshit i wrote with the guidance of a website, snake game will 
// eventually, at some point, have a leaderboard with top scores

function load() {
    const name = localStorage.getItem('player');
    document.getElementById('name').value = name;
}

function playAsGuest() {
    const playerName = document.getElementById('name').value;
    alert('enter your name: ');
    localStorage.setItem('player', playerName);
}

async function createPlayer() {
    const username = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    if (!username) return alert ('please enter a name');
    if (!password) return alert ('please enter a password');

    const path = '/~/game/login';
	const method = 'POST';
	const headers = { 'Content-Type': 'application/json' }
	const body = JSON.stringify({ username, password });
	const redirect = 'error';

    try {
		const resp = await fetch(path, { method, headers, body, redirect });
		const ans = await resp.json();
		if(ans.error) return alert(ans.error);
		
		playername = username;
		localStorage.setItem('playername', playername);
		location.href = '/~/game/snake'
	} 

    catch(ex) {
		alert('check your name and password')
	}
}

async function logout() {
    const path = '/~/game/login';
    const method = 'POST';
    await fetch(path, {method});
    location.reload();
}

async function getScores() {
    const path = '/~/game/snake/leaders?all=true';
	const method = 'GET'
	const resp = await fetch(path, { method });
	const leaders = await resp.json();
	const $leaders = document.getElementById('leaders');

	$leaders.innerHTML = leaders
    .filter(leader => parseInt(leader.data.score) >= 0) 
    .sort((a, b) => parseInt(b.data.score) > parseInt(a.data.score) ? 1 : -1)
    .filter((leader, i) => i < 10)
    .map((leader, i) => `
        <div>${i + 1}. ${leader.data.name} ${leader.data.score}</div>
    `)
    .join('\n')
}