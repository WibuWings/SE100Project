
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShiftAssign = new Schema({
    _id: {
        date: Date,
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
    isOff: Boolean,
    alternativeEmployee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
    },
    createdAt: Date,
});

module.exports = mongoose.model('ShiftAssign', ShiftAssign);