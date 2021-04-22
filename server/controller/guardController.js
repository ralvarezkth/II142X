"use strict";

const Integration = require("../integration/integration");

class GuardController {
    /**
     * Creates a new instance of this class and attaches a new Integration instance.
     * Upon creation the Integration instance attempts to connect to the database.
     *
     * @throws Throws an exception if unable to connect to the database.
     */
    constructor() {
        this.integration = new Integration();
    }

    /**
     * Called to retrieve all registered rooms.
     *
     * @returns A list of all registered rooms.
     */
    getRooms() {
        return this.integration.getRooms();
    }

    /**
     * Called to retrieve all registered students.
     *
     * @returns A list of all registered students.
     */
    getStudents() {
        return this.integration.getStudents();
    }

    /**
     * Called to retrieve a student by its id.
     *
     * @param {number} id The id of the student.
     * @returns        The student that matches the provided id.
     */
    getStudentById(id) {
        return this.integration.getStudentById(id);
    }

    /**
     * Called to retrive a list of students registered at the specified room.
     *
     * @param {number} id The id of the room from which to retrieve students.
     * @returns        A list of students registered at the specified room.
     */
    getStudentsByRoomId(id) {
        return this.integration.getStudentsByRoomId(id);
    }

    /**
     * Called to change the status of a student entity to the provided status id.
     *
     * @param {number} statusId The statusId to change to.
     * @param {number} id The id of the student entity to modify.
     * @returns        The updated Student entity.
     * @throws         Throws an exception if unable to update the Student or if data validation fails.
     */
    setStudentStatusById(statusId, id) {
        return this.integration.setStudentStatusById(statusId, id);
    }

    /**
     * Retrieves a user as a Guard entity from the database by username and compares
     * its password with the provided password. The parameters are validated and sanitized
     * before use.
     *
     * @param {string} username The username to find in the database.
     * @param {string} password The password to compare with
     * @returns        The found guard entity.
     * @throws         Throws an exception if unable to retrieve Guard or if the provided password is incorrect.
     */
    getUser(username, password) {
        return this.integration.getUser(username, password);
    }

    /**
     * Called to connect a student to a specific room and usb stick.
     *
     * @param {StudentDTO} student A StudentDTO containing information about the connecting student.
     * @returns            The connected Student entity.
     */
    connectStudent(student) {
        return this.integration.connectStudent(student);
    }

    /**
     * Called to retrieve the current randomized ping value.
     *
     * @returns Ping entity containing the current randomized ping value.
     */
    getPing() {
        return this.integration.getPing();
    }

    /**
     * Called to retrieve a room entity by roomId.
     *
     * @param {number} roomId The id of the room to be retrieved.
     * @returns        The room that matches the provided roomId.
     */
    getRoomById(roomId) {
        return this.integration.getRoomById(roomId);
    }

    /**
     * Called to set the seating grid of a room entity.
     *
     * @param {number} roomId The id of the room to be modified.
     * @param {number[]} grid The new grid to be set.
     * @returns               The updated room entity.
     */
    setRoomGridById(roomId, grid) {
        return this.integration.setRoomGridById(roomId, grid);
    }
}
module.exports = GuardController;