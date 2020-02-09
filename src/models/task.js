
const mongoose = require('mongoose')
const validator = require('validator')

const taskSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
})

 Tasks = mongoose.model('Tasks', taskSchema)
module.exports = Tasks;