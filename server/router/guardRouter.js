const express = require("express");
const { GuardCtrl } = require("../controller");
const router = express.Router();
const ValidatorUtil = require("../util/validatorUtil");
const VError = require("verror");

/* PUT /api/guard/students/:id/status - Set status of specified student. */
router.put("/students/:id/status/:statusId", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    const validatedStatusId = validator.validateId(parseInt(req.params.statusId));
    if (!validatedId.error && !validatedStatusId.error) {
        setStudentStatusById(validatedStatusId, validatedId)
            .then(updatedStudent => res.json(updatedStudent))
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

/* GET /api/guard/sessions/:id/students - Get all active students in specified session. */
router.get("/sessions/:id/students/active", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    if (!validatedId.error) {
        getActiveStudentsBySessionId(validatedId)
            .then(students => res.json(students))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedId.error });
    }
});

/* GET /api/guard/sessions/:id/students - Get all students in specified session. */
router.get("/sessions/:id/students", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedId = validator.validateId(parseInt(req.params.id));
    if (!validatedId.error) {
        getStudentsBySessionId(validatedId)
            .then(students => res.json(students))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedId.error });
    }
});

/* DELETE /api/guard/sessions/students - Delete student in specified session. */
router.delete("/sessions/:id/students/:usbId", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedSessionId = validator.validateId(parseInt(req.params.id));
    const validatedUsbId = validator.validateId(parseInt(req.params.usbId));
    if (!validatedSessionId.error && !validatedUsbId.error) {
        deleteStudentsBySessionIdAndUsbId(validatedSessionId, validatedUsbId)
            .then(deletedRows => res.json(deletedRows))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else if (validatedSessionId.error) {
        res.status(400).json({ error: validatedSessionId.error });
    } else if (validatedUsbId.error) {
        res.status(400).json({ error: validatedUsbId.error });
    }
});

/* POST /api/guard/sessions/:id/students - Add student to specified session. */
/* request body example:
        {
            "student": {
                "usbId": 3,
                "pos": [1,0]
            }
        }
*/
router.post("/sessions/:id/students", function(req, res) {
    // FIXME: validations
    const validator = new ValidatorUtil();
    const validatedSessionId = validator.validateId(parseInt(req.params.id));
    const student = req.body.student;
    const validatedUsbId = validator.validateId(student.usbId);
    if (!validatedSessionId.error && !validatedUsbId.error) {
        addStudentToSession(validatedSessionId, student)
            .then(session => res.json(session))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else if (validatedSessionId.error) {
        res.status(400).json({ error: validatedSessionId.error });
    } else if (validatedUsbId.error) {
        res.status(400).json({ error: validatedUsbId.error });
    }
});

/* POST /api/guard/:id/session - Create new session. */
/* request body example:
        {
            "session": {
                "grid": {
                    "rows": 2,
                    "cols": 2
                },
                "students": [
                    {"usbId": 4, "pos": [0,0]},
                    {"usbId": 5, "pos": [0,1]},
                    {"usbId": 6, "pos": [1,0]}
                ]
            }
        }
*/
router.post("/:id/session", function(req, res) {
    // FIXME: validation
    const validator = new ValidatorUtil();
    const validatedGuardId = validator.validateId(parseInt(req.params.id));
    const session = req.body.session;
    const grid = [session.grid.rows, session.grid.cols];
    const students = session.students;
    if (!validatedGuardId.error) {
        createSession(validatedGuardId, grid, students)
            .then(createdSession => res.json(createdSession))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedGuardId.error });
    }
});

/* GET /api/guard/:id/session - Get session by guard id. */
router.get("/:id/session", function(req, res) {
    const validator = new ValidatorUtil();
    const validatedGuardId = validator.validateId(parseInt(req.params.id));
    if (!validatedGuardId.error) {
        getSessionByGuardId(validatedGuardId)
            .then(session => res.json(session))
            .catch(error => {
                res.status(500).json({ error: VError.info(error).message });
            });
    } else {
        res.status(400).json({ error: validatedGuardId.error });
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

async function getActiveStudentsBySessionId(id) {
    return await GuardCtrl.getActiveStudentsBySessionId(id);
}

async function getStudentsBySessionId(id) {
    return await GuardCtrl.getStudentsBySessionId(id);
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

async function createSession(guardId, grid, students) {
    return await GuardCtrl.createSession(guardId, grid, students);
}

async function getSessionByGuardId(guardId) {
    return await GuardCtrl.getSessionByGuardId(guardId);
}

async function addStudentToSession(sessionId, student) {
    return await GuardCtrl.addStudentToSession(sessionId, student);
}

async function deleteStudentsBySessionIdAndUsbId(sessionId, usbId) {
    return await GuardCtrl.deleteStudentsBySessionIdAndUsbId(sessionId, usbId);
}

module.exports = router;