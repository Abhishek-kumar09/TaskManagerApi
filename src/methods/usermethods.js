const UserSchema = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'IamAbhishek',{expiresIn: '5 days'})
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}



User = mongoose.model('User', UserSchema)
module.exports = User;