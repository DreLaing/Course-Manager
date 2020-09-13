const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
    coursename: {type: String, required: true},
    department: {type: mongoose.Schema.Types.ObjectId, ref:'Department'},
    content:[{
        resource: String,
        link: String,
    }],
    feedback: [{
        user: String,
        userID: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
        comment: String,
        rating: {type: String, enum:['1','2','3','4','5'], default: '3'}
    }],
    skills:[String]
},{
    timestamps:true
}
)

const Course = mongoose.model('Course', courseSchema);
module.exports = Course


