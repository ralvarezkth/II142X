const express = require("express");
const { GuardCtrl } = require("../controller");
const router = express.Router();

/* PUT /api/guard/students/:id/status - Set status of specified student. */
router.put("/students/:id/status/:statusId", function(req, res) {
    const id = req.params.id;
    const statusId = req.params.statusId;
    setStudentStatusById(statusId, id)
        .then(status => res.json(status))
        .catch(error => {
            res.status(500).json({ error });
        });
});

/* GET /api/guard/students/:id - Get specified student. */
router.get("/students/:id", function(req, res) {
    const id = req.params.id;
    getStudentById(id)
        .then(student => res.json(student))
        .catch(error => {
            res.status(500).json({ error });
        });
});

/* GET /api/guard/students - Get all active students. */
router.get("/students", function(req, res) {
    getStudents()
        .then(students => res.json(students))
        .catch(error => {
            res.status(500).json({ error });
        });
});

/* GET /api/guard/rooms/:id/students - Get all students in specified room. */
router.get("/rooms/:id/students", function(req, res) {
    const id = req.params.id;
    getStudentsByRoomId(id)
        .then(students => res.json(students))
        .catch(error => {
            res.status(500).json({ error });
        });
});

/* GET /api/guard/rooms - Get all rooms. */
router.get("/rooms", function(req, res) {
    getRooms()
        .then(rooms => res.json(rooms))
        .catch(error => {
            res.status(500).json({ error });
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
module.exports = router;