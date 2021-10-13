const authRouter = require('./auth');
const profileRoutes = require('./profile');
const productRouter = require('./product');

function route(app) {
    app.use("/",authRouter);
    app.use("/api/profile",profileRoutes);
    app.use("/api/product",productRouter);
}

module.exports = route;