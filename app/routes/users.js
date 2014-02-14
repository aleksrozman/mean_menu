'use strict';

// users routes use users controller
var users = require('../controllers/users');

module.exports = function(app, passport) {

    app.get('/users', users.all);
    app.get('/users/remaining/:gathering', users.gathering);
    app.post('/users', users.create);
    app.get('/users/:userId', users.show);
    app.put('/users/:userId', users.update);
    app.del('/users/:userId', users.destroy);
    
    // TODO future login
    app.post('/login', passport.authenticate('local', {
        failureRedirect : '/orders',
        successRedirect : '/'
    }));

    // Finish with setting up the orderId param
    app.param('userId', users.user);

};