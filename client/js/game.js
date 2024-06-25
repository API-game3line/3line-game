const urlParams = new URLSearchParams(window.location.search);
let boxes = document.querySelectorAll(".box");
const jugadorX = urlParams.get('player1');
const jugadorO = urlParams.get('player2');

// Usar jugadorX y jugadorO según sea necesario en el juego
document.getElementById('jugadorX').textContent = jugadorX;
document.getElementById('jugadorO').textContent = jugadorO;

let turn = "X";
let isGameOver = false;

boxes.forEach(e => {
    e.innerHTML = ""
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            e.innerHTML = turn;
            cheakWin();
            cheakDraw();
            changeTurn();
        }
    })
})

function changeTurn() {
    if (turn === "X") {
        turn = "O";
        document.querySelector(".bg").style.left = "104px";
    }
    else {
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function cheakWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 != "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            let winner = (turn === "X") ? jugadorX : jugadorO;
            document.querySelector("#results").innerHTML = winner + " wins!";
            document.querySelector("#play-again").style.display = "inline"

            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }

            // Guardar la partida en la base de datos
            guardarPartida(jugadorX, jugadorO, winner === jugadorX ? 'Ganada' : 'Perdida');
        }
    }
}

function cheakDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        })

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Empate";
            document.querySelector("#play-again").style.display = "inline"

            // Guardar la partida en la base de datos como empate
            guardarPartida(jugadorX, jugadorO, 'Empate');
        }
    }
}

document.querySelector("#play-again").addEventListener("click", () => {
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e => {
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})
document.querySelector("#go-home").addEventListener("click", () => {
    window.location.href = '/index';
})


// Función para guardar la partida en el servidor
async function guardarPartida(jugador1, jugador2, resultado) {
    try {
        const response = await fetch('/guardarPartida', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jugador1, jugador2, resultado })
        });

        const data = await response.json();
        console.log(data.message); // Puedes manejar la respuesta como desees
    } catch (error) {
        console.error('Error al guardar la partida:', error);
    }
}