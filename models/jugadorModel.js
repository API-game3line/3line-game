const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jugador = sequelize.define('Jugador', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ganador: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    perdedor: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    empate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = Jugador;
