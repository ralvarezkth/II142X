"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Student extends Model {
    static createModel(sequelize) {
        Student.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ssn: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            usbId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
            },
            roomId: {
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