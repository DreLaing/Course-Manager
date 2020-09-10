const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    comment: {type: String},
    rating: {type: String, enum:['1','2','3','4','5','No rating'], default: 'No rating'}
},{
    timestamps:true
}
)

const courseSchema = mongoose.Schema({
    coursename: {type: String, required: true},
    // department:{type: String, enum:['Graphic Design', 'Web Development', 'Video Production', 'Digital Advertising', 'All Departments'], default:'All Departments'},
    department: {type: mongoose.Schema.Types.ObjectId, ref:'Department'},
    content:[{
        resource: String,
        link: String,
    }],
    feedback: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
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


