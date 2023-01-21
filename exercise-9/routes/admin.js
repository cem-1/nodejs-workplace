const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path");

const users = [];

const router = express.Router();


router.get("/add-user", (req,res,next)=>{
    res.redirect("/thankyou");
})

router.get("/thankyou", (req,res,next)=>{
    res.render("thankyou",{path:"/thankyou",pageTitle:"Thank You"});
})

router.post("/add-user", (req,res,next)=>{
    console.log(req.body);
    users.push({name: req.body.name, surname: req.body.surname, email: req.body.email});
    res.redirect("/thankyou");
})

exports.routes = router;
exports.users = users;