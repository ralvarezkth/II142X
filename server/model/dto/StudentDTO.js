"use strict";

class StudentDTO {
    /**
     * Creates a new instance.
     *
     * @param {number} id The id of the student. This field is auto-generated and should not be provided.
     * @param {string} firstName The first name of the student.
     * @param {string} lastName The last name of the student.
     * @param {string} ssn The social security number of the student.
     * @param {number} usbId The id of the usb stick used by the student.
     * @param {number} roomId The id of the room in which the student is sitting.
     * @param {number} statusId The id of the student's current status.
     * @param {number} ping A random number used for incrementation.
     */
    constructor(id, firstName, lastName, ssn, usbId, roomId, statusId, ping) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.ssn = ssn;
        this.usbId = usbId;
        this.roomId = roomId;
        this.statusId = statusId;
        this.ping = ping;
    }
}
module.exports = StudentDTO;