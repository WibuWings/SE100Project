const jwt = require("jsonwebtoken"); // authentication & authorization
const PRIVATE_KEY = require("../privateKey"); // temp private key
const bcrypt = require("bcryptjs");

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
const {JWTVerify} = require("../helper/JWT");

class meProfile {

    updateProfileData = async (req, res) =>{
        const idcheck = req.body._id
        const email = req.body.email;   
        const newfirstName = req.body.firstName;
        const newlastName = req.body.lastName;
        const newphoneNumber = req.body.phoneNumber;
        const newAddress = req.body.address;
        const newProvince = req.body.province;
        const newDistrict = req.body.district;
        const newstoreName = req.body.storeName;
        
        Store.findOne({ _id: email })
            .exec()
            .then((data) => {
                if (data) {
                    throw new Error();
                }  else {
                    const newStore = new Store({
                        _id: email,
                        name: newstoreName
                    });

                    newStore
                        .save()
                }
            })
            .catch((err) => {
                Store.findOneAndUpdate(
                    {
                        _id: email,
                    },
                    {$set:{
                        name: newstoreName,
                    }},
                    {
                        returnOriginal: false,
                    },
                    
            });

        Manager.findOneAndUpdate(
            {
                email: email,
            },
            {$set:{
                lastName:newlastName,
                firstName:newfirstName,
                phoneNumber:newphoneNumber,
                address:newAddress,
                province:newProvince,
                district:newDistrict,
                storeID: email,
            }},
            {
                returnOriginal: false,
            },
            function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
                else{
                res.status(200).send(
                    JSON.stringify({
                        token : res.locals.newToken,
                        email : res.locals.decoded.email,
                        data : doc
                    })
                )}
            });
}
    addShift = async (req, res) => {
        const idUserJwt = req.body.data.idUser;
        const idShift = req.body.data.id;
        const newSalary = req.body.data.salary
        const name = req.body.data.description
        const from = req.body.data.from
        const to = req.body.data.to

        const newShift = new ShiftType({
            _id:  { shiftID : idShift,
                storeID : idUserJwt,
                 },
                name: name,
                timeFrom : from,
                timeEnd : to,
                salary: newSalary,
                    });

                newShift.save()
        res.status(200).send(
                JSON.stringify({
                    token : res.locals.newToken,
                    email : res.locals.decoded.email,
                    data : doc,
                    })
                )
                }
        
 
    updateShift = async (req, res) => {
        const idUser = req.body.idUser
        const idShift = req.body.id
        const newSalary = req.body.salary
        const name = req.body.description
        const from = req.body.from
        const to = req.body.to
        ShiftType.findOneAndUpdate(
            {shiftID : idShift,storeID : idUser,},
            {$set:{
                name: name,
                timeFrom : from,
                timeEnd : to,
                salary: newSalary,
            }},{
                returnOriginal: false,
            },
            function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
            res.status(200).send(
                    JSON.stringify({
                        token : res.locals.newToken,
                        email : res.locals.decoded.email,
                        data : doc,
                    })
                )
            });
    }
    deleteShift = async (req, res) => {
        const idUser = req.body.idUser
        const idShift = req.body.id
        ShiftType.findOneAndDelete(
            {shiftID : idShift,storeID : idUser,},
            function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
                res.status(200).send(
                    JSON.stringify({
                        token : res.locals.newToken,
                        email : res.locals.decoded.email,
                        data : doc,
                    })
                )
            });
    }
    changePassword = async (req, res) => {
        const email = req.body.email;
        const newPassword = req.body.newPass;

        Manager.findOneAndUpdate(
            {
                email: email,
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
    
}
module.exports = new meProfile();