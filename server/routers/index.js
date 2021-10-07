
const authRouter = require('./auth');

function route(app) {
    app.use("/",authRouter);
}

module.exports = route;