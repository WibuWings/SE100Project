
const {getCurrentDateTimeString} = require('../helper/DateTime');
//db models
const Employee = require('../models/employee');
const ShiftType = require('../models/shiftType');
const ShiftAssign = require('../models/shiftAssign');
const TimeKeeping = require('../models/timeKeeping');
const NextWeekTimeKeeping = require('../models/nextWeekTimeKeeping');

class EmployeeTab {
    //shift Assign
    getShiftAssign = async (req, res) => {
        var filter = typeof req.body.filter === 'object' ? req.body.filter : JSON.parse(req.body.filter);
        Employee.find(filter)
        .exec()
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

    createShiftAssign = async (req, res) => {

    };

    deleteShiftAssign = async (req, res) => {

    };
    //

    //timekeeping
    getTimeKeeping = async (req, res) => {

    };

    createTimeKeeping = async (req, res) => {

    };

    updateTimeKeeping = async (req, res) => {

    };

    deleteTimeKeeping = async (req, res) => {

    };


    //
};

module.exports = new EmployeeTab();