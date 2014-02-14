'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Item = mongoose.model('Item'),
    Category = mongoose.model('CategoryItems'),
    _ = require('lodash');


exports.category = function(req, res, next, id) {
    Category.load(id, function(err, category) {
        if (err) return next(err);
        if (!category) return next(new Error('Failed to load category ' + id));
        req.category = category;
        next();
    });
};

exports.item = function(req, res, next, id) {
    Item.load(id, function(err, item) {
        if (err) return next(err);
        if (!item) return next(new Error('Failed to load item ' + id));
        req.item = item;
        next();
    });
};

exports.updateItem = function(req, res) {
    var item = req.item;

    item = _.extend(item, req.body);

    item.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(item);
        }
    });
};

exports.updateCategory = function(req, res) {
    var category = req.category;

    category = _.extend(category, req.body);

    category.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(category);
        }
    });
};

exports.destroyItem = function(req, res) {
    var item = req.item;
    
    Category.update({}, {$pull : {items: req.item}});
    
    item.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(item);
        }
    });
};

exports.destroyCategory = function(req, res) {
    var category = req.category;
    
    category.items.map(function(item) {
        item.remove();
    });
    
    category.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(category);
        }
    });
};

exports.showItem = function(req, res) {
    res.jsonp(req.item);
};

exports.showCategory = function(req, res) {
    res.jsonp(req.category);
};


exports.createItem = function(req, res) {
    var item = new Item(req.body);

    item.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(item);
        }
    });
};

exports.createCategory = function(req, res) {
    var category = new Category(req.body);

    category.save(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(category);
        }
    });
};

exports.filtered = function(req, res) {
    var filter = (req.query.restaurant === '0') ? {} : {restaurant: req.query.restaurant};
    Category.find(filter).populate('items').exec(function(err, items) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(items);
        }
    });
};

exports.all = function(req, res) {
    Category.find().exec(function(err, categories) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(categories);
        }
    });
};