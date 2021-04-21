"use strict";

const Integration = require("../integration/integration");

class StudentController {
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
     * Called to ping the server and increment the ping value of the specified Student entity.
     *
     * @param {number} id The id of the Student entity to modify.
     * @returns        The updated Student entity.
     */
    ping(id) {
        return this.integration.ping(id);
    }
}
module.exports = StudentController;