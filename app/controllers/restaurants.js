'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Category = mongoose.model('CategoryItems'),
    Item = mongoose.model('Item'),
    Gathering = mongoose.model('Gathering'),
    Restaurant = mongoose.model('Restaurant'),
    _ = require('lodash');


exports.restaurant = function(req, res, next, id) {
    Restaurant.load(id, function(err, restaurant) {
        if (err) return next(err);
        if (!restaurant) return next(new Error('Failed to load restaurant ' + id));
        req.restaurant = restaurant;
        next();
    });
};

exports.update = function(req, res) {
    var restaurant = req.restaurant;

    restaurant = _.extend(restaurant, req.body);

    restaurant.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(restaurant);
        }
    });
};

exports.port = function(req, res) {
    var items = require('./import');
    items.map(function(category) {
        var newCategory = new Category({name: category.name,
                                        description: category.description,
                                        restaurant: req.restaurant});
        newCategory.items = [];
        category.items.map(function(item) {
            var newItem = new Item(item);
            newItem.save(function(err) {
                if(err) {
                    console.log('Uh oh' + err);
                } else {
                    newCategory.items.push(newItem);
                    newCategory.save();
                }
            });
        });
    });
    res.jsonp(items);
};

exports.destroy = function(req, res) {
    var restaurant = req.restaurant;
    
    Category.find({restaurant: restaurant}).populate('items').exec(function(err, categories){
        for(var c = 0; c < categories.length; c++) {
            for(var i = 0; i < categories[c].items.length; i++) {
                categories[c].items[i].remove();
            }
            categories[c].remove();
        }
    });
    
    Gathering.update({}, {$pull : {restaurants: req.restaurant}});
    
    restaurant.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(restaurant);
        }
    });
};


exports.create = function(req, res) {
    var restaurant = new Restaurant(req.body);

    restaurant.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(restaurant);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.restaurant);
};

exports.all = function(req, res) {
    Restaurant.find().sort('-name').exec(function(err, restaurants) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(restaurants);
        }
    });
};