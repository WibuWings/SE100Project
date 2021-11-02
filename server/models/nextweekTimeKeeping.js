const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NextWeekTimeKeeping = new Schema({
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
    isAttending: Boolean,
    alternativeEmployee: {
        _id: {
            employeeID: String,
            storeID: String,
        },
    },
    realDate: Date,
});

module.exports = mongoose.model("NextWeekTimeKeeping", NextWeekTimeKeeping);
