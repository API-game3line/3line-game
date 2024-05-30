
// En el archivo client.js
const socket = io(); // Conectar al servidor Socket.IO
console.log("Conexión establecida con el servidor Socket.IO");

let turn = "X";
let boxes = document.querySelectorAll(".box");
let isGameOver = false;

boxes.forEach((e, index) => {
    e.innerHTML = ""
    e.addEventListener("click", () => {
        if (!isGameOver && e.innerHTML === "") {
            socket.emit('playTurn', { index, player: turn }); // Enviar el jugador actual
        console.log("Evento 'playTurn' enviado al servidor");
        // Cambiar el turno localmente después de enviar la jugada al servidor
        turn = (turn === 'X') ? 'O' : 'X';
        }
    })
})

socket.on('updateGameBoard', (gameBoard) => {
    boxes.forEach((e, index) => {
        e.innerHTML = gameBoard[index];
    });
    checkWin();
    checkDraw();
    changeTurn
});

function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin() {
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < winConditions.length; i++) {
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if (v0 !== "" && v0 === v1 && v0 === v2) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = v0 + " win";
            document.querySelector("#play-again").style.display = "inline";

            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6";
                boxes[winConditions[i][j]].style.color = "#000";
            }
        }
    }
}

function checkDraw() {
    if (!isGameOver) {
        let isDraw = true;
        boxes.forEach(e => {
            if (e.innerHTML === "") isDraw = false;
        });

        if (isDraw) {
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Draw";
            document.querySelector("#play-again").style.display = "inline";
        }
    }
}
document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})
function restartGame() {
    console.log("Se ha llamado a la función restartGame()");
    // Reiniciar el tablero de juego a su estado inicial
    gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Restablecer cualquier otro estado del juego, como el turno del jugador, el estado de finalización del juego, etc.
    isGameOver = false;
    turn = "X";

    // Limpiar la visualización en el cliente, si es necesario
    clearBoardView();
}
// Función para limpiar la visualización del tablero en el cliente
function clearBoardView() {
    // Por ejemplo, puedes eliminar todos los símbolos de las casillas del tablero en el cliente
    boxes.forEach(e => {
        e.innerHTML = '';
    });}

    document.addEventListener("DOMContentLoaded", function() {
        const resetButton = document.querySelector("#reset-button");
        resetButton.addEventListener("click", () => {
            restartGame();
        });
    });
