'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Schema
 */
var GatheringSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    deadline: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: 'New Event'
    },
    users: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    restaurants: [{
        type: Schema.ObjectId,
        ref: 'Restaurant'
    }]
});

/**
 * Validations
 */

/**
 * Statics
 */
GatheringSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('users').populate('restaurants').exec(cb);
};

mongoose.model('Gathering', GatheringSchema);
