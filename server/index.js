const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configDB');

const PORT = process.env.PORT || 5000;
const app = express();

//some middleware
app.use(bodyParser.json({ limit: 1000 }));
app.use(bodyParser.urlencoded({extended: true, limit: 1000 }));
app.use(cors());

//connect to MongoDB
connectDB();

//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
