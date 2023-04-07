const express = require("express");
const adminController = require("../controllers/admin");
const favoritesController = require("../controllers/favorites");
const isAuth = require("../middleware/isauth");
const { body } = require("express-validator");

const router = express.Router();

//GETS
router.get("/",adminController.getMainPage);
router.get("/addairport",isAuth,adminController.getAddAirportPage);
router.get("/editairport/:iatacode",isAuth,adminController.getEditAirportPage);
router.get("/airportlist",isAuth,adminController.getAirportListPage);
router.get("/favorites",isAuth,favoritesController.getFavoritesPage);
router.get("/postFavorite/:iatacode",isAuth,favoritesController.postFavorites);

//POSTS
router.post("/postAddAirport",isAuth,
    [
        body("iatacode")
        .isString()
        .withMessage("Iata code cannot contain characters other than letters .")
        .isLength({max:3, min:3})
        .withMessage("Iata code must be 3 character long.")
        .trim(),
        body("name").trim(),
        body("latitude").isNumeric(),
        body("longtitude").isNumeric(),
    ],
        adminController.postAirport
);
router.post("/postOnd",adminController.postOnd);
router.post("/postEditAirport",isAuth,
    [
        body("iatacode")
        .isString()
        .withMessage("Iata code cannot contain characters other than letters .")
        .isLength({max:3, min:3})
        .withMessage("Iata code must be 3 character long.")
        .trim(),
        body("name").trim(),
        body("latitude").isFloat(),
        body("longtitude").isFloat(),
    ],
        adminController.postEditAirport
    );
router.post("/removefavorite",isAuth,favoritesController.removeFavorite);

//DELETES
router.delete("/airport/:_id",isAuth,adminController.deleteAirport);

module.exports = router;
