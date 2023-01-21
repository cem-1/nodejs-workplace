const express = require("express");
const path = require("path");
const rootDir = require("../helpers/path")
const adminData = require("./admin");

const router = express.Router();


router.get("/user-list", (req,res,next) => {
    const users = adminData.users;
    res.render("user-list",{
        usrs: users,
        pageTitle: "User List", 
        path: "/user-list", 
    })
})

module.exports = router;