const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:[true,"Must provide description"],
    },
    check:{
        type:Boolean,
        default:false,
    },
})


module.exports =  mongoose.model('Task',TaskSchema)