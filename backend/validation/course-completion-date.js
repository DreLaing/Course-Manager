const User = require('../models/userModel')

module.exports = completionTime = (req,res,next) =>{
    User.findById(req.params.user)
    .then(user =>{
        const registered = user.dateRegistered.filter(course => { return course._id == req.params.course})
        const completed = user.dateCompleted.filter(course =>{ return course._id == req.params.course})
        console.log(registered)
        
        let dateRegistered = registered[0].date.toString()
        dateRegistered.split("T")[0]
        // console.log(dateRegistered)

        let dateCompleted = completed[0].date.toString()
        dateCompleted.split("T")[0]
        // console.log(Math.abs(new Date(dateCompleted) - new Date(dateRegistered))/(1000 * 60 * 60))
        var completion = (Math.abs(new Date(dateCompleted) - new Date(dateRegistered))/(1000 * 60 * 60 * 24))

         if(completion < 0.01){           
            completion = (Math.abs(new Date(dateCompleted) - new Date(dateRegistered))/(1000 * 60))
            completion = completion.toString().split('.')[0] + ' minutes'
        }

        else if(completion < 0.1){
            completion = (Math.abs(new Date(dateCompleted) - new Date(dateRegistered))/(1000 * 60 * 60))
            completion = completion.toString().split('.')[0] + ' hours'
        }

        else if(completion < 1){
            completion = (Math.abs(new Date(dateCompleted) - new Date(dateRegistered))/(1000 * 60 * 60 * 24)) + ' days'
            completion = completion.toString().split('.')[0] + ' days'
            
        }

        console.log(completion)
        req.duration = completion

        next()
    })
    .catch(err => {
        console.log(err)
        next()
    })
}