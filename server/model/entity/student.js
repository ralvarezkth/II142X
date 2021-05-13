"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Student extends Model {
    /**
     * Initializes the Student model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Student entity.
     */
    static createModel(sequelize) {
        Student.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            usbId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sessionId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            statusId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            ping: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Student",
            freezeTableName: true,
            paranoid: false,
        });

        return Student;
    }
}
module.exports = Student;