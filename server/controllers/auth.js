const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");// decode

const mongoose = require("mongoose");
const Manager = require("../models/manager"); // db model
const Store = require("../models/store"); //
const ShiftType = require("../models/shiftType");
const ShiftAssign = require("../models/shiftAssign");
const ReturnProduct = require("../models/returnProduct");
const Receipt = require("../models/receipt");
const Product = require("../models/product");
const Employee = require("../models/employee");
const Coupon = require("../models/coupon");

const {JWTAuthToken} = require("../helper/JWT");

const MESSAGES = {
    SIGN_IN_SUCCESS: "Sign-in successfully.",
    REGISTER_SUCCESS: "Register successfully.",
    RESET_PASSWORD_SUCCESS: "Reset password successfully.",
    PASSWORD_OR_ACCOUNT_ERROR:
        "The email IS NOT registered or you entered the WRONG password.",
    EMAIL_ERROR: "The email IS NOT registered.",
    EMAIL_HAS_BEEN_USED:
        "The email address has been used for regular or Google account.",
    EMAIL_USED_GG: "The email has to sign in WITH GOOGLE.",
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
            storeID: req.body.email + "_Google",
        });

        // check whether gmail is registered by regular method
        Manager.findOne({ _id: req.body.email })
            .then((result1) => {
                if (result1) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.EMAIL_HAS_BEEN_USED,
                        })
                    );
                } else {
                    Manager.findOne({ _id: newManager._id }).then((result) => {
                        if (result) {
                            getAllData(result.email).then((data) => {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.SUCCESS,
                                        message: MESSAGES.SIGN_IN_SUCCESS,
                                        token: JWTAuthToken(result.email),
                                        email: result.email,
                                        data,
                                    })
                                );
                            });
                        } else {
                            newManager.save()
                            .then(result => {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.SUCCESS,
                                        message: MESSAGES.SIGN_IN_SUCCESS,
                                        token: JWTAuthToken(result.email),
                                        email: result.email,
                                        data: {},
                                    })
                                );
                            })
                        }
                    });
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.MONGODB_ERROR,
                    })
                );
            });
    };

    authSignInRegular = async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;

        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                //check password, if password is correct then get all data and respond for client
                if (bcrypt.compareSync(password, data.password)) {
                    getAllData(email).then((data) => {
                        res.send(
                            JSON.stringify({
                                status: STATUS.SUCCESS,
                                message: MESSAGES.SIGN_IN_SUCCESS,
                                token: JWTAuthToken(req.body),
                                email: req.body.email,
                                data,
                            })
                        );
                    });
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
            })
            .then((data) => {
                if (data) {
                    throw new Error();
                } else {
                    const newManager = new Manager({
                        _id: email,
                        password: req.body.password,
                        email: email,
                        phoneNumber: req.body.tel,
                        storeID: email,
                    });

                    newManager
                        .save()
                        .then((data) => {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.SUCCESS,
                                    message: MESSAGES.REGISTER_SUCCESS,
                                    token: JWTAuthToken(data),
                                    email: req.body.email,
                                })
                            );
                        })
                        .catch((err) => {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: err.message,
                                })
                            );
                        });
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

        Manager.findByIdAndUpdate(
            {
                _id: email,
            },
            {
                password: newPassword,
            },
            {
                returnOriginal: false,
            }
        )
            .then((data) => {
                if (data) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.SUCCESS,
                            message: MESSAGES.RESET_PASSWORD_SUCCESS,
                        })
                    );
                } else {

                    Manager.findOne({ email: email }).then((data) => {
                        if (data) {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: MESSAGES.EMAIL_USED_GG,
                                })
                            );
                        } else {
                            res.send(
                                JSON.stringify({
                                    status: STATUS.FAILURE,
                                    message: MESSAGES.EMAIL_ERROR,
                                })
                            );
                        }
                    })
                }
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: err.message,
                    })
                );
            });

    };
    
    refreshUI = async (req, res) => {
        var decoded = res.locals.decoded;

        getAllData(decoded.email).then((data) => {

            var {iat, exp, ...userInfo} = decoded;
            res.status(200).send(
                JSON.stringify({
                    message: MESSAGES.SIGN_IN_SUCCESS,
                    token: JWTAuthToken(userInfo),
                    email: decoded.email,
                    data,
                })
            );
        })
        .catch((err) => {
            console.error(err);
            res.status(404).send(
                JSON.stringify({
                    err,
                })
            )
        })
    }
    
}

async function getAllData(email) {
    const manager = await Manager.findOne({ email: email});

    const store = await Store.findOne({ _id: manager.storeID });
    if (store == null) {
        return manager;
    }

    const [
        coupons,
        employees,
        products,
        receipts,
        returnProducts,
        shiftAssigns,
        shiftTypes,
    ] = await Promise.all([
        Coupon.find({ storeID: store._id }).exec(),
        Employee.find({ managerID: store._id }).exec(),
        Product.find({ storeID: store._id }).exec(),
        Receipt.find({ storeID: store._id }).exec(),
        ReturnProduct.find({ storeID: store._id }).exec(),
        ShiftAssign.find({ storeID: store._id }).exec(),
        ShiftType.find({ storeID: store._id }).exec(),
    ]);

    return {
        manager,
        store,
        employees,
        coupons,
        products,
        receipts,
        returnProducts,
        shiftAssigns,
        shiftTypes,
    };
}
module.exports = new Authentication();
