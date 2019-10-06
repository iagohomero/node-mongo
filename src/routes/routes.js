const indexRoutes = require('./home-routes');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users-routes');

module.exports = (app) => {
    app.use(indexRoutes);
    app.use(authRoutes);
    app.use(userRoutes);
}