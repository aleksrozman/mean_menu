'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Schema
 */
var RestaurantSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: ''
    },
    menu: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default:''
    }
});

/**
 * Validations
 */
RestaurantSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
RestaurantSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('Restaurant', RestaurantSchema);
