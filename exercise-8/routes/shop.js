const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path")

const router = express.Router();

const adminData = require("./admin");

router.get("/", (req, res, next)=>{
    console.log("GET /shop triggered.");
    const products = adminData.products;
    res.render("shop", {
        prods: products, 
        pageTitle: "Shop", 
        path: "/", 
        hasProducts: products.length!=0,
        activeShop: true,
    });
});

module.exports =router;