const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        index: { unique: true }
    },
    description: {
        type: String,
        minlength: 10,
        maxlength: 150
    },
    image: {
        type: String,
        default: "./public/default_image.svg"
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 10000
    },
    quantity: {
        type: Number,
        min: 1,
        max: 10,
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })


module.exports = mongoose.model("Product", Product);