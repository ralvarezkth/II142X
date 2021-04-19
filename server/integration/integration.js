"use strict";

const Sequelize = require("sequelize");
const Guard = require("../model/entity/guard");
const Room = require("../model/entity/room");
const Status = require("../model/entity/status");
const Student = require("../model/entity/student");
const UsbClient = require("../model/entity/UsbClient");

class Integration {
    constructor() {
        this.database = new Sequelize("tentadb", "postgres", "admin", {
            host: "localhost",
            port: "5432",
            dialect: "postgres",
        });
        this.initialize();
    }

    async initialize() {
        this.initModels();
        await this.initTables();
    }

    initModels() {
        Student.createModel(this.database);
        UsbClient.createModel(this.database);
        Guard.createModel(this.database);
        Room.createModel(this.database);
        Status.createModel(this.database);
        UsbClient.hasOne(Student, { foreignKey: "usbId" });
        Student.belongsTo(UsbClient, { foreignKey: "usbId" });
        Room.hasMany(Student, { foreignKey: "roomId" });
        Student.belongsTo(Room, { foreignKey: "roomId" });
        Status.hasMany(Student, { foreignKey: "statusId" });
        Student.belongsTo(Status, { foreignKey: "statusId" });
    }

    async initTables() {
        try {
            await this.database.authenticate();
            await this.database.sync();
        } catch (error) {
            console.log(error);
        }
    }

    async getRooms() {
        try {
            return await Room.findAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getStudents() {
        try {
            return await Student.findAll();
        } catch (error) {
            console.log(error);
        }
    }

    async getStudentById(id) {
        // validation
        try {
            return await Student.findOne({ where: { id } });
        } catch (error) {
            console.log(error);
        }
    }

    async getStudentsByRoomId(id) {
        // validation
        try {
            return await Student.findAll({ where: { roomId: id } });
        } catch (error) {
            console.log(error);
        }
    }

    async setStudentStatusById(statusId, id) {
        // validation
        try {
            return await this.database.transaction(async t => {
                await Student.update({ statusId }, { where: { id }, transaction: t });
                return await Student.findOne({ where: { id }, transaction: t });
            });
        } catch (error) {
            console.log(error);
        }
    }

    async connectStudent(student) {
        // validation
        try {
            return await Student.create(student);
        } catch (error) {
            console.log(error);
        }
    }

    async ping(id) {
        // validation
        console.log("id: " + id);
        try {
            return await Student.increment("ping", { where: { id } });
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = Integration;