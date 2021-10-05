manager = require("../models/manager");

class Signup{
    // [POST] sign up
    index(req, res){
        console.log(req.body)
    }
}
module.exports = new Signup;