
const {getCurrentDateTimeString} = require('../helper/DateTime');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftAssign = new Schema({
    _id: {
        dateInWeek: String,
        storeID: String,
        shiftType: {
            _id: {
                shiftID: String,
                storeID: String,
            },
        },
        employee: {
            _id: {
                employeeID: String,
                storeID: String,
            },
        },
    },
    createdAt: Date,
});

module.exports = mongoose.model('ShiftAssign', ShiftAssign);