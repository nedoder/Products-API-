require("dotenv").config()
const express = require("express");
const { json, urlencoded } = require("body-parser");
const users = require("./controllers/users");
const products = require("./controllers/products");
const connect = require("./helper").connect;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

//route for creating new product
app.post("/product", products.createProduct);

//route for getting product by product name
app.get("/product/:name", products.findProductByName);
//route for updating product by product name
app.put("/product/:name", products.updateProductByName);
//route for deleting product by product name
app.delete("/product/:name", products.deleteProductByName);

//route for getting all products
app.get("/products", products.findAllProducts);

//route for creating new user
app.post("/user", users.createUser);

//route for getting user by username
app.get("/user/:username", users.findUserByUsername);
//route for updating user by username
app.put("/user/:username", users.updateUserByUsername);
//route for deleting user by username
app.delete("/user/:username", users.deleteUserByUsername);


//route for getting all users
app.get("/users", users.findAllUsers);

//route for getting product by id
app.get("/product_id/:id", products.findProductById);
//route for updating product by id
app.put("/product_id/:id", products.updateProductById);
//route for deleting product by id
app.delete("/product_id/:id", products.deleteProductById);

//route for decrementing quantity of product chosen by id
app.put("/product_dec/:id", products.decrementQuantity);
//route for incrementing quantity of product chosen by id
app.put("/product_inc/:id", products.incrementQuantity);
//route for getting quantity of product chosen by id
app.get("/product_num/:id", products.productQuantity);

app.get("/user");
app.put("/user");
app.delete("/user");

//route for logging user
app.get("/login");


connect("mongodb://localhost:27017/homework-api")
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server started.");
        })
    })
    .catch(err => console.log(err));