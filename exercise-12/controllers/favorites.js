const Airport = require("../models/airport");
const User = require("../models/user");

exports.getFavoritesPage = (req,res,next) => {
    req.user
        .populate("favorites.airports.airportId")
        .then(airports=> {
            res.render("favorites",{
                path: "/favorites",
                pageTitle: "Favorites",
                airports: airports.favorites.airports,
            })
    }).catch( err => {
        const error = new Error(err); 
        error.httpStatusCode = 500; 
        return next(error); 
    });
}

exports.postFavorites = (req,res,next)=> {
    const iataCode = req.params.iatacode;
    Airport.findById(iataCode).then(airport => {
        return req.user.addToFavorites(airport);
    }).then(result => {
        res.redirect("/favorites")
    });
}

exports.removeFavorite = (req,res,next) => {
    const airportId = req.body.airportId;
    req.user.removeFavorite(airportId)
        .then(result => {
            res.redirect("/favorites");
        })
        .catch( err => {
            const error = new Error(err); 
            error.httpStatusCode = 500; 
            return next(error); 
        });
}