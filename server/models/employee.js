
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
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
    dateOfBirth: Date,
    email: String,
    address: String,
    cardID: String,
    startDate: Date,
    endDate: Date,
});
Employee.plugin(mongoose_delete,
    {overrideMethods: true});
module.exports = mongoose.model('Employee',Employee);