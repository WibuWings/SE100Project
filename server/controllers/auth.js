const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");

const Manager = require("../models/manager"); // db model

const MESSAGES = {
    SIGN_IN_SUCCESS: "Sign-in successfully.",
    REGISTER_SUCCESS: "Register successfully.",
    RESET_PASSWORD_SUCCESS: "Reset password successfully.",
    PASSWORD_OR_ACCOUNT_ERROR:
        "The email IS NOT registered or you entered the WRONG password.",
    EMAIL_ERROR: "The email IS NOT registered.",
    EMAIL_HAS_BEEN_USED:
        "The email address has been used for regular or Google account.",

    MONGODB_ERROR: "Some errors with database.",
};
const STATUS = {
    SUCCESS: 1,
    FAILURE: -1,
};

class Authentication {

    authSignInWithGG = async (req, res) => {
        var newManager = new Manager({
            _id: req.body.email + "_Google",
            email: req.body.email,
            firstName: req.body.givenName,
            lastName: req.body.familyName,
        });

        newManager.save()
        .then((data) => {
            res.send(JSON.stringify({
                status: STATUS.SUCCESS,
                message: MESSAGES.SIGN_IN_SUCCESS,
                token: JWTAuthToken(data),
                data,
            }));
        })
        .catch((err) => {
            res.send(JSON.stringify({
                status: STATUS.FAILURE,
                message: MESSAGES.EMAIL_HAS_BEEN_USED,
            }));
        });
    };

    authSignInRegular = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                if (bcrypt.compareSync(password, data.password)) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.SUCCESS,
                            message: MESSAGES.SIGN_IN_SUCCESS,
                            token: JWTAuthToken(data),
                            user: data,
                        })
                    );
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.PASSWORD_OR_ACCOUNT_ERROR,
                    })
                );
            });
    };

    register = async (req, res) => {
        const email = req.body.email;

        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                if (data) {
                    throw new Error();
                } else {
                    return Manager.findOne({ _id: email + "_Google" }).exec();
                }
                console.log(data);
            })
            .then((data) => {
                if (data) {
                    throw new Error();
                } else {
                    const newManager = new Manager({
                        _id: email,
                        password: req.body.password,
                        phoneNumber: req.body.tel,
                    });

                    newManager.save()
                    .then((data => {
                        res.send(
                            JSON.stringify({
                                status: STATUS.SUCCESS,
                                message: MESSAGES.REGISTER_SUCCESS,
                                token: JWTAuthToken(data),
                                data,
                            })
                        );
                    }))
                    .catch((err) => {
                        res.send(
                            JSON.stringify({
                                status: STATUS.FAILURE,
                                message: err.message,
                            })
                        );
                    })
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.EMAIL_HAS_BEEN_USED,
                    })
                );
            });
    };

    forgetPassword = async (req, res) => {
        const email = req.body.email;
        const newPassword = req.body.password;

        Manager.findByIdAndUpdate({
          _id: email  
        },{
            password: newPassword,
        }, {
            returnOriginal: false,
        })
        .then(data => {
            if (data) {
                res.send(JSON.stringify({
                    status: STATUS.SUCCESS,
                    message: MESSAGES.RESET_PASSWORD_SUCCESS,
                    token: JWTAuthToken(data),
                    data,
                }));
            } else {
                res.send(JSON.stringify({
                    status: STATUS.FAILURE,
                    message: MESSAGES.EMAIL_ERROR,
                }));
            }
        })
        .catch((err) => {
            res.send(JSON.stringify({
                status: STATUS.FAILURE,
                message: err.message,
            }));
        });
    };
}


// this function return a token representing a data of use and using for authenticating and authorizating
function JWTAuthToken(data) {
    return (token = jwt.sign(
        { ...data },
        PRIVATE_KEY,
        { algorithm: "HS256" },
        { expiresIn: 600 }
    ));
}
module.exports = new Authentication();
