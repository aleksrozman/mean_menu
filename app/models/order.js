'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Schema
 */
var OrderSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    placed: {
        type: Date
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    gathering: {
        type: Schema.ObjectId,
        ref: 'Gathering'
    },
    ip: {
        type: String,
        default: ''
    },
    items: [{
        item: {
            type: Schema.ObjectId,
            ref: 'Item'
        },
        price_index: {
            type: Number,
            default: 0
        },
        modifications: {
            type: String,
            default: ''
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */
OrderSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('items.item').populate('user').populate('gathering').exec(cb);
};

mongoose.model('Order', OrderSchema);
