const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Coupon = new Schema({
    _id: {
        storeID: String,
        couponID: String,
    },
    name: String,
    minTotal: Number,
    percent: Number,
    timeFrom: Date,
    timeEnd: Date,
    quantity: Number,
});

module.exports = mongoose.model("Coupon", Coupon);
