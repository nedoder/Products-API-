const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 64
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 35,
        unique: true
    },
    role: {
        type: Boolean,
        required: true
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }]
}, { timestamps: true })


module.exports = mongoose.model("User", User);