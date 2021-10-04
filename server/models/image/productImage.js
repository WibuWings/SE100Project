
const mongoose = require('mongoose');
 
const ProductImageSchema = new mongoose.Schema({
    _id: String,
    img:
    {
        data: Buffer,
        contentType: String
    },
    createAt: Date,
});
 
//Image is a model which has a schema imageSchema
 
module.exports = new mongoose.model('ProductImage', ProductImageSchema);