const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

// Controlador para registro de usuarios
exports.register = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Crear un nuevo usuario en la base de datos
        const newUser = await User.create({ username, password, email });

         // Redirigir al usuario a la página de login después del registro exitoso
         res.redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// Controlador para login de usuarios
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar credenciales del usuario
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Comparar la contraseña ingresada con la almacenada en la base de datos
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        // Redirigir al usuario a la página de login después del registro exitoso
        res.redirect('/game');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
