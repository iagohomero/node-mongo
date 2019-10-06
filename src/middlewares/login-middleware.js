const HomeController = require('../controllers/home-controller');
const homeRoutes = HomeController.routes();

function loginMiddleware() {  
    return function (req, res, next) {
        if (req.isAuthenticated()) {
            return res.redirect(homeRoutes.home);
        }
        return next();
    }
}

module.exports = loginMiddleware;