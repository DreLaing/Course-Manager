const router = require('express').Router()
const Course = require('../models/courseModel')
const User = require('../models/userModel')
const Department = require('../models/departmentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// CREATE NEW DEPARTMENT
router.post('/new-department', (req,res)=>{
    const newDepartment = new Department({
        department: req.body.department
    })
    newDepartment.save()
    .then(department => res.json(department))
    .catch(err => res.json(err))
})

// GET DEPARTMENTS
router.get('/get-departments', (req, res)=>{
    Department.find()
    .then(departments => res.json(departments))
    .catch(err => res.json(err))
})

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
    Course.find().sort({"updatedAt": -1}).populate("department")
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
// GET COURSE BY ID
router.get('/get-course/:course', (req,res)=>{
    Course.findById(req.params.course).populate("department")
    .then(course => {
        const response = {
            department: course.department.department,
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
    Course.findByIdAndDelete(req.params.course, function(err, course){
        User.remove({
            "_id":{
                $in: [req.params.course]
            }
        })
    })
    .then(course => {
        res.json(`${course.coursename} deleted!`)
        console.log(`${course.coursename} deleted!`)
    })
    .catch(err => res.json(err))
})

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