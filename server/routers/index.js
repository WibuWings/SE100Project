const authRouter = require('./auth');
const profileRoutes = require('./profile');
function route(app) {
    app.use("/",authRouter);
    app.use("/api/profile",profileRoutes);
}

module.exports = route;