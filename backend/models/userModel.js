const mongoose = require('mongoose')

const courseInfo = mongoose.Schema({
    course:{type: mongoose.Schema.Types.ObjectId, ref:'Course'},
    // status:{type: String, enum:['In progress', 'Finished'], default:'In progress'}
},{
    timestamps:true
})

const userSchema = mongoose.Schema({
    email:{type:String, unique:true},
    password:{type:String},
    userType: {type: String, enum:['Employee', 'Admin'], default:'Employee'},
    courses:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}],
    coursesCompleted:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
},{
    timestamps:true
})

const User = mongoose.model('User', userSchema)
module.exports = User