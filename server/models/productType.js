
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema({
    _id: {
        typeID: String,
        storeID: String,
    },
    name: String,
    createdAt: Date,
});

module.exports = mongoose.model("ProductType", ProductType);