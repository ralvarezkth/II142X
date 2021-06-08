"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * A Guard entity representing an exam invigilator.
 */
class Guard extends Model {
    /**
     * Initializes the Guard model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Guard entity.
     */
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