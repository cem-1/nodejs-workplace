const express = require("express");
const bodyParser = require("body-parser");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");

const app = express();

app.set("view engine","ejs");
app.set("views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use("/admin",adminData.routes);
app.use(shopRoutes);

app.use((req,res,next) => {
    console.log("GET error page triggered.");
    res.status(404).render("error", {pageTitle: "Page not found", path:""});
})

app.listen(3000);