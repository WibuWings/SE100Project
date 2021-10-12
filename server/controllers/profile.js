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

class meProfile {
    AuthVerify (req, res, next) {
        const token  = req.header('authorization');
        token = token.split(' ')[1];
        if(!token) return res.status(401).send('Access Denied')
        jwt.verify(token,PRIVATE_KEY, (err,data) => {
            res.data = data;
            next();
        })
        if(err){
            return res.status(400).send('Invalid token')
        }
    
    }
    verifySignIn = async (req, res) => {
        const data = req.body
        accessToken = jwt.sign(...data, PRIVATE_KEY, {expiresIn: 900})
        res.json(accessToken)
    }
        
    Profile = async (req, res) => {
        const manager = Manager.find({_id : req.body.email})
        const store = Store.find({_id :req.body._id})
        res.status(200).send(
            JSON.stringify({
                data:{manager,store}
            })
        )
    }
    updateProfileData = async (req, res) =>{
        const idcheck = req.body._id
        const email = req.body.email;   
        const newfirstName = req.body.firstName;
        const newlastName = req.body.lastName;
        const newphoneNumber = req.body.phoneNumber;
        const newAddress = req.body.address;
        const newProvince = req.body.province;
        const newDistrict = req.body.district;
        const newSalary = req.body.salary;
        Manager.findOneAndUpdate(
            {
                _id: "lngthinphc@gmail.com_Google",
            },
            {$set:{
                lastName:newlastName,
                firstName:newfirstName,
                phoneNumber:newphoneNumber,
                address:newAddress,
                province:newProvince,
                district:newDistrict,
                salary:newSalary,
                storeID: email,
            }},
            {
                returnOriginal: false,
            },
            (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            
                console.log(doc);
            });
          
    }
        
}
module.exports = new meProfile();