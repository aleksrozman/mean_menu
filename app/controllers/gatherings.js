'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Gathering = mongoose.model('Gathering'),
    _ = require('lodash');


exports.gathering = function(req, res, next, id) {
    Gathering.load(id, function(err, gathering) {
        if (err) return next(err);
        if (!gathering) return next(new Error('Failed to load gathering ' + id));
        req.gathering = gathering;
        next();
    });
};

exports.create = function(req, res) {
    var gathering = new Gathering(req.body);

    gathering.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(gathering);
        }
    });
};

exports.update = function(req, res) {
    var gathering = req.gathering;

    gathering = _.extend(gathering, req.body);

    gathering.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(gathering);
        }
    });
};

exports.destroy = function(req, res) {
    var gathering = req.gathering;

    gathering.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(gathering);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.gathering);
};

exports.all = function(req, res) {
    var filter = (req.query.active) ? {deadline: {$gte: new Date()}} : {};
    Gathering.find(filter).sort('-created').populate('restaurants').populate('users').exec(function(err, gatherings) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(gatherings);
        }
    });
};
