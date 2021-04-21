const express = require("express");
const { StudentCtrl } = require("../controller");
const StudentDTO = require("../model/dto/StudentDTO");
const router = express.Router();
const ValidatorUtil = require("../util/validatorUtil");
const { VError } = require("verror");

/* POST /api/student/connect - Create student. */
router.post("/connect", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedStudent = validator.validateStudent(req.body.student);
    if (!validatedStudent.error) {
        const { firstName, lastName, ssn, usbId, roomId, statusId } = validatedStudent;
        const randomStartingPing = Math.floor(Math.random() * 10000);
        const newStudent = new StudentDTO(null, firstName, lastName, ssn, usbId, roomId, statusId, randomStartingPing);
        connectStudent(newStudent)
            .then(data => res.json(data))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedStudent.error });
    }
});

/* PUT /api/student/:id/ping - Increment ping value. */
router.put("/:id/ping", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    if (!validatedId.error) {
        ping(validatedId)
            .then(data => res.json(data))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedId.error });
    }
});

async function connectStudent(student) {
    return await StudentCtrl.connectStudent(student);
}

async function ping(id) {
    return await StudentCtrl.ping(id);
}

module.exports = router;