const Product = require("../models/product");

const findAllProducts = async function(req, res) {
    try {
        let filter = {};
        let result = await Product.find(filter).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
}