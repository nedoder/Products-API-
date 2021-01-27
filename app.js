require("dotenv").config()
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const users = require("./controllers/users");
const products = require("./controllers/products");



app.post("/product");

app.get("/product/:name");
app.put("/product/:name");
app.delete("/product/:name");

app.get("/products");

app.post("/user");

app.get("/user/:username");
app.put("/user/:username");
app.delete("/user/:username");

app.get("/users");

app.get("/product_id/:id");
app.put("/product_id/:id");
app.delete("/product_id/:id");

app.put("/product_dec/:id");
app.put("/product_inc/:id");
app.get("/product_num/:id");





app.get("/user");
app.put("/user");
app.delete("/user");



app.get("/login");



mongoose.connect("mongodb://localhost:27017/homework-api")
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log("Server started.");
        })
    })
    .catch(err => console.log(err));