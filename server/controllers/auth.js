const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");

const manager = require("../models/manager"); // db model

const message = {
    success: "status code is 1",
    passwordIncorrect: "status code is 0",
    accDoesntExist: "status code is -1",
    accGGAlreadytExist: "status code is -2",
    firstTimeSignInWithGG: "status code is -3",
    accRegularAlreadyExist: "status code is -4",
    otherErrors: "status code is -10",
};

<<<<<<< HEAD
  forgetPassword = async (req, res) => {
    Manager.findOneAndUpdate({_id : req.body.email}, {$set:{password : req.body.password}}, {new: true  },function(err, doc){
      if(err){
          console.log("Something wrong when updating data!");
      }
  
      console.log(doc);
  });
  };
};
=======
class Authentication {
    authSignInWithGG = async (req, res) => {
        var email = req.body.email;
        var accInDB = await manager.findOne({ _id: email }).exec();

        if (accInDB) {
            // gmail already used for regular account
            var result = {
                status: -2,
                message,
            };
            res.send(JSON.stringify(result));
        } else {
            var accGGInDB = await manager.findOne({ email: email }).exec();
            // sign in successfully
            if (accGGInDB) {
                // jwt authentication
                var token = jwt.sign(
                    { ...req.body },
                    PRIVATE_KEY,
                    { algorithm: "HS256" },
                    { expiresIn: "1h" }
                );
                // jwt authentication
                var result = {
                    status: 1,
                    message,
                    token,
                };
                res.send(JSON.stringify(result));
            } else {
                // the first time sign in
                var newAcc = new manager({
                    _id: req.body.email + "_Google",
                    email: req.body.email,
                    firstName: req.body.givenName,
                    lastName: req.body.familyName,
                });

                // create new gg account
                await newAcc
                    .save()
                    .then((res) => {
                        console.log("create successfully!");
                        // jwt authentication
                        var token = jwt.sign(
                            { ...req.body },
                            PRIVATE_KEY,
                            { algorithm: "HS256" },
                            { expiresIn: "1h" }
                        );
                        // jwt authentication
                        var result = {
                            status: -3,
                            message,
                            token,
                        };
                        res.send(JSON.stringify(result));
                    })
                    .catch((err) => {
                        console.log("error creating");

                        var result = {
                            status: -10,
                            message,
                            token,
                        };

                        res.send(JSON.stringify(result));
                    });
            }
        }
    };

    authSignInRegular = async (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        var accInDB = await manager.findOne({ _id: email }).exec();
    
        if (accInDB) {
            // respond TOKEN if password is correct
            if (bcrypt.compareSync(password, accInDB.password)) {
                // jwt authentication
                var token = jwt.sign(
                    { ...req.body },
                    PRIVATE_KEY,
                    { algorithm: "HS256" },
                    { expiresIn: "1h" }
                );
                // jwt authentication
                var result = {
                    status: 1,
                    message,
                    token,
                };
    
                res.send(JSON.stringify(result));
            } else {
                var result = {
                    status: 0,
                    message,
                };
    
                res.send(JSON.stringify(result));
            }
        } else {
            var result = {
                status: -1,
                message,
            };
    
            res.send(JSON.stringify(result));
        }
    };

    register = async (req, res) => {
        const Manager = new manager({
            _id: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.tel,
        });
>>>>>>> ed46bd5e9b0d5317ee26c9f35bd18147920c0644

        var accRegularInDb = await manager.findOne({_id: req.body.email}).exec();
        var accGGInDb = await manager.findOne({_id: req.body.email + "_Google"}).exec();

        if(accRegularInDb || accGGInDb) {
            var result = {
                status: -4,
                message,
            }

            res.send(JSON.stringify(result));
        } else {
            // jwt authentication
            var token = jwt.sign(
                { email: req.body.email, password: req.body.password},
                PRIVATE_KEY,
                { algorithm: "HS256" },
                { expiresIn: "1h" }
            );
            // jwt authentication
            var result = {
                status: 1,
                message,
                token,
            };
            Manager
                .save()
                .then((resDB) => {
                    res.send(JSON.stringify(result)) 
                })
                .catch((err) => console.log(err));
        }

    };

    forgetPassword = async (req, res) => {

        var oldAcc = manager.findOneAndUpdate(
            { _id: req.body.email },
            { $set: { password: req.body.password } },
        );
        if(oldAcc) {
            // jwt authentication
            var token = jwt.sign(
                { email: old.email, password: old.password},
                PRIVATE_KEY,
                { algorithm: "HS256" },
                { expiresIn: "1h" }
            );
            // jwt authentication
            var result = {
                status: 1,
                message,
                token,
            };

            res.send(JSON.stringify(result));
        } else {
            var result = {
                status: -1,
                message,
                token,
            };

            res.send(JSON.stringify(result));
        }
    };
}

module.exports = new Authentication();
