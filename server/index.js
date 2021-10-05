const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configDB');
const PORT = process.env.PORT || 3000;
const app = express();
const Manager = require('./models/manager')
//some middleware
app.use(bodyParser.json({ limit: 1000 }));
app.use(bodyParser.urlencoded({extended: true, limit: 1000 }));
app.use(cors());


//connect to MongoDB
connectDB();

app.post("/register-with-email",(req, res) => {
    const manager = new Manager({
        _id : req.body.email,
        password : req.body.password,
        phoneNumber :req.body.tel,
    })
    manager.save().then(result => {
        res.send("Tao tai khoan thanh cong !!!")
    })
    .catch(err => console.log(err));
})

//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
