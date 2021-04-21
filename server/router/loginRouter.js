var express = require("express");
const VError = require("verror");
const { GuardCtrl } = require("../controller");
var router = express.Router();
const jwt = require("jsonwebtoken");
const ValidatorUtil = require("../util/validatorUtil");

/* GET /api/login - Login with specified credentials. */
router.get("/", function(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;

    const validator = new ValidatorUtil();
    const validatedUsername = validator.validateUserLogin(username, password);
    if (!validatedUsername.error) {
        getUser(validatedUsername, password)
            .then(user => {
                if (user) {
                    jwt.sign({ id: user.id }, "secretkey", (err, token) => {
                        if (!err) {
                            res.json({ user, token });
                        }
                    });
                } else {
                    res.status(401).json({ error: VError.info(err).message });
                }
            })
            .catch(err => {
                res.status(500).json({ error: VError.info(err).message });
            });
    } else {
        res.status(400).json({ error: validatedUsername.error });
    }
});

async function getUser(username, password) {
    return await GuardCtrl.getUser(username, password);
}

module.exports = router;