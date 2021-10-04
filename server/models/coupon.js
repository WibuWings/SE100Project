
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coupon = new Schema({
    _id: {
        storeID: String,
        couponID: String,
    },
    percent: Number,
    from: Date,
    expire: Date,
    createdAt: Date,
});

module.exports = mongoose.model('Coupon', Coupon);