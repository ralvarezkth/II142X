"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Guard extends Model {
    static createModel(sequelize) {
        Guard.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Guard",
            freezeTableName: true,
            paranoid: false,
        });

        return Guard;
    }
}
module.exports = Guard;