const express = require('express');
const router = express.Router();
const Jugador = require('../models/jugadorModel.js')
const Partida = require('../models/partidaModel.js');


// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('register'); // Renderizamos la vista index.ejs
});

// Ruta para la página de index
router.get('/index', (req, res) => {
    res.render('index'); // Renderizamos la vista register.ejs
});

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderizamos la vista login.ejs
});

router.get('/game', (req, res) => {
    res.render('game'); // Renderizamos la vista login.ejs
    
});

// Ruta para guardar la partida
router.post('/guardarPartida', async (req, res) => {
    const { jugador1, jugador2, resultado } = req.body;
    try {
        // Encontrar o crear jugadores
        const [player1, created1] = await Jugador.findOrCreate({ where: { nombre: jugador1 } });
        const [player2, created2] = await Jugador.findOrCreate({ where: { nombre: jugador2 } });

        // Actualizar estadísticas de los jugadores
        if (resultado === 'Ganada') {
            player1.ganador += 1;
            player2.perdedor += 1;
        } else if (resultado === 'Perdida') {
            player1.perdedor += 1;
            player2.ganador += 1;
        } else if (resultado === 'Empate') {
            player1.empate += 1;
            player2.empate += 1;
        }

        // Guardar los cambios en la base de datos
        await player1.save();
        await player2.save();

        // Crear registro de la partida
        await Partida.create({
            jugador1: player1.id,
            jugador2: player2.id,
            resultado: resultado
        });

        res.status(200).json({ message: 'Partida guardada exitosamente' });
    } catch (error) {
        console.error('Error al guardar la partida:', error);
        res.status(500).json({ message: 'Error al guardar la partida' });
    }
});
// Ruta para obtener la lista de jugadores y calcular los puntajes
router.get('/players', async (req, res) => {
    try {
        const players = await Jugador.findAll();
        
        // Calcula el puntaje de cada jugador
        const playerData = players.map(player => {
            const wins = player.ganador || 0;
            const losses = player.perdedor || 0;
            const draws = player.empate || 0;
            const score = (wins * 500) + (losses * -400) + (draws * 250);
            
            return {
                name: player.nombre,
                wins: wins,
                losses: losses,
                draws: draws,
                score: score
            };
        });

        res.render('players', { players: playerData });
    } catch (error) {
        console.error('Error al obtener los jugadores:', error);
        res.status(500).send('Error al obtener los jugadores');
    }
});

module.exports = router;
