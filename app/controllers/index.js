'use strict';

exports.render = function(req, res) {
    res.render('index', {
        user: 'null' // TODO logins for the future
    });
};
