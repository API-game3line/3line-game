function startGame() {
    const player1Name = document.getElementById("player1Name").value;
    const player2Name = document.getElementById("player2Name").value;

    fetch('/start-game', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player1Name, player2Name }),
    })
    .then(response => response.json())
    .then(data => {
        window.location.href = '/game';
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
