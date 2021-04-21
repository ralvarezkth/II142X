const express = require("express");
const { StudentCtrl } = require("../controller");
const router = express.Router();
const ValidatorUtil = require("../util/validatorUtil");
const { VError } = require("verror");

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

async function ping(id) {
    return await StudentCtrl.ping(id);
}

module.exports = router;