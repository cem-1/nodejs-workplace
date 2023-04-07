const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    resetToken : String,
    resetTokenExpiration: Date,
    favorites:{
        airports: [{
                airportId: {type: Schema.Types.ObjectId, ref: "Airport", required: true}
            }]
    }
});

userSchema.methods.addToFavorites = function(airport) {
        const favoritesAirport = this.favorites.airports.findIndex(x => {
        return x.airportId.toString() == airport._id.toString();
        })

        const updatedFavoritesAirports = [...this.favorites.airports];

        if (favoritesAirport < 0){
            updatedFavoritesAirports.push({airportId: airport._id})
                console.log("Added to favorites list!");
                console.log("Airport ID: "+ airport._id);
                console.log("User ID: "+ this._id);
        } else {
            console.log("This airport already in favorites of the user!");
        };

        const updatedFavorites = {
            airports: updatedFavoritesAirports
        }

        this.favorites = updatedFavorites;
        return this.save();
}

userSchema.methods.removeFavorite = function(airportId) {
    const updatedFavoritesAirports = this.favorites.airports.filter(apt => {
                 return apt.airportId.toString() !== airportId.toString();
    });
    this.favorites.airports = updatedFavoritesAirports;
    return this.save();
}


module.exports = mongoose.model("User", userSchema);


// const getDb = require("../helpers/database").getDb;
// const mongodb = require("mongodb");

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(name, email, password, favorites, id) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//         this.favorites = favorites; // object. {items: []}
//         this._id = id;
//     }
    
//     save() {
//         const db = getDb();
//         console.log(this);
//         return db.collection("users").insertOne(this);
//     }

//     addToFavorites(airport) {
//         const favoritesAirport = this.favorites.airports.findIndex(x => {
//         return x.airportId.toString() == airport._id.toString();
//         })

//         const updatedFavoritesAirports = [...this.favorites.airports];

//         if (favoritesAirport < 0){
//             updatedFavoritesAirports.push({airportId: new ObjectId(airport._id)})
//                 console.log("Added to favorites list!");
//                 console.log("Airport ID: "+ airport._id);
//                 console.log("User ID: "+ this._id);
//         } else {
//             console.log("This airport already in favorites of the user!");
//         };

//         const updatedFavorites = {
//             airports: updatedFavoritesAirports
//         }

//         const db = getDb();
//         return db
//             .collection("users")
//             .updateOne(
//                 {_id: new ObjectId(this._id)}, 
//                 {$set: {favorites: updatedFavorites}}
//             );
//     }

//     getFavorites() {
//         const db = getDb();
//         const favoriteAirportIds = this.favorites.airports.map(x => {
//             return x.airportId;
//         });
//         return db
//             .collection("airports")
//             .find({_id: {$in: favoriteAirportIds}})
//             .toArray()
//             .then(airports=> {
//                 return airports.map(apt => {
//                     return {...apt}
//                 });
//             });
//     }

//     removeFavorite(airportId) {
//         const updatedFavoritesAirports = this.favorites.airports.filter(apt => {
//             return apt.airportId.toString() !== airportId.toString();
//         });
//         const db = getDb();
//         return db
//             .collection("users")
//             .updateOne(
//                 {_id: new ObjectId(this._id)}, 
//                 {$set: {favorites: {airports: updatedFavoritesAirports}}}
//             );
//     }

//     static fetchUser(userId) {
//         const db = getDb();
//         return db.collection("users").find({_id: new ObjectId(userId)}).next();
//     }
// }

// module.exports = User;