const User = require('../models/userModel')

const isRegistered = (req, res, next) =>{
    User.findById(req.params.user)
    .then(user =>{
        if(user.courses.indexOf(req.params.course)!== -1){
            const registered = 'registered'
            req.registered = 'yes'
            next()
        } else {
            const registered = 'registered'
            req.registered = 'no'
            next()
        }
    })
}

module.exports = isRegistered