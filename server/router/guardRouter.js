const express = require("express");
const { GuardCtrl } = require("../controller");
const router = express.Router();
const ValidatorUtil = require("../util/validatorUtil");
const StudentDTO = require("../model/dto/StudentDTO");
const VError = require("verror");

/* PUT /api/guard/students/:id/status - Set status of specified student. */
router.put("/students/:id/status/:statusId", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    const validatedStatusId = validator.validateId(parseInt(req.params.statusId));
    if (!validatedId.error && !validatedStatusId.error) {
        setStudentStatusById(validatedStatusId, validatedId)
            .then(status => res.json(status))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else if (validatedId.error) {
        res.status(400).json({ error: validatedId.error });
    } else if (validatedStatusId.error) {
        res.status(400).json({ error: validatedStatusId.error });
    }
});

/* GET /api/guard/students/:id - Get specified student. */
router.get("/students/:id", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    if (!validatedId.error) {
        getStudentById(validatedId)
            .then(student => res.json(student))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedId.error });
    }
});

/* GET /api/guard/students - Get all registered students. */
router.get("/students", function(req, res) {
    getStudents()
        .then(students => res.json(students))
        .catch(error => {
            res.status(500).json({ error: VError.info(error).message });
        });
});

/* GET /api/guard/rooms/:id/students - Get all students in specified room. */
router.get("/rooms/:id/students", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    if (!validatedId.error) {
        getStudentsByRoomId(validatedId)
            .then(students => res.json(students))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedId.error });
    }
});

/* GET /api/guard/rooms/:id - Get specified room. */
router.get("/rooms/:id", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedRoomId = validator.validateId(parseInt(req.params.id));
    if (!validatedRoomId.error) {
        getRoomById(validatedRoomId)
            .then(room => res.json(room))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedRoomId.error });
    }
});

/* PUT /api/guard/rooms/:id/grid - Set the seating grid in the specified room. */
router.put("/rooms/:id/grid", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedRoomId = validator.validateId(parseInt(req.params.id));
    const validatedGrid = validator.validateGrid(req.body.grid);
    if (!validatedRoomId.error && !validatedGrid.error) {
        setRoomGridById(validatedRoomId, validatedGrid)
            .then(room => res.json(room))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else if (validatedRoomId.error) {
        res.status(400).json({ error: validatedRoomId.error });
    } else if (validatedGrid.error) {
        res.status(400).json({ error: validatedGrid.error });
    }
});

/* GET /api/guard/rooms - Get all rooms. */
router.get("/rooms", function(req, res) {
    getRooms()
        .then(rooms => res.json(rooms))
        .catch(error => {
            res.status(500).json({ error: VError.info(error).message });
        });
});

/* POST /api/guard/student/connect - Create student. */
router.post("/connect", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedStudent = validator.validateStudent(req.body.student);
    if (!validatedStudent.error) {
        const { usbId, roomId, statusId } = validatedStudent;
        const newStudent = new StudentDTO(null, usbId, roomId, statusId, 1);
        connectStudent(newStudent)
            .then(data => res.json(data))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedStudent.error });
    }
});

/* GET /api/guard/ping - Get current randomized ping value. */
router.get("/ping", function(req, res) {
    getPing()
        .then(ping => res.json(ping))
        .catch(error => {
            res.status(500).json({ error: VError.info(error).message });
        });
});

async function getStudents() {
    return await GuardCtrl.getStudents();
}

async function getStudentById(id) {
    return await GuardCtrl.getStudentById(id);
}

async function setStudentStatusById(statusId, id) {
    return await GuardCtrl.setStudentStatusById(statusId, id);
}

async function getRooms() {
    return await GuardCtrl.getRooms();
}

async function getStudentsByRoomId(id) {
    return await GuardCtrl.getStudentsByRoomId(id);
}

async function connectStudent(student) {
    return await GuardCtrl.connectStudent(student);
}

async function getPing() {
    return await GuardCtrl.getPing();
}

async function getRoomById(roomId) {
    return await GuardCtrl.getRoomById(roomId);
}

async function setRoomGridById(roomId, grid) {
    return await GuardCtrl.setRoomGridById(roomId, grid);
}
module.exports = router;