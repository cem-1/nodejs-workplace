const express = require("express");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.q2gelt5.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`;
const csrf = require("csurf");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const https = require("https");

//Build the server
const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: "sessions",
});
const csrfProtection = csrf();

//const privateKey = fs.readFileSync("server.key");
//const certificate = fs.readFileSync("server.cert");

//Setting up the view engine
app.set("view engine","ejs");
app.set("views");

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "acess.log"), 
    { flags: "a"}
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));



//Setting the pre-requisities, session system, helpers path, locals etc.
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(
    session({
        secret: "my secret", 
        resave: false, 
        saveUninitialized: false, 
        store: store
    })
);
app.use(csrfProtection);
app.use(flash());

app.use((req,res,next)=>{
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch( err => {
        next(new Error(err));
    });
});

app.use((req,res,next)=> {
    res.locals.isAuthenticated = req.session.isLoggedIn,
    res.locals.csrfToken = req.csrfToken();
    next()
})

//Adding routes
app.use(adminRoutes);
app.use(authRoutes);

//Defining not found page
app.use("/", (req, res, next)=>{
    res.send("<h1>404 Not Found</h1>")
});

app.use((error,req,res,next) => {
    console.log(error);
    res.status(500).render("500",{
        pageTitle:"Error!",
        path:"/500",
        isAuthenticated: req.session.isLoggedIn
    })
})

//Connecting to database and creating port
mongoose
.connect(MONGODB_URI)
.then(result=>{
    //https
    //    .createServer({key: privateKey, cert: certificate}, app)
     //   .listen(process.env.PORT || 3000);
    app.listen(process.env.PORT || 3000);
    console.log("Connected!");
})
.catch(err=>{
    console.log(err);
});