const authRouter = require('./auth');
const profileRoutes = require('./profile');
function route(app) {
    app.use("/",authRouter);
    app.use("/profile",profileRoutes);
}

module.exports = route;