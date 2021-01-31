const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

//checking if user exists in database and generating token
async function generateToken(req, res) {
    try {
        const user = {
            username: req.body["username"],
            password: crypto.createHash('sha256').update(req.body["password"]).digest('hex')
        }
        const result = await User.findOne({ username: user.username, password: user.password });
        if (result) {
            jwt.sign({ user }, "lalal", { expiresIn: "1h" }, (err, token) => {
                res.json({ token });
            });
        } else {
            res.status(401).json("Wrong username or password");
        }
    } catch (err) {
        res.status(401).json("Authentication failed");
    }
}

//verify token
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403).json({ "error": "Authentication failed!" });;
    }

}

module.exports = {
    verifyToken,
    generateToken
}