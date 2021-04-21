"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Status extends Model {
    /**
     * Initializes the Status model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Status entity.
     */
    static createModel(sequelize) {
        Status.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Status",
            freezeTableName: true,
            paranoid: false,
        });

        return Status;
    }
}
module.exports = Status;