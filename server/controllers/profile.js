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
const Regulation = require("../models/regulation");
const ProductType = require("../models/productType");
const ProductJoinType = require("../models/productJoinType");
const Revenue = require("../models/revenue");
const TimeKeeping = require("../models/timeKeeping");
const NextWeekTimeKeeping = require("../models/nextWeekTimeKeeping");
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
    FAILURE_UPDATE: "failure when update",
    FAILURE_ADD: " failure when adding ",
    FAILURE_DELETE: "failure when delete"
};
const STATUS = {
    SUCCESS: 1,
    FAILURE: -1,
};

class meProfile {

    updateProfileData = async (req, res) => {
        const idcheck = req.body._id
        const email = req.body.email;
        const newfirstName = req.body.firstName;
        const newlastName = req.body.lastName;
        const newphoneNumber = req.body.phoneNumber;
        const newgender = req.body.gender
        const newAddress = req.body.address;
        const newProvince = req.body.province;
        const newDistrict = req.body.district;
        const newstoreName = req.body.storeName;
        const old = req.body.old
        Store.findOneAndUpdate(
            {
                _id: email
            },
            {
                $set: {
                    storeName: newstoreName,
                }
            },
            {
                returnOriginal: false,
            },
            function (err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                else {
                    Manager.findOneAndUpdate(
                        {
                            email: email,
                        },
                        {
                            $set: {
                                lastName: newlastName,
                                firstName: newfirstName,
                                phoneNumber: newphoneNumber,
                                address: newAddress,
                                province: newProvince,
                                district: newDistrict,
                                storeID: email,
                                gender: newgender,
                                old: old,
                            }
                        },
                        {
                            returnOriginal: false,
                        },
                        function (err, doc) {
                            if (err) {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.FAILURE,
                                        message: MESSAGES.FAILURE_UPDATE,
                                    })
                                );;
                            }
                            else {
                                var newDoc = { ...doc._doc, storeName: newstoreName }
                                console.log(newDoc);

                                res.status(200).send(
                                    JSON.stringify({
                                        token: res.locals.newToken,
                                        email: res.locals.decoded.email,
                                        data: newDoc,
                                    })
                                )
                            }
                        })
                }
            }

        )

    }

    addShift = async (req, res) => {
        const idUserJwt = req.body.email;
        const idShift = req.body.data.id;
        const newSalary = req.body.data.salary
        const name = req.body.data.description
        const from = req.body.data.from
        const to = req.body.data.to

        const newShift = new ShiftType({
            _id: {
                shiftID: idShift,
                storeID: idUserJwt,
            },
            name: name,
            timeFrom: from,
            timeEnd: to,
            salary: newSalary,
        });

        newShift.save()
            .then((data) => {
                res.status(200).send(
                    JSON.stringify({
                        token: res.locals.newToken,
                        email: res.locals.decoded.email,
                        data,
                    })
                )
            })
            .catch((err) => {
                res.send(
                    JSON.stringify({
                        status: STATUS.FAILURE,
                        message: MESSAGES.FAILURE_ADD,
                    })
                );
            })

    }


    updateShift = async (req, res) => {
        const idUser = req.body.email
        const idShift = req.body.idShift
        const newSalary = req.body.salary
        const name = req.body.description
        const from = req.body.from
        const to = req.body.to
        ShiftType.findOneAndUpdate(
            { shiftID: idShift, storeID: idUser, },
            {
                $set: {
                    name: name,
                    timeFrom: from,
                    timeEnd: to,
                    salary: newSalary,
                }
            }, {
            returnOriginal: false,
        },
            function (err, doc) {
                if (err) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.FAILURE_UPDATE,
                        })
                    );
                }
                else {
                    res.status(200).send(
                        JSON.stringify({
                            token: res.locals.newToken,
                            email: res.locals.decoded.email,
                            data: doc,
                        })
                    )
                }
            });
    }
    deleteShift = async (req, res) => {
        const idUser = req.body.idUser
        const idShift = req.body.id
        ShiftType.findOneAndDelete(
            { shiftID: idShift, storeID: idUser, },
            function (err, doc) {
                if (err) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.FAILURE_DELETE,
                        })
                    );;;
                }
                else {
                    res.status(200).send(
                        JSON.stringify({
                            token: res.locals.newToken,
                            email: res.locals.decoded.email,
                            data: doc,
                        })
                    )
                }
            });
    }
    changePassword = async (req, res) => {
        const email = req.body.email;
        const newPassword = req.body.newPass;
        const curPass = req.body.curPass;
        Manager.findOne({ _id: email })
            .exec()
            .then((data) => {
                if (bcrypt.compareSync(curPass, data.password)) {
                    Manager.findOneAndUpdate(
                        {
                            email: email,
                        },
                        {
                            $set: {
                                password: newPassword,
                            }
                        },
                        {
                            returnOriginal: false,
                        },
                        function (err, doc) {
                            if (err) {
                                res.send(
                                    JSON.stringify({
                                        status: STATUS.FAILURE,
                                        message: MESSAGES.EMAIL_ERROR,
                                    })
                                );;
                            }
                            else {
                                res.status(200).send(
                                    JSON.stringify({
                                        token: res.locals.newToken,
                                        email: res.locals.decoded.email,
                                        data: doc,
                                    })
                                )
                            }
                        }
                    )
                }
                else {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.PASSWORD_OR_ACCOUNT_ERROR,
                        })
                    );;
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
    updateImage = async (req, res) => {
        const email = req.body.email;
        const image = req.body.avatar
        Manager.findOneAndUpdate(
            {
                email: email,
            },
            {
                $set: {
                    imgUrl: image,
                }
            },
            {
                returnOriginal: false,
            },
            function (err, doc) {
                if (err) {
                    res.send(
                        JSON.stringify({
                            status: STATUS.FAILURE,
                            message: MESSAGES.FAILURE_UPDATE,
                        })
                    );;
                }
                else {
                    res.status(200).send(
                        JSON.stringify({
                            token: res.locals.newToken,
                            email: res.locals.decoded.email,
                            data: doc,
                        })
                    )
                }
            })
    }

    deleteAccount = async (req, res) => {
        const manager = await Manager.findOne({_id: req.body._id}).exec();
        const storeID = manager.storeID;

        Manager.deleteOne({ _id: manager._id }).exec();
        Store.deleteOne({ _id: storeID }).exec();
        Coupon.deleteMany({ storeID: storeID }).exec(),
        Employee.deleteMany({ managerID: storeID }).exec(),
        Product.deleteMany({ storeID: storeID }).exec(),
        ProductType.deleteMany({ storeID: storeID }).exec(),
        ProductJoinType.deleteMany({ storeID: storeID }).exec(),
        Revenue.deleteMany({ storeID: storeID }).exec(),
        Receipt.deleteMany({ storeID: storeID }).exec(),
        ReturnProduct.deleteMany({ storeID: storeID }).exec(),
        ShiftAssign.deleteMany({ storeID: storeID }).exec(),
        ShiftType.deleteMany({  storeID: storeID }).exec(),
        Regulation.deleteMany({ storeID }).exec(),
        TimeKeeping.deleteMany({ storeID }).exec(),
        NextWeekTimeKeeping.deleteMany({ storeID }).exec(),

        res.status(200).send("Delete account successfully!");
    }
}

module.exports = new meProfile();