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
const {JWTVerify} = require("../helper/JWT");

class myReceipt {
    addReciept= async (req, res) => {
        const receipt = req.body.
        newReciept = new Receipt({

        })
    };
    updateReciept= async (req, res) => {

    };
}
module.exports = new myReceipt();