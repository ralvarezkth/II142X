"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

class Session extends Model {
    /**
     * Initializes the Session model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Session entity.
     */
    static createModel(sequelize) {
        Session.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
            guardId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            grid: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
            statusId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Session",
            freezeTableName: true,
            paranoid: false,
        });

        return Session;
    }
}
module.exports = Session;