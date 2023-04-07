const crypto = require("crypto");
const User = require("../models/user");
const Bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { check, validationResult } = require("express-validator");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

exports.getLogin = (req, res, next) => {
    const errors = validationResult(req);
    if(req.session.isLoggedIn){
        return res.redirect("/");
    }
    let message = req.flash("error");
    if (message.length >0 ){
        message = message [0];
    } else {
        message = null;
    }
    res.render("login", {
        pageTitle: "Log-in",
        path:"/login",
        errorMessage: message,
        oldInput: {
            email: "",
            password: ""
        },
        validationErrors: errors.array(),
})
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("login", {
            pageTitle: "Log-in",
            path:"/login",
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array(),
        });
    } 
    User.findOne({email: email})
    .then(user => {
        if (!user) {
            return res.status(422).render("login", {
                pageTitle: "Log-in",
                path:"/login",
                errorMessage: "Invalid email or password!",
                oldInput: {
                    email: email,
                    password: password
                },
                validationErrors: [{param: "email", param: "password"}],
            });
        }
        Bcrypt
            .compare(password, user.password)
            .then(doMatch => {
                if (doMatch){
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save((err)=> {
                        console.log(err);
                        res.redirect("/");
                    })
                }
                return res.status(422).render("login", {
                    pageTitle: "Log-in",
                    path:"/login",
                    errorMessage: "Invalid email or password!",
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: [{param: "email", param: "password"}],
                });
            })
            .catch(err => {
            console.log(err);
            req.flash("error", "Invalid email or password!");
            res.redirect("/login")
        })
    })
    .catch( err => {
        const error = new Error(err); 
        error.httpStatusCode = 500; 
        return next(error); 
    });
}

exports.getSignup = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect("/");
    }
    let message = req.flash("error");
    if (message.length >0 ){
        message = message [0];
    } else {
        message = null;
    }
    res.render("signup", {
        pageTitle: "Sign-up",
        path:"/signup",
        errorMessage: message,
        oldInput: {
            email: "",
            password: "",
            name: "",
            confirmPassword: "",
        },
        validationErrors: [],
    })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err)=>{
        console.log(err);
        res.redirect("/");
    });
}

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render("signup", {
            pageTitle: "Sign-up",
            path:"/signup",
            errorMessage: errors.array()[0].msg,
            oldInput: {email: email, name:name, password: password, confirmPassword: req.body.confirmPassword},
            validationErrors: errors.array(),
        })
    } 
        Bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User ({
                email: email,
                name: name,
                password: hashedPassword,
                favorites: { airports: [] }
            })
            return user.save();
        }).then( result => {
            res.redirect("/login");
            return transporter.sendMail({
                to: email,
                from: "no-reply@calculateterminal.com",
                subject: "Welcome To Aircalculator",
                html:"<h1>Sign-up completed!</h1>"
            })
            .catch( err => {
                const error = new Error(err); 
                error.httpStatusCode = 500; 
                return next(error); 
            });
    });
}

exports.getReset = (req,res,next) => {
    let message = req.flash("error");
    if (message.length >0 ){
        message = message [0];
    } else {
        message = null;
    }
    res.render("reset", {
        pageTitle: "Reset Password",
        path:"/reset",
        errorMessage: message
})
}

exports.postReset = (req,res,next) => {
    crypto.randomBytes(32, (err,buffer) => {
        if (err) {
            console.log(err);
            return res.redirect("/");
        }
        const token = buffer.toString("hex");
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    req.flash("error", "Invalid email!");
                    return res.redirect("/reset");
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save().then(result => {
                    res.redirect("/");
                    transporter.sendMail({
                        to: req.body.email,
                        from: "no-reply@calculateterminal.com",
                        subject: "Password Reset",
                        html: `<p>You requested password reset</p>
                        <p>Please <a href="http://localhost:3000/reset/${token}">click</a> this link to reset password </p>
                        `
                    });
                });
            })
            .catch( err => {
                const error = new Error(err); 
                error.httpStatusCode = 500; 
                return next(error); 
            });

    })
}

exports.getNewPassword = (req,res,next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
    .then(user => {
        let message = req.flash("error");
        if (message.length >0 ){
            message = message [0];
        } else {
            message = null;
        }
        res.render("new-password", {
            pageTitle: "Password Change",
            path:"/new-password",
            errorMessage: message,
            userId: user._id.toString(),
            passwordToken: token
        })
    })
    .catch( err => {
        const error = new Error(err); 
        error.httpStatusCode = 500; 
        return next(error); 
    });

}

exports.postNewPassword = (req,res,next)=>{
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}, _id: userId})
    .then(user => {
        resetUser = user;
        return Bcrypt.hash(newPassword,12);
    })
    .then(hashedPassword =>{
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
    })
    .then(result=> {
        res.redirect("/login");
    })
    .catch( err => {
        const error = new Error(err); 
        error.httpStatusCode = 500; 
        return next(error); 
    });
}