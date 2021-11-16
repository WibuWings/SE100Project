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
    updateReciept= async (req, res) => {
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
}
module.exports = new myReceipt();