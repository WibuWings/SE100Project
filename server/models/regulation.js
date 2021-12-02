const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Regulation = new Schema({
    _id: String,
    currency: Number,
    exchangeRate:Number,
    miniumEmployeeAge:Number,
    lessChangeTimeKeepingDay:Number,
    minExpiredProduct:Number,
    numberEmployees: Number,
    from :{
        hour: Number,
        minutes: Number,
    },
    to :{
        hour: Number,
        minutes: Number,
    },
});

module.exports = mongoose.model('Regulation', Regulation);