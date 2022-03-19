const mongoose = require('mongoose');

const USER_NAME = "admin";
const PASSWORD = "T1VD3neuDLW97eB0";
const URI = `mongodb+srv://admin:T1VD3neuDLW97eB0@cluster0.zsuvd.mongodb.net/test`;

module.exports = connectDB = async() => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connecting to DB successfully!");
    }
    catch(error) {
        console.error(error);
    }
};