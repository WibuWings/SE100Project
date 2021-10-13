
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductJoinType = new Schema({
    _id: {
        productID: String,
        typeID: String, 
        importDate: Date,
        storeID: String, 
    },
});

module.exports = mongoose.model("ProductJoinType", ProductJoinType);