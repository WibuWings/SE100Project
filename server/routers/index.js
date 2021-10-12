const authRouter = require('./auth');
const profileRoutes = require('./profile');
function route(app) {
    app.use("/",authRouter);
    app.use("/api",profileRoutes);
}

module.exports = route;