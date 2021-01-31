require("dotenv").config();
const express = require("express");
const { json, urlencoded } = require("body-parser");
const users = require("./controllers/users");
const products = require("./controllers/products");
const auth = require("./controllers/auth")
const connect = require("./helper").connect;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

//route for creating new product
app.post("/product", auth.verifyToken, products.createProduct);

//route for getting product by product name
app.get("/product/:name", auth.verifyToken, products.findProductByName);
//route for updating product by product name
app.put("/product/:name", auth.verifyToken, products.updateProductByName);
//route for deleting product by product name
app.delete("/product/:name", auth.verifyToken, products.deleteProductByName);

//route for getting all products
app.get("/products", auth.verifyToken, products.findAllProducts);

//route for creating new user
app.post("/user", users.createUser);

//route for getting user by username
app.get("/user/:username", auth.verifyToken, users.findUserByUsername);
//route for updating user by username
app.put("/user/:username", auth.verifyToken, users.updateUserByUsername);
//route for deleting user by username
app.delete("/user/:username", auth.verifyToken, users.deleteUserByUsername);


//route for getting all users
app.get("/users", auth.verifyToken, users.findAllUsers);

//route for getting product by id
app.get("/product_id/:id", auth.verifyToken, products.findProductById);
//route for updating product by id
app.put("/product_id/:id", auth.verifyToken, products.updateProductById);
//route for deleting product by id
app.delete("/product_id/:id", auth.verifyToken, products.deleteProductById);

//route for decrementing quantity of product chosen by id
app.put("/product_dec/:id", auth.verifyToken, products.decrementQuantity);
//route for incrementing quantity of product chosen by id
app.put("/product_inc/:id", auth.verifyToken, products.incrementQuantity);
//route for getting quantity of product chosen by id
app.get("/product_num/:id", auth.verifyToken, products.productQuantity);

app.get("/user");
app.put("/user");
app.delete("/user");

//route for logging user
app.get("/login", auth.generateToken);


connect("mongodb://localhost:27017/homework-api")
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server started.");
        })
    })
    .catch(err => console.log(err));