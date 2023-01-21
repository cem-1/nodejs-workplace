const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const usersRoutes = require("./routes/admin");
const othersRoutes = require("./routes/others");


const app = express();

app.set("view engine","ejs");
app.set("views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(usersRoutes.routes);
app.use(othersRoutes);

app.get("/", (req,res,next) => {
    res.render("main",{path:"/",pageTitle:"Main Page"});
})


app.use((req,res,next)=>{
    res.render("error",{path:"",pageTitle:"Page not found"});
})

app.listen(3000);