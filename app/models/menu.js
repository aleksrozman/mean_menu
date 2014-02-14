'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Schema
 */
var ItemSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    price: [{
        description: {
            type: String,
            default: ''
        },
        value: {
            type: Number,
            default: 0
        }
    }]
});

var CategoryItemsSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: ''
    },
    restaurant: {
        type: Schema.ObjectId,
        ref: 'Restaurant'
    },
    type: {
        type: String,
        enum: ['0_Appetizer', '1_Entree', '2_Main', '3_Side', '4_Dessert'],
        default: '2_Main'
    },
    description: {
        type: String,
        default: ''
    },
    items: [{
        type: Schema.ObjectId,
        ref: 'Item'
    }]
});

/**
 * Validations
 */
CategoryItemsSchema.path('name').validate(function(name) {
    return name.length;
}, 'Must have a name');

/**
 * Statics
 */
CategoryItemsSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('items').exec(cb);
};

ItemSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).exec(cb);
};

mongoose.model('CategoryItems', CategoryItemsSchema);
mongoose.model('Item', ItemSchema);
