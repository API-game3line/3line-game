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

// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Usar las rutas de autenticación
app.use('/auth', authRoutes);

// Usar las rutas definidas en routes.js
app.use('/', routes);

// Servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '/client')));

// Iniciar el servidor
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}).catch(error => {
    console.error('Error al sincronizar con la base de datos:', error);
});