
const mongoose = require('mongoose')
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