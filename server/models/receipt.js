const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Receipt = new Schema({
  _id: {
    storeID: String,
    receiptID: String,
  },
  employeeID: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
  } ,
  listItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  totalMoney: Number,
  totalProducts: Number,
  coupon: {
    type: Schema.Types.ObjectId,
    ref: "Coupon",
  },
  createAt: Date,
  editAt: Date,
  deleteAt: Date,
  restoreAt: Date,
  oldReceipt: {
    type: Schema.Types.ObjectId,
    ref: "Receipt",
  }
});

module.exports = mongoose.model("Receipt", Receipt);
