const mongoose = require("mongoose");

const Product = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must enter name of the product"],
        minlength: [3, "Name must be at least 3 characters long"],
        maxlength: [15, "Name cannot be longer than 15 characters"],
        index: { unique: true }
    },
    description: {
        type: String,
        minlength: [10, "Description must be at least 10 characters long"],
        maxlength: [150, "Description cannot be longer than 150 characters"]
    },
    image: {
        type: String,
        default: "./public/default_image.svg"
    },
    price: {
        type: Number,
        required: [true, "You must enter price of the product"],
        min: [1, "Price cannot be less than 1"],
        max: [10000, "Price cannot be bigger than 10000"]
    },
    quantity: {
        type: Number,
        min: [1, "Quantity cannot be less than 1"],
        max: [10, "Quantity cannot be more than 10"],
        default: 1
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "You must be logged in to add new product"],
        ref: "User"
    }
}, { timestamps: true })


module.exports = mongoose.model("Product", Product);