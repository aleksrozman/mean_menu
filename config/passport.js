'use strict';

var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    config = require('./config');


module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        console.log(user);
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, function(err, user) {
            console.log(user);
            done(err, user);
        });
    });

    //Use local strategy
    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({
                name: username
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                return done(null, user);
            });
        }
    ));

};