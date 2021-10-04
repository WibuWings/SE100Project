
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema ({
    _id: mongoose.ObjectId,
    name: String,
    address: String,
    products: [
        {
            type: Schema.Types.ObjectId, 
            ref: "Product",
        }
    ],
});

module.exports = mongoose.model('Store',Store);