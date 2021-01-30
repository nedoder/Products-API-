require("dotenv").config()
const express = require("express");
const { json, urlencoded } = require("body-parser");
const users = require("./controllers/users");
const products = require("./controllers/products");
const connect = require("./helper").connect;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.post("/product", products.createProduct);

app.get("/product/:name", products.findProductByName);
app.put("/product/:name", products.updateProductByName);
app.delete("/product/:name", products.deleteProductByName);

app.get("/products", products.findAllProducts);

app.post("/user", users.createUser);

app.get("/user/:username", users.findUserByUsername);
app.put("/user/:username", users.updateUserByUsername);
app.delete("/user/:username", users.deleteUserByUsername);

app.get("/users", users.findAllUsers);

app.get("/product_id/:id", products.findProductById);
app.put("/product_id/:id", products.updateProductById);
app.delete("/product_id/:id", products.deleteProductById);

app.put("/product_dec/:id", products.decrementQuantity);
app.put("/product_inc/:id", products.incrementQuantity);
app.get("/product_num/:id", products.productQuantity);

app.get("/user");
app.put("/user");
app.delete("/user");

app.get("/login");


connect("mongodb://localhost:27017/homework-api")
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server started.");
        })
    })
    .catch(err => console.log(err));