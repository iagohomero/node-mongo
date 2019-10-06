const UserController = require('./user-controller');
const passport = require('passport');

class AuthController{
    
    static routes() {
        return {
          login: '/auth/login',
          logout: '/auth/logout'
        }
    }

    login(){
        return (req, res) => {
            res.render('login');
        }
    }

    loginAction(){
        return (req, res, next) => {
            passport.authenticate('local', (error, user, info) => {
                if(info){
                    return res.render('login');     
                }
                if(error){
                    return next(error);
                }
                req.login(user, (error) => {
                    if(error){
                        return next(error);
                    }
                    return res.redirect(UserController.routes().index);
                });
            })(req, res, next)
        }; 
    }

    logout(){
        return (req, res, next) => {
            req.logout();
            return res.redirect(AuthController.routes().login);
        };
    }

}

module.exports = AuthController;