const mongoose = require('mongoose')
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
            if (value.length < 7 && value.toLoweCase().include('password')) {
                throw new Error('Choose better Password')
            }
        }
    }
})

UserSchema.pre('save', function async() {
    if (mongoose.isModified(this.password)) {
        this.password = bcrypt.hash(this.password, 8)
    }
})

User = mongoose.model('User', UserSchema)


module.exports = User;


// Sample Codes 
// email : {
//     type : String,
//     required :true,
//     trim : true,
//     validate(value)  {
//         if(!validator.isEmail(value)) {
//             throw new Error('Email not Valid!')                
//         }
//     }
// },
// password : {
//     type : String,
//     required : true,
//     trim :true,
//     minlength : 7,
//     validate(value) {
//         if(value.toLowerCase().includes('password')) {
//             throw new Error('Your password must not include password as String')             
//         }
//     }
// },