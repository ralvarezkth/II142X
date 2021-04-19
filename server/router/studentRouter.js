const express = require("express");
const { StudentCtrl } = require("../controller");
const StudentDTO = require("../model/dto/StudentDTO");
const router = express.Router();

/* POST /api/student/connect - Create student. */
router.post("/connect", function(req, res) {
    console.log(req.body.student);
    const { firstName, lastName, ssn, usbId, roomId, statusId } = req.body.student;
    // validation
    const studentDTO = new StudentDTO(null, firstName, lastName, ssn, usbId, roomId, statusId, 1);
    connectStudent(studentDTO)
        .then(data => res.json(data))
        .catch(error => {
            res.status(500).json({ error });
        });
});

/* PUT /api/student/:id/ping - Increment ping value. */
router.put("/:id/ping", function(req, res) {
    const id = req.params.id;
    ping(id)
        .then(data => res.json(data))
        .catch(error => {
            res.status(500).json({ error });
        });
});

async function connectStudent(student) {
    return await StudentCtrl.connectStudent(student);
}

async function ping(id) {
    return await StudentCtrl.ping(id);
}

module.exports = router;