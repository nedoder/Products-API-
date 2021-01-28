const User = require("../models/user");


const createUser = async function(req, res) {
    try {
        const userCreate = req.body;
        const userNew = await User.create(userCreate);
        res.status(201).json(userNew.toJSON())
    } catch (err) {
        res.json(err);
    }

};

const findUserByUsername = async function(req, res) {
    try {
        const userName = req.params.username;
        const user = await User.find({ username: userName });
        res.status(200).json(user);
    } catch (err) {
        res.json(err);
    }
};



const findAllUsers = async function(req, res) {
    try {
        let result = await User.find({}).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

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