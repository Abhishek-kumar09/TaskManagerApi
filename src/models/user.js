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
    }
})

UserSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
})

UserSchema.statics.findByCredential = async (email, password) => {
    const user = await User.findOne({ email })
    console.log(user)
    if (!user) {
        throw new Error("user not available")
    }
    console.log("before is math");

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Sorry! Password Incorrect")
    }

    return user
}

User = mongoose.model('User', UserSchema)


module.exports = User;