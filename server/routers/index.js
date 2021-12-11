const authRouter = require('./auth');
const profileRoutes = require('./profile');
const productRouter = require('./product');
const employeeRouter = require('./employee');
const sellproductRouter = require('./receipt');
const couponRouter = require('./coupon')
const reportRouter = require('./report')

function route(app) {
    app.use("/",authRouter);
    app.use("/api/coupon",couponRouter);
    app.use("/api/profile",profileRoutes);
    app.use("/api/product",productRouter);
    app.use("/api/employee",employeeRouter);
    app.use("/api/sell-product",sellproductRouter);
    app.use("/api/report",reportRouter);
}

module.exports = route;