const router = require('express').Router()
const User = require('../models/userModel')
const Course = require('../models/courseModel')
const isRegistered = require('../validation/isRegisteredForCourse')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// ----CREATES USER----
router.route('/new-user').post(async (req, res) =>{
    const email = req.body.email
    const password = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email,  
        password
    })
    newUser.save()
    .then(user =>{
        res.json(user)
    })
    .catch(err => res.json(`ERROR: ${err}`))
})

// ----GET ALL COURSES----
router.route('/get-courses').get((req,res)=>{
    Course.find()
    .then(course => {
        const response = []
        course.map(course => response.push({coursename: course.coursename, _id: course._id, department: course.department}))
        res.json(response)
    })
    .catch(err => res.json(err))
})

// GET COURSE BY ID
router.get('/get-course/:user/:course', isRegistered, (req,res)=>{
    Course.findById(req.params.course)
    .then(course => {
        const response = {
            department: course.department,
            skills: course.skills,
            coursename: course.coursename,
            content: course.content,
            feedback: course.feedback,
            registered: req.registered,
            completed: req.completed
        }
        // console.log(response)
        res.json(response)
    })
    .catch(err => res.json(err))
})

// ----ADD COURSES TO USER PROFILE----
router.route('/add-course/:user/:course').post((req,res)=>{
    User.findById(req.params.user)
    .then(user =>{
        user.courses.push(req.params.course)
        user.save()
        console.log(user)
        res.json(user)
    })
    .catch(err => res.json(err))
})

// MARK COURSE AS COMPLETED
router.route('/completed/:user/:course').post((req,res)=>{
    User.findById(req.params.user)
    .then(user =>{
        user.courses.pull(req.params.course)
        user.coursesCompleted.push(req.params.course)
        user.save()
        res.json(user)
    })
    .catch(err => res.json(err))
})

// GET COMPLETED COURSES
router.get('/completed/:user', (req, res)=>{
    User.findById(req.params.user).populate("coursesCompleted")
    .then(user =>{
        res.json(user.coursesCompleted)
    })
    .catch(err => res.json(err))
})

// ----ADD FEEDBACK TO COURSE----
router.route('/feedback/:user/:course').post((req,res)=>{
    Course.findById(req.params.course)
    .then(course =>{
        const feedback = {
            user: req.params.user,
            comment: req.body.comment,
            rating: req.body.rating
        }
        course.feedback.unshift(feedback)
        course.save()
        console.log(course)
        res.json(course)
    })
    .catch(err => {
        res.json(err)
        console.log(err)
    })
})

// ----SEARCH FOR COURSE----
router.route('/find/:searchValue').get((req,res)=>{
    Course.find({$or: [{coursename: req.params.searchValue}, {skills: req.params.searchValue}]})
    .then(course => res.json(course))
    .catch(err => res.json(`Cannot find course`))
})

// ----GET USER INFORMATION----
router.route('/:id').get((req,res)=>{
    User.find({"_id": req.params.id}).populate("courses")
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// ----LOGIN----
router.route('/login').post((req,res)=>{
    const email = req.body.email;
    let user;
    User.find({email: email, userType:'Employee'})
    .then(queryUser => {
        if(queryUser.length!==0){
            // console.log(queryUser)
            user = queryUser
                bcrypt.compare(req.body.password, user[0].password, (err, isMatch) =>{
                    if(!isMatch){
                        res.status(203).json('Wrong password')
                    }
                    else{
                        const token = jwt.sign({
                            _id: user[0]._id,
                            email: user[0].email,
                            courses: user[0].courses,
                            userType: user[0].userType
                        }, process.env.JWT_KEY, {
                            expiresIn: '1h'
                        })
                        res.status(200).json(token)
                        console.log(token)
                    }      
                })
            }
        else{
            res.status(404).json('No registered user with that email')
        }})
    .catch(err => `Error: ${err}`)
})

module.exports = router