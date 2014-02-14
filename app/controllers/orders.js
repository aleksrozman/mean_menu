'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('CategoryItems'),
    Order = mongoose.model('Order'),
    _ = require('lodash');


exports.order = function(req, res, next, id) {
    Order.load(id, function(err, order) {
        if (err) return next(err);
        if (!order) return next(new Error('Failed to load order ' + id));
        req.order = order;
        next();
    });
};

exports.create = function(req, res) {
    var order = new Order(req.body);
    order.ip = req.connection.remoteAddress;

    order.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(order);
        }
    });
};

exports.update = function(req, res) {
    var order = req.order;

    order = _.extend(order, req.body);
    order.ip = req.connection.remoteAddress;

    order.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(order);
        }
    });
};

exports.destroy = function(req, res) {
    var order = req.order;

    order.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(order);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.order);
};

exports.filtered = function(req, res) {
    var filter = (req.query.restaurant === '0') ? {} : {restaurant: req.query.restaurant};
    Category.find(filter).select('items').exec(function(err, categories) {
        var items = _.flatten(categories, 'items');
        Order.find({gathering: req.query.gathering}).populate('items.item').where('items.item').in(items).sort('-created').populate('user').exec(function(err, orders) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                orders.forEach(function(order) {
                    order.items = order.items.filter(function(item) {
                        return items.some(function(i) {
                            return (item.item) ? i.equals(item.item._id) : false; // item removed
                        });
                    });
                });
                res.jsonp(orders);
            }
        });
    });
};

exports.all = function(req, res) {
    Order.find().sort('-created').populate('items.item').populate('user').exec(function(err, orders) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(orders);
        }
    });
};