const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configDB'); // connect MongoDB 
const PORT = process.env.PORT || 5000; // port number
const app = express();
const route = require('./routers/index'); // router impl

//some middleware
app.use(bodyParser.json({ limit: 10000 }));
app.use(bodyParser.urlencoded({extended: true, limit: 10000 }));
app.use(cors());

//connect to MongoDB
connectDB();
// pass app into router
route(app);

//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
