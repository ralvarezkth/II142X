"use strict";

const Integration = require("../integration/integration");

class GuardController {
    constructor() {
        this.integration = new Integration();
    }

    getRooms() {
        return this.integration.getRooms();
    }

    getStudents() {
        return this.integration.getStudents();
    }

    getStudentById(id) {
        return this.integration.getStudentById(id);
    }

    getStudentsByRoomId(id) {
        return this.integration.getStudentsByRoomId(id);
    }

    setStudentStatusById(statusId, id) {
        return this.integration.setStudentStatusById(statusId, id);
    }
}
module.exports = GuardController;