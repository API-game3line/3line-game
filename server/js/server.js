const express = require('express');
const path = require('path');
const routes = require('../../routes/index');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de las vistas
app.set('views', path.join(__dirname, '..', '..', 'views'));
app.set('view engine', 'ejs');

// Usar las rutas definidas en routes.js
app.use('/', routes);

// Servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '../../client')));

// Escuchar en el puerto definido
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
