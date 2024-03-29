"use strict";

class StudentDTO {
    /**
     * Creates a new instance.
     *
     * @param {number} id The id of the student. This field is auto-generated and should not be provided.
     * @param {number} usbId The id of the usb stick used by the student.
     * @param {number} sessionId The id of the session in which the student is registered.
     * @param {number} statusId The id of the student's current status.
     * @param {number} ping A random number used for incrementation.
     * @param {number[]} position The seating position taken by the student in a grid [row, column].
     */
    constructor(id, usbId, sessionId, statusId, ping, position) {
        this.id = id;
        this.usbId = usbId;
        this.sessionId = sessionId;
        this.statusId = statusId;
        this.ping = ping;
        this.position = position;
    }
}
module.exports = StudentDTO;