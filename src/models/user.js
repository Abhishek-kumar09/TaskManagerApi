const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.length < 7 && value.toLowerCase().includes('password')) {
                throw new Error('Choose better Password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true            
     }    
    }],
    // token : {}
})

module.exports = UserSchema;