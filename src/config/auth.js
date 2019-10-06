const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser(function(user, done){
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done){
        User.findOne({ _id : id }, function(err, user){
            done(err, user);
        });
    });

    passport.use(new LocalStrategy( { 
        usernameField: 'email',
        passwordField: 'password'
    },
    (username, password, done) => {
        User.findOne({ email: username }, function(err, user){
            if(err){ 
                return done(err)
            }
            // usuário inexistente
            if (!user) {
                return done(null, false)
            }
            bcrypt.compare(password, user.password, (err, isValid) => {
                if (err) { return done(err) }
                if (!isValid) { return done(null, false) }
                return done(null, user)
            })
        });
    }
    ));
};