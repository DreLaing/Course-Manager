const router = require('express').Router()
const Course = require('../models/courseModel')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')


// CREATES NEW USER
router.route('/new-user').post(async (req, res) =>{
    const email = req.body.email
    const userType = req.body.type
    const password = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        email,  
        password,
        userType
    })
    newUser.save()
    .then(user =>{
        res.json(user)
    })
    .catch(err => res.json(`ERROR: ${err}`))
})
// GET ALL COURSES
router.route('/get-courses').get((req,res)=>{
    Course.find().sort({"updatedAt": -1})
    .then(course => {
        const response = []
        course.map(course => {
            response.push({coursename: course.coursename, _id: course._id, department: course.department})
        })
        res.json(response)
        console.log(response)
    })
    .catch(err => res.json(err))
})
// ----CREATES NEW COURSE----
router.route('/create-course').post((req,res)=>{
    const coursename = req.body.coursename
    const department = req.body.department
    const newCourse = new Course({
        coursename,
        department,
        content: [...req.body.content],
        skills: [...req.body.skills]
    })
    newCourse.save()
    .then(course =>{
        res.json(course)
    })
    .catch(err => res.json((`ERROR: ${err}`)))
})

// EDIT COURSE INFO
router.route('/edit-course/:id').post((req,res)=>{
    Course.findByIdAndUpdate(req.params.id)
    .then(course => {
        course.coursename = req.body.coursename,
        course.department = req.body.department,
        course.skills = req.body.skills,
        course.content = req.body.content
        course.save()
        res.json(course)
    })
    .catch(err => res.json(err))
})

// DELETE COURSE
router.route('/delete-course/:course').delete((req,res)=>{
    Course.findByIdAndDelete(req.params.course)
    .then(course => res.json(`${course.coursename} deleted!`))
    .catch(err => res.json(err))
})

module.exports = router