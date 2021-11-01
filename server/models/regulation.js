const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Regulation = new Schema({
    _id: String,
    currency: String,
    from :{
        hour: Number,
        minutes: Number,
    },
    to :{
        hour: Number,
        minutes: Number,
    },
});

module.exports = mongoose.model('Regulation', Regulation);