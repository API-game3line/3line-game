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
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Redirige a la página del juego con los nombres de los jugadores
        window.location.href = `/game?player1=${player1Name}&player2=${player2Name}`;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}