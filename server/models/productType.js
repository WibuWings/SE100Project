
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductType = new Schema({
    _id: String,
    name: String,
});

module.exports = mongoose.model("ProductType", ProductType);