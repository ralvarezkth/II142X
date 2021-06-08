"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * A Room entity representing a room in which exams are taken.
 */
class Room extends Model {
    /**
     * Initializes the Room model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the Room entity.
     */
    static createModel(sequelize) {
        Room.init({
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
            grid: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Room",
            freezeTableName: true,
            paranoid: false,
        });

        return Room;
    }
}
module.exports = Room;