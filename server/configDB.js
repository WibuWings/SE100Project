const mongoose = require('mongoose');

const USER_NAME = "admin";
const PASSWORD = "pfui43F8DGepLJ2V";
const URI = `mongodb+srv://admin:${PASSWORD}@cluster0.mtjy2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

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