const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You must enter username"],
        minlength: [3, "Username must me at least 3 characters long"],
        maxlength: [20, "Username cannot be longer than 20 characters"],
        index: { unique: true }
    },
    password: {
        type: String,
        required: [true, "You must enter password"],
        minlength: [5, "Password must me at least 5 characters long"],
        maxlength: [64, "Username cannot be longer than 25 characters"]
    },
    email: {
        type: String,
        required: [true, "You must enter email"],
        minlength: [5, "Email must me at least 5 characters long"],
        maxlength: [35, "Email cannot be longer than 35 characters"],
        unique: true
    },
    role: {
        type: Boolean,
        required: [true, "You must enter a role"]
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}, { timestamps: true })


module.exports = mongoose.model("User", User);