const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./configDB'); // connect MongoDB 
const PORT = process.env.PORT || 5000; // port number
const app = express();
const route = require('./routers/index'); // router impl

//some middleware
app.use(bodyParser.json({ limit: 1000 }));
app.use(bodyParser.urlencoded({extended: true, limit: 1000 }));
app.use(cors());

//connect to MongoDB
connectDB();
// pass app into router
route(app);

//app listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// const ShiftAssign = require('./models/shiftAssign');
//  const Employee = require('./models/employee');
//  const ShiftType = require('./models/shiftType');


//  const test = async function () {
// //      const sshiftType = new ShiftType({
// //     _id: {
// //         shiftID: "shiftID",
// //         storeID: "123",
// //         createdAt: new Date("2020-10-10"),
// //     },
// //     name: "ca 1",
// //  });

// //  sshiftType.save()
// // var employee = new Employee({
// //     _id: {
// //         employeeID: "123",
// //         storeID: "123",
// //     },
// //     managerID: "manager",
// //     password: "pass",
// //     firstName: "thang",
// //     lastName: "pham",
// //     phoneNumber: "0034",
// //     dateOfBirth: new Date("2000-10-10"),
// //     email: "email@gmail.com",
// //     address: "newaddress",
// //     cardID: "cardID",
// // });

// // employee.save();
// const employee = await Employee.findOne({"_id.storeID":"123"})
// const shiftType = await ShiftType.findOne({"_id.storeID":"123"})
// const shiftAssign = await ShiftAssign.findOne({"_id.storeID":"123"})


// console.log(shiftAssign.populate('employee'))
// // const shiftAssign = new ShiftAssign({
// //     _id: {
// //         dateInWeek: "thứ 3",
// //         storeID: "123",
// //         shiftType: shiftType,
// //         employee: employee,
// //     },
// //     name:"abc",
// // });
// // shiftAssign.save().then(data => console.log(data))
//  }

//  test();