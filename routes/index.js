const express = require('express');
const router = express.Router();

// Ruta para la página de inicio
router.get('/', (req, res) => {
    res.render('index'); // Renderizamos la vista index.ejs
});

// Ruta para la página de registro
router.get('/register', (req, res) => {
    res.render('register'); // Renderizamos la vista register.ejs
});

// Ruta para la página de inicio de sesión
router.get('/login', (req, res) => {
    res.render('login'); // Renderizamos la vista login.ejs
});

router.get('/game', (req, res) => {
    res.render('game'); // Renderizamos la vista login.ejs
});


module.exports = router;
