const User = require("../models/user");

const findAllUsers = async function(req, res) {
    try {
        let filter = {};
        let result = await User.find(filter).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}