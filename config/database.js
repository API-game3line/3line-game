const Sequelize = require('sequelize');

// Configuración de Sequelize para MySQL
const sequelize = new Sequelize('3linegame', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306, // Puerto por defecto de MySQL
    logging: true, // Puedes activar esto para ver logs de las consultas SQL ejecutadas
});

module.exports = sequelize;
