const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const airportSchema = new Schema({
    iatacode: {
        type: String,
        required: "Please Enter Iatacode!"
    },
    name: {
        type: String,
        required: "Please Enter Name!"
    },
    country:  {
        type: String,
        required: "Please Enter Country!"
    },
    latitude:  {
        type: Number,
        required: "Please Enter Latitude!"
    },
    longtitude:  {
        type: Number,
        required: "Please Enter Longitude!"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "User not found!"
    },
    modifyDate: {
        type: Date,
        required: "Date error!"
    }
});

airportSchema.statics.calculateDistance = function(origin,destination){
    const lat1 = origin.latitude;
    const lon1 = origin.longtitude;
    const lat2 = destination.latitude;
    const lon2 = destination.longtitude;
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1)* (Math.PI/180);  // deg2rad below
    var dLon = (lon2-lon1) * (Math.PI/180); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos((lat1)* (Math.PI/180)) * Math.cos((lat2)* (Math.PI/180)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var distance = R * c; // Distance in km
    return distance;
}

airportSchema.statics.kilometerToMiles = function(distance){
    const miles = distance * 0.621371;
    return miles;
}


module.exports = mongoose.model("Airport", airportSchema);

// const mongodb = require("mongodb");
// const getDb = require("../helpers/database").getDb;

// class Airport {
//     constructor(iatacode, name, country, latitude, longtitude, id, userId) {
//         this.iatacode = iatacode;
//         this.name = name;
//         this.country = country;
//         this.latitude = parseFloat(latitude);
//         this.longtitude = parseFloat(longtitude);
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userId = userId;
//         this.modifyDate = Date("<YYYY-mm-ddTHH:MM:ss>");
//     }

//     save(){
//         const db = getDb();
//         let dbOp;
//         if (this._id){
//             //Update The Airport.
//             dbOp = db.collection("airports").updateOne({_id: this._id}, {$set: this});
//         } else {
//             // Create New Airport
//             dbOp = db.collection("airports").insertOne(this);
//         }
//         return dbOp
//                 .then(result => {console.log(result)})
//                 .catch(err=> {console.log(err)});
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db.collection("airports")
//             .find()
//             .toArray()
//             .then(x => {
//                 console.log(x);
//                 return x;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
        
//     }

//     static fetchOne(iataCode) {
//         const db = getDb();

//         return db.collection("airports")
//             .findOne({iatacode: iataCode})
//             .then(x => {
//                 return x;
//             })
//             .catch(err => console.log(err));
//     }

//     static deleteOne(iataCode) {
//         const db = getDb();

//         return db.collection("airports")
//             .findOne({iatacode: iataCode})
//             .then(x => {
//                 console.log(x);
//                 db.collection("airports").deleteOne({iatacode: iataCode});
//             })
//             .catch(err => console.log(err));
//     }



// }


// module.exports = Airport;