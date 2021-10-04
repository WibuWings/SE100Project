
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    _id: {
        employeeID: String,
        storeID: String,
    },
    managerID: String,
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    address: String,
    cardID: String,
    startDate: Date,
    endDate: Date,
});

module.exports = mongoose.model('Employee',Employee);