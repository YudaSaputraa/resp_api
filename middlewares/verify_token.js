const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const autHeader = req.headers['authorization'];
    if (!autHeader) {
        return res.status(401).json({
            status: "error",
            message: "token required!",
        });

    }
    const token = autHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({
            status: "error",
            message: "invalid or expired token"
        });
    }
}

module.exports = verifyToken;