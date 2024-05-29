'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {
            // define association here
            History.belongsTo(models.User, { foreignKey: 'doctorId', targetKey: 'id', as: 'appointmentData' })
        }
    };
    History.init({
        patientId: DataTypes.INTEGER,
        doctorId: DataTypes.INTEGER,
        statusId: DataTypes.STRING,
        reason: DataTypes.TEXT,
        files: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};