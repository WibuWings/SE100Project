const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const Receipt = new Schema({
    _id: {
        storeID: String,
        receiptID: String,
    },
    employeeID: {
        _id: {
            employeeID: String,
            storeID: String,
        },
        managerID: String,
        password: String,
        name: String,
        phoneNumber: String,
        dateOfBirth: Date,
        email: String,
        address: String,
        cardID: String,
        startDate: Date,
        endDate: Date,
    },
    listItem: [],
    oldBill:{}, 
    totalMoney: Number,
    totalFinalMoney: Number,
    totalProducts: Number,
    discount:Number,
    coupon: {
        _id: {
            storeID: String,
            couponID: String,
        },
        percent: Number,
        from: Date,
        expire: Date,
        createdAt: Date,
    },
    timeCreate : String,
    isEdit: Boolean,
    createAt: String,
    editAt: Date,
    deleteAt: Date,
    restoreAt: Date,
});
Receipt.plugin(mongooseDelete,
    {overrideMethods: 'all', deletedAt : true});
module.exports = mongoose.model("Receipt", Receipt);
