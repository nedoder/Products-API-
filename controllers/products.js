const Product = require("../models/product");

const createProduct = async function(req, res) {
    try {
        const productCreate = req.body;
        const productNew = await Product.create(productCreate);
        res.status(201).json(productNew.toJSON())
    } catch (err) {
        res.json(err);
    }

};

const findProductByName = async function(req, res) {
    try {
        const productName = req.params.name;
        const product = await Product.find({ name: productName });
        res.status(200).json(product);
    } catch (err) {
        res.json(err);
    }
};

const findAllProducts = async function(req, res) {
    try {
        let result = await Product.find({}).exec();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateProductByName = async function(req, res) {
    try {
        const productName = { name: req.params.name };
        const update = { description: req.body.description, image: req.body.image, price: req.body.price, quantity: req.body.quantity, user: req.body.user };
        const product = await Product.findOneAndUpdate(productName, update, { new: true });
        res.status(200).json(product);
    } catch (err) {
        res.json(err);
    }
};

const deleteProductByName = async function(req, res) {
    try {
        const productName = req.params.name;
        const product = await Product.deleteOne({ name: productName });
        if (product.deletedCount != 0) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ "error": "No product with that name to delete!" });
        }
    } catch (err) {
        res.json(err);
    }
};

const findProductById = async function(req, res) {
    try {
        const productId = req.params.id;
        const result = await Product.findById(productId).exec();
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "error": "No product with that ID!" });
        }
    } catch (err) {
        res.json(err);
    }

};

const updateProductById = async function(req, res) {
    try {
        const productID = { _id: req.params.id };
        const update = { description: req.body.description, image: req.body.image, price: req.body.price, quantity: req.body.quantity, user: req.body.user };
        const result = await Product.findOneAndUpdate(productID, update, { new: true });
        res.status(200).json(result);
    } catch (err) {
        res.json(err);
    }
};

const deleteProductById = async function(req, res) {
    try {
        const productID = req.params.id;
        const product = await Product.deleteOne({ _id: productID });
        if (product.deletedCount != 0) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ "error": "No product with that ID to delete!" });
        }
    } catch (err) {
        res.json(err);
    }
};

const decrementQuantity = async function(req, res) {
    try {
        const productID = { _id: req.params.id };
        const result = await Product.findOneAndUpdate(productID, { $inc: { 'quantity': -1 } }, { new: true }).exec();
        if (req.params.id) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "error": "No product with that ID to decrement quantity of!" });
        }
    } catch (err) {
        res.json(err);
    }
};

const incrementQuantity = async function(req, res) {
    try {
        const productID = { _id: req.params.id };
        const result = await Product.findOneAndUpdate(productID, { $inc: { 'quantity': 1 } }, { new: true }).exec();
        if (req.params.id) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "error": "No product with that ID to increment quantity of!" });
        }
    } catch (err) {
        res.json(err);
    }
};

const productQuantity = async function(req, res) {
    try {
        const productID = { _id: req.params.id };
        const result = await Product.findOne(productID).select("quantity");
        if (req.params.id) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ "error": "No product with that ID to show quantity of!" });
        }
    } catch (err) {
        res.json(err);
    }
};


module.exports = { createProduct, findProductByName, findAllProducts, updateProductByName, deleteProductByName, findProductById, updateProductById, deleteProductById, decrementQuantity, incrementQuantity, productQuantity };