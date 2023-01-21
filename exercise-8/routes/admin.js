const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path")

const products = [];

const router = express.Router();

router.get("/add-product", (req, res, next)=>{
    console.log("GET /add-product triggered.");
    res.render("add-product",{pageTitle: "Add Product", path:"/admin/add-product", activeAddProduct: true});
});

router.post("/add-product", (req,res,next)=>{
    console.log("POST /add-product triggered.")
    products.push({title: req.body.title});
    res.redirect('/');
})

exports.routes = router;
exports.products = products;