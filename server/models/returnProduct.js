const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReturnProduct = new Schema(
  {
    _id: {
      storeID: String,
      receiptID: String,
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: Number,
    returnTime: Date,
  }
);

// export a soldproduct model with schema
module.exports = mongoose.model("ReturnProduct", ReturnProduct);
