const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path")

const router = express.Router();

router.get("/add-product", (req, res, next)=>{
    console.log("Another in the middleware :)")
    res.sendFile(path.join(rootDir, "views" , "add-product.html"))
});

router.post("/add-product", (req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
})

module.exports = router;