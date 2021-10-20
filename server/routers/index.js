const authRouter = require('./auth');
const profileRoutes = require('./profile');
const productRouter = require('./product');
const employeeRouter = require('./employee');

function route(app) {
    app.use("/",authRouter);
    app.use("/api/profile",profileRoutes);
    app.use("/api/product",productRouter);
    app.use("/api/employee",employeeRouter);
}

module.exports = route;