
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
// Thắng

////////////////////////////////

module.exports = router;