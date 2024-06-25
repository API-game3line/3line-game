const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class PartidaLocal extends Model {}

PartidaLocal.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    playerName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jugadorX: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jugadorO: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    partidasGanadas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    partidasPerdidas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    partidasEmpatadas: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    historialPartidas: {
        type: DataTypes.TEXT,
        defaultValue: '',
    },
    puntaje: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
}, {
    sequelize,
    modelName: 'PartidaLocal',
    tableName: 'partida_local',
    timestamps: false
});

module.exports = PartidaLocal;
