"use strict";

const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * A UsbClient entity representing the usb flash drive.
 */
class UsbClient extends Model {
    /**
     * Initializes the UsbClient model.
     *
     * @param {Sequelize} sequelize A sequelize connection instance object.
     * @return            A sequelize model describing the UsbClient entity.
     */
    static createModel(sequelize) {
        UsbClient.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true,
            },
        }, {
            sequelize,
            modelName: "UsbClient",
            freezeTableName: true,
            paranoid: false,
        });

        return UsbClient;
    }
}
module.exports = UsbClient;