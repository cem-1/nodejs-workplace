const Airport = require("../models/airport");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const AIRPORTS_PER_PAGE = 10;

exports.postAirport = (req,res,next) => {
    const iatacode = req.body.iatacode;
    const name = req.body.name;
    const country = req.body.country;
    const latitude = req.body.latitude;
    const longtitude = req.body.longtitude;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).render("editairport", {
            pageTitle: "Add/Edit Airport",
            path: "/editairport",
            editing: false,
            hasError: true,
            airport: {
                iatacode: iatacode,
                name: name,
                latitude: latitude,
                longtitude: longtitude,
                country: country
            },
            errorMessage: errors.array()[0].msg,
        });
    };

    const airport = new Airport({
        iatacode: iatacode, 
        name: name, 
        country: country, 
        latitude: latitude, 
        longtitude: longtitude,
        userId: req.user,
        modifyDate: new Date()
    });

    airport
        .save()
        .then(result => {
            console.log("Airport Created! - " + iatacode + " - " + name + " - " + country);
            res.redirect("/addairport");
        })
        .catch( err => {
            const error = new Error(err); 
            error.httpStatusCode = 500; 
            return next(error); 
        });
    
}

exports.postEditAirport = (req,res,next) => {
    const airportId = req.body.airportId;
    const iataCode = req.body.iataCode;
    const updatedName = req.body.name;
    const updatedCountry = req.body.country;
    const updatedLatitude = req.body.latitude;
    const updatedLongtitude = req.body.longtitude;
    console.log(iataCode);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(422).render("editairport", {
            pageTitle: "Add/Edit Airport",
            path: "/editairport",
            editing: false,
            hasError: true,
            airport: {
                iatacode: iataCode,
                name: updatedName,
                latitude: updatedLatitude,
                longtitude: updatedLongtitude,
                country: updatedCountry
            },
            errorMessage: errors.array()[0].msg,
        });
    };

    Airport.findOne({_id: airportId}).then(airport => {
        if(airport.userId.toString() !== req.user._id.toString()){
            return res.redirect("/");
        }
        airport.name = updatedName;
        airport.country = updatedCountry;
        airport.latitude = updatedLatitude;
        airport.longtitude = updatedLongtitude;
        airport.modifyDate = new Date();
        airport.userId = req.user._id;
        return airport.save().then(() => {
            res.redirect("/airportlist");
        });
    }).catch( err => {
        const error = new Error(err); 
        error.httpStatusCode = 500; 
        return next(error); 
    });
 
}

exports.deleteAirport = (req,res,next) => {
    const airportId = req.params._id;
    Airport.deleteOne({_id: airportId, userId: req.user._id})
        .then(()=>{
            res.status(200).json({
                message: "Sucess!"
            });
        })
        .catch( err => {
            res.status(500).json({
                message: "Deleting Product Failed!"
            });
        });
}


exports.getAddAirportPage = (req,res,next) => {
    res.render("editairport", {
        pageTitle: "Add/Edit Airport",
        path:"/addairport",
        editing: false,
        hasError: false,
        errorMessage: null
    });
}

exports.getMainPage = (req,res,next) => {
        res.render("main", {
                airports: null,
                pageTitle: "Main Page",
                path:"/",
                origin: true,
                destination: true,
        })
} 

exports.postOnd = (req,res,next) => {
    const origin = req.body.origin;
    const destination = req.body.destination;
    let originApt = "";
    let destinationApt = "";
    Airport.find()
        .then(x=> {
            for(let apt of x){
                if (apt.iatacode == origin) originApt = apt;
                if (apt.iatacode == destination) destinationApt = apt;
            }
            let kilometer;
            let miles;
            if (originApt!="" || destinationApt!= ""){
            kilometer = Airport.calculateDistance(originApt,destinationApt);
            miles = Airport.kilometerToMiles(kilometer);
            }
            airport2 = [originApt, destinationApt];
            res.render("main", {
                airports: airport2,
                miles: miles,
                kilometer: kilometer,
                pageTitle: "Main Page",
                path:"/",
                origin: originApt,
                destination: destinationApt,
            })
        })
        .catch( err => {
            const error = new Error(err); 
            error.httpStatusCode = 500; 
            return next(error); 
        });
}

exports.getAirportListPage = (req,res,next) => {
    const page = +req.query.page || 1;
    let totalAirports;
    Airport.find().countDocuments().then(numAirports =>{
        totalAirports = numAirports;
        return Airport.find({userId : req.user._id})
        .skip((page - 1) * AIRPORTS_PER_PAGE)
        .limit(AIRPORTS_PER_PAGE)
    }).then(airport => {
        res.render("airportlist", {
            airports: airport,
            pageTitle: "Airport List",
            path:"/airportlist",
            currentPage: page,
            hasNextPage: AIRPORTS_PER_PAGE * page < totalAirports,
            hasPreviousPage: page > 1,
            nextPage: page+1,
            previousPage: page -1,
            lastPage: Math.ceil(totalAirports / AIRPORTS_PER_PAGE),
    })
    })
}


exports.getEditAirportPage = (req,res,next) => {
    const editMode = req.query.edit;
    if (!editMode) return red.redirect("/");
    const airportId = req.params.iatacode;
    let usermodified = "";
    Airport
        .findById(airportId).populate("userId")
        .then(airport => {
                res.render("editairport", {
                    pageTitle: "Add/Edit Airport",
                    path: "/editairport",
                    editing: editMode,
                    airport: airport,
                    user: airport.userId.name,
                    hasError: false,
                    errorMessage: null
                })
            })
        
}
