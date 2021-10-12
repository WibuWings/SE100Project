
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Product = new Schema({
    //id for SoldProduct
    _id: {
        productID: String, 
        importDate: Date,
        storeID: String, 
    },
    name: String, 
    imgUrl: String, 
    quantity: Number, 
    remain: Number, 
    unit: String,
    importPrice: Number, 
    sellPrice: Number, 
    expires: Date, 
});

// export a soldproduct model with schema
module.exports = mongoose.model('Product',Product);