const { VError } = require("verror");
const jwt = require("jsonwebtoken");

/**
 * Called to verify JSON Web Tokens.
 *
 * @param req The HTTP request argument.
 * @param res The HTTP response argument.
 * @param next The callback argument, passes control to next handler when called.
 */
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        try {
            jwt.verify(bearerHeader.split(" ")[1], "secretkey", (error, authData) => {
                if (error) {
                    res.status(401).json({ error: "Not authenticated" });
                } else {
                    next();
                }
            });
        } catch (error) {
            res.status(500).json({ error: VError.info(err).message });
        }
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = { verifyToken };