
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NextWeekTimeKeeping = new Schema ({
    _id: {
        dateInWeek: String,
        storeID: String,
        shiftType: {
            type: Schema.Types.ObjectId,
            ref: "ShiftType",
        },
        employee: {
            type: Schema.Types.ObjectId,
            ref: "Employee",
        },
    },
    isAttending: Boolean,
    alternativeEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
    },
    realDate: Date,
});

module.exports = mongoose.model("NextWeekTimeKeeping", NextWeekTimeKeeping);