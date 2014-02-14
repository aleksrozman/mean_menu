'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Orders = mongoose.model('Order'),
    Gatherings = mongoose.model('Gathering'),
    User = mongoose.model('User'),
    _ = require('lodash');

exports.user = function(req, res, next, id) {
    User.findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.user = user;
            next();
        });
};

exports.show = function(req, res) {
    res.jsonp(req.user);
};

exports.create = function(req, res) {
    var user = new User(req.body);

    user.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.destroy = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(user);
        }
    });
};

exports.all = function(req, res) {
    User.find().exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};

exports.gathering = function(req, res) {
    Orders.find({gathering: req.params.gathering}).select('user').populate('user').exec(function(err,users) {
        var users_ordered = users.map(function(u) { return u.user; });
        Gatherings.findOne({_id: req.params.gathering}).select('users').populate('users').exec(function(err, remaining_users){
            if(err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp({ordered: users_ordered, all: remaining_users.users});
            }
        });
    });
};