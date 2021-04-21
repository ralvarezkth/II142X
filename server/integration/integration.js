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
        this.interval = this.setRandomInterval(async() => this.randomizePing(), this.minIntervalMinutes * 600, this.maxIntervalMinutes * 600);
    }

    initModels() {
        Student.createModel(this.database);
        UsbClient.createModel(this.database);
        Guard.createModel(this.database);
        Room.createModel(this.database);
        Status.createModel(this.database);
        Ping.createModel(this.database);
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
     * Called to stop the automatic randomization of ping values.
     */
    stopRandomizer() {
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
     * Called to retrive a list of students registered at the specified room.
     *
     * @param {number} id The id of the room from which to retrieve students.
     * @returns A list of students registered at the specified room.
     */
    async getStudentsByRoomId(roomId) {
        const validatedRoomId = this.validator.validateId(roomId);
        if (validatedRoomId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedRoomId.error } }, "Id validation has failed.");
        }
        try {
            return await Student.findAll({ where: { roomId: validatedRoomId } });
        } catch (error) {
            throw new WError({
                    name: "GetStudentsInRoomFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to retrieve a list of students, please try again later.`,
                    },
                },
                "Retrieval of students within specified room failed."
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
    async setStudentStatusById(statusId, id) {
        const validatedStatusId = this.validator.validateId(statusId);
        const validatedId = this.validator.validateId(id);
        if (validatedStatusId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedStatusId.error } }, "Status id validation has failed.");
        }
        if (validatedId.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedId.error } }, "Id validation has failed.");
        }
        try {
            return await this.database.transaction(async t => {
                await Student.update({ validatedStatusId }, { where: { id: validatedId }, transaction: t });
                return await Student.findOne({ where: { id: validatedId }, transaction: t });
            });
        } catch (error) {
            throw new WError({
                    name: "StudentStatusChangeFailedError",
                    cause: error,
                    info: {
                        message: `An error occured when attempting to change the status, please try again later.`,
                    },
                },
                "Student status change failed."
            );
        }
    }

    /**
     * Called to connect a student by creating a Student entity.
     * The Student is created with a connection to a specific room and usbId.
     *
     * @param {StudentDTO} student A StudentDTO containing the necessary information for creation.
     * @returns            The created Student entity.
     */
    async connectStudent(student) {
        const validatedStudent = this.validator.validateStudent(student);
        if (validatedStudent.error) {
            throw new WError({ name: "DataValidationError", info: { message: validatedStudent.error } }, "Student data validation has failed.");
        }
        try {
            return await Student.create(validatedStudent);
        } catch (error) {
            let message = "Technical issues, please try again later.";
            if (error.name === "SequelizeUniqueConstraintError") {
                if (error.errors[0].message == "ssn must be unique") {
                    message = "Student with provided ssn already exists";
                } else if (error.errors[0].message == "usbId must be unique") {
                    message = `Usb with id: ${validatedStudent.usbId} has been registered by another student`;
                }
            } else if (error.name === "SequelizeForeignKeyConstraintError") {
                message = error.parent.detail.substring(4, error.parent.detail.lastIndexOf(")") + 1) + " does not exist.";
            }

            throw new WError({
                    name: "ConnectStudentFailedError",
                    cause: error,
                    info: {
                        message: message,
                    },
                },
                "Connection failed!"
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
}
module.exports = Integration;