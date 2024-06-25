const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index.js');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Usar las rutas definidas en routes.js
app.use('/', routes);

// Servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '/client')));
// Ruta para iniciar el juego
app.post('/start-game', (req, res) => {
    const { player1Name, player2Name } = req.body;
    
    // Aquí puedes procesar los nombres de los jugadores, crear la partida, etc.
    // Por ejemplo, puedes enviar una respuesta JSON con los nombres de los jugadores
    res.status(200).json({ player1Name, player2Name });
});
const Partida = require('./models/partidaModel.js');
// Iniciar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(error => {
    console.error('Error al sincronizar con la base de datos:', error);
});