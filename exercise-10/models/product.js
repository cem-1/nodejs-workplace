const fs = require("fs");
const path = require("path");
const rootDir = require("../helpers/path")
const p = path.join(rootDir, "data", "products.json");

const products = [];

const getProductsFromFile = (callb) => {
    fs.readFile( p, (err,fileContent) =>{
        if(err) {
            callb([]);
        } else {
            callb(JSON.parse(fileContent));
        }
    });
}


module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callb) {
        getProductsFromFile(callb);
    }

}   
