const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Partida = sequelize.define('Partida', {
    jugador1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Jugadors', // Nombre de la tabla de jugadores
            key: 'id'
        }
    },
    jugador2: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Jugadors',
            key: 'id'
        }
    },
    resultado: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Partida;
