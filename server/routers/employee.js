
const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');
const {AuthMiddleware} = require('../helper/JWT');

router.get('/', AuthMiddleware, employeeController.getEmployee);
router.post('/', AuthMiddleware, employeeController.createEmployee);
router.put('/', AuthMiddleware, employeeController.updateEmployee);
router.delete('/', AuthMiddleware, employeeController.deleteEmployee);
router.get('/delete', AuthMiddleware, employeeController.getEmployeeDelete);
router.patch('/delete', AuthMiddleware, employeeController.restoreEmployee);
router.delete('/delete', AuthMiddleware, employeeController.deleteEmployeeforever);
// Thắng
router.get('/shift-assign',AuthMiddleware, employeeController.getShiftAssign);
router.post('/shift-assign',AuthMiddleware, employeeController.createShiftAssign);
router.put('/shift-assign',AuthMiddleware, employeeController.updateShiftAssign);
router.delete('/shift-assign',AuthMiddleware, employeeController.deleteShiftAssign);
// offDay
router.get('/off-day',AuthMiddleware, employeeController.getOffDay);
router.post('/off-day',AuthMiddleware, employeeController.createOffDay);
router.put('/off-day',AuthMiddleware, employeeController.updateOffDay);
router.delete('/off-day',AuthMiddleware, employeeController.deleteOffDay);
///////
router.get('/time-keeping', AuthMiddleware, employeeController.getTimeKeeping)
router.post('/time-keeping', AuthMiddleware, employeeController.createTimeKeeping)
router.put('/time-keeping', AuthMiddleware, employeeController.updateTimeKeeping)
////////////////////////////////

module.exports = router;