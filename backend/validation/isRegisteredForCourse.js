const User = require('../models/userModel')

const isRegistered = (req, res, next) =>{
    User.findById(req.params.user)
    .then(user =>{
        if(user.courses.indexOf(req.params.course)!== -1){
            const registered = 'registered'
            req.registered = 'yes'
            next()
        } else {
            req.registered = 'no'
            if(user.coursesCompleted.indexOf(req.params.course)!== -1){
                req.completed = 'yes'
            }
            else{
                req.completed = 'no'
            }
            next()
        }
    })
}

module.exports = isRegistered