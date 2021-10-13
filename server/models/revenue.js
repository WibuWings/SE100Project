
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Revenue = new Schema({
    _id: {
        dateTime: Date,
        storeID: String,
    },
    totalMoney: String,
    totalProducts: String,
});

module.exports = mongoose.model("Revenue", Revenue);