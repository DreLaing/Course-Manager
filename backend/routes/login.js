const router = require('express').Router()
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.post('/', (req, res)=>{
    const email = req.body.email;
    let user;
    User.find({email: email})
    .then(queryUser => {
        if(queryUser.length!==0){
            // console.log(queryUser)
            user = queryUser
            bcrypt.compare(req.body.password, user[0].password, (err, isMatch) =>{
                if(!isMatch){
                    console.log('password')
                    res.status(203).json('Wrong password')
                }
                else if (isMatch){
                    if(user[0].userType==='Employee'){
                        console.log('employee match')
                        const token = jwt.sign({
                            _id: user[0]._id,
                            email: user[0].email,
                            courses: user[0].courses,
                            userType: user[0].userType
                        }, process.env.JWT_KEY, {
                            expiresIn: '3h'
                        })
                        res.status(200).json(token)
                    }
                    else{
                        console.log('admin match')
                        const token = jwt.sign({
                            _id: user[0]._id,
                            email: user[0].email,
                            courses: user[0].courses,
                            userType: user[0].userType
                        }, process.env.JWT_ADMIN_KEY, {
                            expiresIn: '3h'
                        })
                        res.status(200).json(token)
                    }
                }      
            })
        }
    else{
        res.status(404).json('No registered user with that email')
    }})
    .catch(err => res.json(err))
})

module.exports = router