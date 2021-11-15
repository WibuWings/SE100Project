const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");


const mongoose = require("mongoose");
const Receipt = require("../models/receipt");
const Store = require("../models/store"); //
const {JWTVerify} = require("../helper/JWT");

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
                   data,
               })
           );              
       })
       .catch((err) => {
           res.status(404).send(err);
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
                    data,
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
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
                    data
                })  
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    }
    restoreReciept = async (req, res) => {
        const products = req.body.listMAHD
        Receipt.restore({"_id.receiptID" : { $in: [...products]} })
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        email: res.locals.decoded.email,
                        token: res.locals.newToken,
                        data,
                    })
                );
            })
            .catch((err) => {
                res.status(404).send(err);
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
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
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
                })
            );
        })
        .catch((err) => {
            res.status(404).send(err);
        });
    }
}
module.exports = new myReceipt();