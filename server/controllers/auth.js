const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require('../privateKey'); // temp private key
const Manager = require("../models/manager");

class Authentication {
  authSignInWithGG = async (req, res) => {
    console.log(isExistEmail("abc"));
    console.log(req.body);
  };

  authSignInRegular = async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var emailInDB = await manager.findOne({ _id: email }).exec();

    if (emailInDB) {
        console.log("abc")
      if (password === emailInDB.password) {
        // jwt authentication 
        var token = jwt.sign(
          { ...req.body },
          PRIVATE_KEY,
          { algorithm: "HS256" },
          { expiresIn: "1h" }
        );
        // jwt authentication
        res.send(token);
      }
    } else {
        console.log("err")
    }

  };

  register = async (req, res) => {
    const manager = new Manager({
        _id : req.body.email,
        password : req.body.password,
        phoneNumber :req.body.tel,
    })
      
        manager.save().then(result => {
          res.send("Tao tai khoan thanh cong !!!")
          })
        .catch(err => console.log(err));

};

  forgetPassword = async (req, res) => {
    Manager.findOneAndUpdate({_id : req.body.email}, {$set:{password : req.body.password}}, {new: true},function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
  });
  };
};

// sub function
function isExistEmail(email) {
  return email;
}
module.exports = new Authentication();
