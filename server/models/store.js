
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Store = new Schema ({
    _id: String,
    name: String,
    address: String,
    imgUrl: String,
});

module.exports = mongoose.model('Store',Store);