'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Patient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Patient.belongsTo(models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            Patient.hasMany(models.Booking, { foreignKey: 'patientId', as: 'patientData' })
        }
    };
    Patient.init({
        email: DataTypes.STRING,
        fullName: DataTypes.STRING,
        address: DataTypes.STRING,
        phonenumber: DataTypes.STRING,
        gender: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Patient',
    });
    return Patient;
};