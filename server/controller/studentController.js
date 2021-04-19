"use strict";

const Integration = require("../integration/integration");

class StudentController {
    constructor() {
        this.integration = new Integration();
    }

    connectStudent(student) {
        return this.integration.connectStudent(student);
    }

    ping(id) {
        return this.integration.ping(id);
    }
}
module.exports = StudentController;