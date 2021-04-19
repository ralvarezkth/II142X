"use strict";

class StudentDTO {
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