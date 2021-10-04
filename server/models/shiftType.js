
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftType = new Schema({
    _id: {
        shiftID: String,
        storeID: String,
        createdAt: Date,
    },
    name: String,
    timeFrom: String,
    timeEnd: String,
    salary: Number,
});

module.exports = mongoose.model('ShiftType', ShiftType);