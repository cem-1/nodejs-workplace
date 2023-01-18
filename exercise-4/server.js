const express = require("express");

const app = express();

app.use("/users",(req,res,next)=> {
    console.log("/users middleware");
    res.send("<h1>Users Page /users </h1>")
})

app.use("/",(req,res,next)=> {
    console.log("/ middleware");
    res.send("<h1>Main Page / </h1>")
})


/* app.use((req,res,next)=> {
    console.log("First Middleware Run!")
    next();
})

app.use((req,res,next)=> {
    console.log("Second Middleware Run!")
    res.send("<h1>test</h1>")
})
 */

app.listen(3000);