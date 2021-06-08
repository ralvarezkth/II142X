"use strict";

const Sequelize = require("sequelize");
const Guard = require("../model/entity/guard");
const Room = require("../model/entity/room");
const Status = require("../model/entity/status");
const Student = require("../model/entity/student");
const UsbClient = require("../model/entity/UsbClient");
const ValidatorUtil = require("../util/validatorUtil");
const { WError } = require("verror");
const StudentDTO = require("../model/dto/StudentDTO");
const Ping = require("../model/entity/ping");
const Session = require("../model/entity/session");

class Integration {
    /**
     * Creates a new instance of this class and initializes the database connection
     * using default credentials for a local postgres database.
     * Initialization creates the model entities and the required database tables
     * if they are non-existent.
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.database = new Sequelize("tentadb", "postgres", "admin", {
            host: "localhost",
            port: "5432",
            dialect: "postgres",
        });
        this.initialize();
        this.validator = new ValidatorUtil();
    }

    async initialize() {
        this.initModels();
        await this.initTables();
        this.minIntervalMinutes = 10;
        this.maxIntervalMinutes = 30;
        this.interval = this.setRandomInterval(async() => this.randomizePing(), this.minIntervalMinutes * 60000, this.maxIntervalMinutes * 60000);
    }

    initModels() {
        Student.createModel(this.database);
        UsbClient.createModel(this.database);
        Guard.createModel(this.database);
        Room.createModel(this.database);
        Status.createModel(this.database);
        Ping.createModel(this.database);
        Session.createModel(this.database);
        UsbClient.hasOne(Student, { foreignKey: "usbId" });
        Student.belongsTo(UsbClient, { foreignKey: "usbId" });
        Session.hasMany(Student, { foreignKey: "sessionId" });
        Student.belongsTo(Session, { foreignKey: "sessionId" });
        Guard.hasOne(Session, { foreignKey: "guardId" });
        Session.belongsTo(Guard, { foreignKey: "guardId" });
        Status.hasMany(Student, { foreignKey: "statusId" });
        Student.belongsTo(Status, { foreignKey: "statusId" });
        Status.hasMany(Session, { foreignKey: "statusId" });
        Session.belongsTo(Status, { foreignKey: "statusId" });
    }

    async initTables() {
        try {
            await this.database.authenticate();
            await this.database.sync();
        } catch (error) {
            throw new WError({
                    name: "DatabaseAuthSyncError",
                    cause: error,
                    info: {
                        message: "Technical issues, please try again later.",
                    },
                },
                "Could not connect to the database."
            );
        }
    }

    setRandomInterval(intervalFunction, minDelay, maxDelay) {
        let timeout;
        const runInterval = () => {
            const timeoutFunction = () => {
                intervalFunction();
                runInterval();
            };
            const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            timeout = setTimeout(timeoutFunction, delay);
        };
        runInterval();
        return {
            clear() {
                clearTimeout(timeout);
            },
        };
    }

    /**
     * Called to stop the automatic randomization of ping values.
     */
    stopPingRandomizer() {
        this.interval.clear();
    }

    /**
     * Called to retrieve all registered rooms.
     *
     * @returns A list of all registered rooms.
     */
    async getRooms() {
        try {
            return await Room.findAll();
        } catch (error) {
            throw new WError({
                    name: "GetAllRoomsFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve a list of rooms, please try again later.`,
                    },
                },
                "Retrieval of all rooms failed."
            );
        }
    }

    /**
     * Called to retrieve all registered students.
     *
     * @returns A list of all registered students.
     */
    async getStudents() {
        try {
            return await Student.findAll();
        } catch (error) {
            throw new WError({
                    name: "GetAllStudentsFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve a list of students, please try again later.`,
                    },
                },
                "Retrieval of all students failed."
            );
        }
    }

    /**
     * Called to retrieve a student by its id.
     *
     * @param {number} id The id of the student.
     * @returns        The student that matches the provided id.
     */
    async getStudentById(id) {
        const validatedId = this.validator.validateId(id);
        if (validatedId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedId.error } }, "Id validation has failed.");
        }
        try {
            return await Student.findOne({ where: { id: validatedId } });
        } catch (error) {
            throw new WError({
                    name: "GetStudentFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve the specified student, please try again later.`,
                    },
                },
                "Retrieval of student failed."
            );
        }
    }

    /**
     * Called to retrive a list of active students registered at the specified session.
     *
     * @param {number} id The id of the session from which to retrieve active students.
     * @returns        A list of active students registered at the specified session.
     */
    async getActiveStudentsBySessionId(sessionId) {
        const validatedSessionId = this.validator.validateId(sessionId);
        if (validatedSessionId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedSessionId.error } }, "Id validation has failed.");
        }
        try {
            return await Student.findAll({ where: { sessionId: validatedSessionId, statusId: [1, 3] } });
        } catch (error) {
            throw new WError({
                    name: "GetStudentsInSessionFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve a list of students, please try again later.`,
                    },
                },
                "Retrieval of students within specified session failed."
            );
        }
    }

    /**
     * Called to retrive a list of students registered at the specified session.
     *
     * @param {number} id The id of the session from which to retrieve students.
     * @returns A list of students registered at the specified session.
     */
    async getStudentsBySessionId(sessionId) {
        const validatedSessionId = this.validator.validateId(sessionId);
        if (validatedSessionId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedSessionId.error } }, "Id validation has failed.");
        }
        try {
            return await Student.findAll({ where: { sessionId: validatedSessionId } });
        } catch (error) {
            throw new WError({
                    name: "GetStudentsInSessionFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve a list of students, please try again later.`,
                    },
                },
                "Retrieval of students within specified session failed."
            );
        }
    }

    /**
     * Retrieves a user as a Guard entity from the database by username and compares
     * its password with the provided password. The parameters are validated and sanitized
     * before use.
     *
     * @param {string} username The username to find in the database.
     * @param {string} password The password to compare with
     * @returns        The found guard entity.
     * @throws Throws an exception if unable to retrieve Guard or if the provided password is incorrect.
     */
    async getUser(username, password) {
        const ValidatedUsername = this.validator.validateUserLogin(username, password);
        if (ValidatedUsername.error) {
            throw new WError({ name: "DataValidationError", info: { message: ValidatedUsername.error } }, "Username and password validation has failed.");
        }
        try {
            const user = await Guard.findOne({ where: { username: ValidatedUsername } });
            if (user && user.password) {
                if (user.password === password) {
                    user.password = "";
                    return user;
                }
            }
            throw new WError({ name: "InvalidPasswordError", info: { message: "The provided username and password do not match." } }, "The provided password is invalid.");
        } catch (error) {
            if (error.name && error.name === "InvalidPasswordError") {
                throw error;
            }
            throw new WError({
                    name: "GetUserFailedError",
                    cause: error,
                    info: {
                        message: `An error occured, please try again later.`,
                    },
                },
                "Unhandled error, please contact the system administrator."
            );
        }
    }

    /**
     * Called to change the status of a student entity to the provided status id.
     *
     * @param {number} statusId The statusId to change to.
     * @param {number} id The id of the student entity to modify.
     * @returns        The updated Student entity.
     * @throws Throws an exception if unable to update the Student or if data validation fails.
     */
    async setStatusOfStudentInSession(sessionId, usbId, statusId) {
        const validatedSessionId = this.validator.validateId(sessionId);
        const validatedUsbId = this.validator.validateId(usbId);
        const validatedStatusId = this.validator.validateId(statusId);
        if (validatedSessionId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedSessionId.error } }, "Session id validation has failed.");
        }
        if (validatedUsbId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedUsbId.error } }, "Usb id validation has failed.");
        }
        if (validatedStatusId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedStatusId.error } }, "Status id validation has failed.");
        }
        try {
            return await this.database.transaction(async t => {
                const session = await Session.findOne({ where: { id: validatedSessionId }, transaction: t });
                if (session === null) {
                    throw new WError({ name: "SessionNotFoundError", info: { message: "Student status change failed: Session does not exist." } }, "Student status change failed.");
                }
                await Student.update({ statusId: validatedStatusId }, { where: { usbId: validatedUsbId, sessionId: validatedSessionId }, transaction: t });
                return await Student.findOne({ where: { usbId: validatedUsbId, sessionId: validatedSessionId }, transaction: t });
            });
        } catch (error) {
            if (error.name === "SessionNotFoundError") {
                throw error;
            }
            let message = "An error occured when attempting to change the status, please try again later.";
            if (error.name === "SequelizeForeignKeyConstraintError") {
                message = `Student status change failed: StatusId (${validatedStatusId}) does not exist`;
            }
            throw new WError({
                    name: "StudentStatusChangeFailedError",
                    cause: error,
                    info: {
                        message,
                    },
                },
                "Student status change failed."
            );
        }
    }

    /**
     * Called to ping the server and increment the ping value of the specified Student entity.
     *
     * @param {number} id The id of the Student entity to modify.
     * @returns        The updated Student entity.
     */
    async ping(id) {
        const validatedId = this.validator.validateId(id);
        if (validatedId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedId.error } }, "Id validation has failed.");
        }
        try {
            return await this.database.transaction(async t => {
                await Student.increment("ping", { where: { id: validatedId }, transaction: t });
                const modifiedStudent = await Student.findOne({ where: { id: validatedId }, transaction: t });
                if (!modifiedStudent) {
                    throw new WError({ name: "StudentDoesNotExistError", info: { message: `There is no student with id: ${validatedId} registered` } }, `Student with id: ${validatedId} does not exist.`);
                }
                return modifiedStudent;
            });
        } catch (error) {
            if (error.name === "StudentDoesNotExistError") {
                throw error;
            }
            throw new WError({
                    name: "PingIncrementationFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to ping the server, please try again later.`,
                    },
                },
                "Ping incrementation failed."
            );
        }
    }

    /**
     * Called to set a new random ping value to all registered students.
     *
     * @returns An array containing the number of rows set to a new value.
     */
    async randomizePing() {
        const newPingValue = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
        try {
            return await this.database.transaction(async t => {
                const students = await Student.findAll({ transaction: t });
                const studentIds = students.map(student => student.id);
                await Ping.update({ value: newPingValue }, { where: { id: 1 }, transaction: t });
                return await Student.update({ ping: newPingValue }, { where: { id: studentIds }, transaction: t });
            });
        } catch (error) {
            throw new WError({
                    name: "RandomPingFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to randomize the ping value, please try again later.`,
                    },
                },
                "Ping randomization failed."
            );
        }
    }

    /**
     * Called to retrieve the current randomized ping value.
     *
     * @returns Ping entity containing the current randomized ping value.
     */
    async getPing() {
        try {
            return await Ping.findOne({ where: { id: 1 } });
        } catch (error) {
            throw new WError({
                    name: "RetrievePingFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve the ping value, please try again later.`,
                    },
                },
                "Ping retrieval failed."
            );
        }
    }

    /**
     * Called to retrieve a room entity by roomId.
     *
     * @param {number} roomId The id of the room to be retrieved.
     * @returns        The room that matches the provided roomId.
     */
    async getRoomById(roomId) {
        const validatedRoomId = this.validator.validateId(roomId);
        if (validatedRoomId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedRoomId.error } }, "RoomId validation has failed.");
        }
        try {
            return await Room.findOne({ where: { id: validatedRoomId } });
        } catch (error) {
            throw new WError({
                    name: "GetRoomFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve the specified room, please try again later.`,
                    },
                },
                "Room retrieval failed."
            );
        }
    }

    /**
     * Called to set the seating grid of a room entity.
     *
     * @param {number} roomId The id of the room to be modified.
     * @param {number[]} grid The new grid to be set.
     * @returns               The updated room entity.
     */
    async setRoomGridById(roomId, grid) {
        const validatedRoomId = this.validator.validateId(roomId);
        const validatedGrid = this.validator.validateGrid(grid);
        if (validatedRoomId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedRoomId.error } }, "RoomId validation has failed.");
        }
        if (validatedGrid.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedGrid.error } }, "Grid validation has failed.");
        }
        try {
            return await this.database.transaction(async t => {
                await Room.update({ grid: validatedGrid }, { where: { id: validatedRoomId }, transaction: t });
                return await Room.findOne({ where: { id: validatedRoomId }, transaction: t });
            });
        } catch (error) {
            throw new WError({
                    name: "SetRoomGridFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to set a new room seating grid, please try again later.`,
                    },
                },
                "Room grid setting failed."
            );
        }
    }

    /**
     * Called to create a session with a specified guard, seating grid and group of students.
     *
     * @param {number}   guardId The id of the guard responsible for the session.
     * @param {number[]} grid The seating grid for the session.
     * @param {object[]} students The group of students.
     * @returns          The created session.
     */
    async createSession(guardId, grid, students) {
        const validatedGuardId = this.validator.validateId(guardId);
        if (validatedGuardId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedGuardId.error } }, "Guard id validation has failed.");
        }
        const vgrid = grid;
        if (vgrid.error) {
            throw new WError({ name: "DataValidationError", info: { message: vgrid.error } }, "Grid validation has failed.");
        }
        if (students.error) {
            throw new WError({ name: "DataValidationError", info: { message: students.error } }, "Array of students validation has failed.");
        }
        try {
            let foundSession = await Session.findOne({ where: { guardId: validatedGuardId, statusId: 1 } });
            if (foundSession) {
                await Session.update({ statusId: 2 }, { where: { guardId: validatedGuardId } });
            }
            return await this.database.transaction(async t => {
                const newSession = await Session.create({ guardId: validatedGuardId, grid: vgrid, statusId: 1 });
                for (const student of students) {
                    const foundStudent = await Student.findOne({ where: { usbId: student.usbId, sessionId: newSession.id }, transaction: t });
                    if (!foundStudent) {
                        await Student.create(new StudentDTO(null, student.usbId, newSession.id, 1, 1, student.pos), { transaction: t });
                    }
                }
                return await Session.findByPk(newSession.id, { transaction: t });
            });
        } catch (error) {
            let message = "Technical issues, please try again later.";
            if (error.name === "SequelizeForeignKeyConstraintError") {
                message = error.parent.detail.substring(4, error.parent.detail.lastIndexOf(")") + 1) + " does not exist.";
            }
            throw new WError({
                    name: "CreateSessionFailedError",
                    cause: error,
                    info: {
                        message: message,
                    },
                },
                "Session creation failed!"
            );
        }
    }

    /**
     * Called to retrieve a session by guard id.
     *
     * @param {number} guardId The id of the guard.
     * @returns        The session that matches the provided guard id.
     */
    async getSessionByGuardId(guardId) {
        const validatedGuardId = this.validator.validateId(guardId);
        if (validatedGuardId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedGuardId.error } }, "Guard id validation has failed.");
        }
        try {
            return await Session.findOne({ where: { guardId: validatedGuardId, statusId: 1 } });
        } catch (error) {
            throw new WError({
                    name: "GetSessionFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve the specified session, please try again later.`,
                    },
                },
                "Session retrieval failed."
            );
        }
    }

    /**
     * Called to add a student to a specified session.
     *
     * @param {number} sessionId The id of the session.
     * @param {number} usbId The usb id of the student.
     * @returns        The modified session.
     */
    async addStudentToSession(sessionId, student) {
        const validatedSessionId = this.validator.validateId(sessionId);
        const validatedUsbId = this.validator.validateId(student.usbId);
        const position = student.pos;
        if (validatedSessionId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedSessionId.error } }, "Session id validation has failed.");
        }
        if (validatedUsbId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedUsbId.error } }, "Usb id validation has failed.");
        }
        try {
            return await this.database.transaction(async t => {
                const session = await Session.findOne({ where: { id: validatedSessionId }, transaction: t });
                if (session === null) {
                    throw new WError({ name: "SessionNotFoundError", info: { message: "Add student failed: Session does not exist." } }, "Add student to session failed.");
                }
                await Student.create(new StudentDTO(null, validatedUsbId, validatedSessionId, 1, 1, position), { transaction: t });
                return await Session.findOne({ where: { id: validatedSessionId }, transaction: t });
            });
        } catch (error) {
            let message = "Technical issues, please try again later.";
            if (error.name === "SequelizeUniqueConstraintError") {
                if (error.errors[0].message == "usbId must be unique") {
                    message = `Add student failed: Usb with id: ${validatedUsbId} has been registered by another student`;
                }
            } else if (error.name === "SequelizeForeignKeyConstraintError") {
                message = `Add student failed: ${error.parent.detail.substring(4, error.parent.detail.lastIndexOf(")") + 1)} does not exist.`;
            } else if (error.name === "SessionNotFoundError") {
                message = error.jse_info.message;
            }
            throw new WError({
                    name: "AddStudentToSessionFailedError",
                    cause: error,
                    info: {
                        message,
                    },
                },
                "Adding student to session failed."
            );
        }
    }

    /**
     * Called to delete a student from a session.
     *
     * @param {number} sessionId The id of the session.
     * @param {number} usbId The usb id of the student.
     * @returns        The deleted student.
     */
    async RemoveStudentInSession(sessionId, usbId) {
        const validatedSessionId = this.validator.validateId(sessionId);
        const validatedUsbId = this.validator.validateId(usbId);
        if (validatedSessionId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedSessionId.error } }, "Session id validation has failed.");
        }
        if (validatedUsbId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedUsbId.error } }, "Usb id validation has failed.");
        }
        try {
            return await Student.destroy({ where: { usbId: validatedUsbId, sessionId: validatedSessionId } });
        } catch (error) {
            throw new WError({
                    name: "DeleteStudentFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to delete the specified student from the session, please try again later.`,
                    },
                },
                "Student deletion failed."
            );
        }
    }
}
module.exports = Integration;