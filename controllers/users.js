const crypto = require("crypto");
const User = require("../models/user");

//creating user, validating password and hashing it if validated, checking if username and email is unique
const createUser = async function(req, res) {
    try {
        const userCreate = req.body;
        const password = req.body["password"];
        const validatePassword = (password) => {
            const reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
            return reg.test(password);
        };
        if (validatePassword(password)) {
            req.body["password"] = crypto.createHash('sha256').update(req.body["password"]).digest('hex');
            let user = await User.findOne({ username: req.body["username"] });
            if (user) return res.status(400).send("Username already exists! Choose another one.");
            let email = await User.findOne({ email: req.body["email"] });
            if (email) return res.status(400).send("Email already exists! Choose another one.");
            const userNew = await User.create(userCreate);
            res.status(201).json(userNew.toJSON());
        } else {
            res.status(500).json("Password must have one capital letter, one small letter and a digit");
        }
    } catch (err) {
        res.json(err);
    }

};

//finding user by username
const findUserByUsername = async function(req, res) {
    try {
        const userName = req.params.username;
        const user = await User.find({ username: userName });
        res.status(200).json(user);
    } catch (err) {
        res.json(err);
    }
};

//finding all users
const findAllUsers = async function(req, res) {
    try {
        let result = await User.find({}).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

//updating user by username
const updateUserByUsername = async function(req, res) {
    try {
        const userName = { username: req.params.username };
        const update = { password: req.body.password, email: req.body.email, role: req.body.role, products: req.body.products };
        const user = await User.findOneAndUpdate(userName, update, { new: true });
        res.status(200).json(user);
    } catch (err) {
        res.json(err);
    }
};

//deleting user by username
const deleteUserByUsername = async function(req, res) {
    try {
        const userName = req.params.username;
        const user = await User.deleteOne({ username: userName });
        if (user.deletedCount != 0) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ "error": "No user with that username to delete!" });
        }
    } catch (err) {
        res.json(err);
    }
};

module.exports = { createUser, findUserByUsername, findAllUsers, updateUserByUsername, deleteUserByUsername };