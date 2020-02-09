const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
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
    }
})

UserSchema.pre('save',async function() {
    if (this.isModified('password')) {       
        this.password = await bcrypt.hash(this.password, 8)       
    }
})

User = mongoose.model('User', UserSchema)


module.exports = User;