'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * User Schema
 */
var UserSchema = new Schema({
    name: String,
    email: String,
    username: {
        type: String,
        unique: true
    },
});

mongoose.model('User', UserSchema);