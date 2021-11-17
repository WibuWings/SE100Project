const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");


const mongoose = require("mongoose");
const Receipt = require("../models/receipt");
const Store = require("../models/store"); //
const {JWTVerify} = require("../helper/JWT");
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
class myReceipt {
    addReceipt= async (req, res) => {
       const receipt = req.body.data;
       var newReceipt = new Receipt({
        _id: {
            storeID:req.body.email ,
            receiptID: receipt.MAHD,
        },
        employeeID: {
            _id: {
                employeeID: receipt.idUser,
            },
            name : receipt.name
        },
        listItem : [...receipt.listProduct],
        discount:receipt.discount,
        totalMoney: receipt.totalMoney,
        totalFinalMoney: receipt.totalFinalMoney,
        isEdit: receipt.isEdit,
        oldBill : receipt.oldBill,
        createAt: receipt.date,
        timeCreate : receipt.time,
       })
       console.log(newReceipt)
       newReceipt
       .save()
       .then((data) => {
           console.log(data)
           res.status(200).send(
               JSON.stringify({
                   email: res.locals.decoded.email,
                   token: res.locals.newToken,
                   status: STATUS.SUCCESS,
                   data,
               })
           );              
       })
       .catch((err) => {
        res.send(
            JSON.stringify({
                status: STATUS.FAILURE,
            })
        );
    });

    };
    updateReciept = async (req, res) => {
        Receipt.findOneAndUpdate(
            {'_id.receiptID': req.body.MAHD}, 
            {
            $set :{
                isEdit: true  
            }
            },
            { returnOriginal: false })
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                    data,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });
    };
    deleteReciept = async (req, res) => {
        const products = req.body.listMAHD
        Receipt.delete({"_id.receiptID" : { $in: [...products]}})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                    data
                })  
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });
    }
    restoreRecieptOne = async (req, res) => {
        const products = req.body.MAHD
        Receipt.restore({"_id.receiptID" : products })
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                        status: STATUS.SUCCESS,
                        data,
                    })
                );
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                    })
                );
            });
    };
    deleteRecieptAll = async (req, res) => {
        const email = req.body.email;
        Receipt.delete({ "_id.storeID": email})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });

    }
    deleteRecieptForce = async (req, res) => {
        const email = req.body.email;
        Receipt.deleteMany({ "_id.storeID": email})
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });
    }
    deleteRecieptForceOne = async (req, res) => {
        const products = req.body.MAHD
        Receipt.deleteOne({"_id.receiptID" : products })
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                })
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });
    }
    restoreReciept = async (req, res) => {
        const email = req.body.email;
        Receipt.restore({ "_id.storeID": email })
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                        status: STATUS.SUCCESS,
                        data,
                    })
                );
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                    })
                );
            });
    };
    deleteRecieptOne = async (req, res) => {
        const products = req.body.MAHD
        Receipt.delete({"_id.receiptID" : products })
        .then((data) => {
            res.status(200).send(
                JSON.stringify({
                    email: res.locals.decoded.email,
                    token: res.locals.newToken,
                    status: STATUS.SUCCESS,
                    data
                })  
            );
        })
        .catch((err) => {
            res.send(
                JSON.stringify({
                    status: STATUS.FAILURE,
                })
            );
        });
    }
}
module.exports = new myReceipt();