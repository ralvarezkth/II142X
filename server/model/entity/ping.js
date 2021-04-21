"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Ping extends Model {
    /**
     * Initializes the Ping model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Ping entity.
     */
    static createModel(sequelize) {
        Ping.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            value: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Ping",
            freezeTableName: true,
            paranoid: false,
        });

        return Ping;
    }
}
module.exports = Ping;