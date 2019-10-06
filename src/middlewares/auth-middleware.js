const AuthController = require('../controllers/auth-controller');
const authRoutes = AuthController.routes();

function authenticationMiddleware () {  
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect(authRoutes.login);
    }
}

module.exports = authenticationMiddleware;