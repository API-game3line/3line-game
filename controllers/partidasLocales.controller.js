const PartidaLocal = require('../models/partidaLocal.model.js');

exports.createPartida = async (req, res) => {
    try {
        const { player1Name, player2Name } = req.body;

        // Determinar aleatoriamente quién es jugador X y quién es jugador O
        const jugadores = [player1Name, player2Name];
        const randomIndex = Math.floor(Math.random() * 2);
        const jugadorX = jugadores[randomIndex];
        const jugadorO = jugadores[1 - randomIndex];

        // Crear una nueva partida en la base de datos
        const nuevaPartida = await PartidaLocal.create({
            playerName: `${player1Name} vs ${player2Name}`,
            jugadorX,
            jugadorO,
        });

        res.status(201).json(nuevaPartida);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
};

exports.actualizarPartida = async (req, res) => {
    try {
        const { partidaId, ganadas, perdidas, empatadas, historialPartidas, puntaje } = req.body;

        const partida = await PartidaLocal.findByPk(partidaId);
        if (!partida) {
            return res.status(404).send('Partida no encontrada');
        }

        partida.partidasGanadas = ganadas;
        partida.partidasPerdidas = perdidas;
        partida.partidasEmpatadas = empatadas;
        partida.historialPartidas = historialPartidas;
        partida.puntaje = puntaje;

        await partida.save();

        res.status(200).json(partida);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error del servidor');
    }
};
