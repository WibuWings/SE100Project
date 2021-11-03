
const {getCurrentDateTimeString} = require('../helper/DateTime');
//db models
const Employee = require('../models/employee');
const ShiftType = require('../models/shiftType');
const ShiftAssign = require('../models/shiftAssign');
const TimeKeeping = require('../models/timeKeeping');
const NextWeekTimeKeeping = require('../models/nextWeekTimeKeeping');

class EmployeeTab {
    //shift Assign
    createEmployee = async (req, res) => {
        
    }








    getShiftAssign = async (req, res) => {
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