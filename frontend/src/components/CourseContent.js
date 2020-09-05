import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CourseCard from './CourseCard'
import axios from 'axios'
import '../ui/CourseContent.css'
import CommentCard from './user/CommentCard'
import UserNav from './user/UserNav'

const CourseContent = (props) => {
    const userID = JSON.parse(localStorage.getItem("user"))
    const courseID = JSON.parse(localStorage.getItem("course"))
    const [feedback, setFeedback] = useState({
        comment: '',
        rating: ''
    })

    const [courseInfo, setCourseInfo] = useState({
        coursename: '',
        department: '',
        content: [],
        feedback: [],
        skills: [],
        registered: ''
    })

    const submitFeedback = () =>{
        if(feedback.comment!==''){
            axios.post(`http://localhost:5000/user/feedback/${userID}/${courseID}`,{
            comment: feedback.comment,
            rating: feedback.rating
        })
        .then(res => setCourseInfo({...courseInfo, feedback: res.data.feedback}))
        .catch(err => console.log(err))
        }
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/get-course/${userID}/${courseID}`)
        .then(course => {
            console.log(course.data)
            setCourseInfo({
                coursename: course.data.coursename,
                department: course.data.department,
                feedback: course.data.feedback,
                skills: course.data.skills,
                content: course.data.content,
                registered: course.data.registered
            })
        })
        .catch(err => console.log(err))
    }, [])

    const registerForCourse = () =>{
        axios.post(`http://localhost:5000/user/add-course/${userID}/${courseID}`,{})
        .then(setCourseInfo({...courseInfo, registered:'yes'}))
        .catch(err => console.log(err))
    }

    const markAsCompleted = () =>{
        axios.post(`http://localhost:5000/user/completed/${userID}/${courseID}`,{})
        .then(setCourseInfo({...courseInfo, registered:'no'}))
        .catch(err => console.log(err))
    }
    
    return (
        <>
        <UserNav />
        <div className='container'>
            <div className='course-content-container'>
                
                {courseInfo.registered==='no' ? <button 
                type="button" 
                class="btn btn-indigo"
                onClick={()=> registerForCourse()}
                >
                    Register for course
                    </button> 
                    : 
                    <button 
                    type="button" 
                    class="btn btn-blue-grey"
                    onClick={()=> markAsCompleted()}
                    >
                        Mark as completed
                        </button>}

                    <h1 className='course-content-title'>{courseInfo.coursename}</h1>
                    <span className='course-content-department'>{courseInfo.department}</span>
                        <div className='content-resource-skill-container'>
                            <div>
                                {courseInfo.content.map(link => {
                                    return <div>
                                        <h3 className='resource-text'> Resource: {link.resource} </h3>
                                        <h5><a href={link.link} target="_blank">Link to resource</a></h5>
                                        <hr/>
                                    </div>
                                })}
                            </div>
                            <div>
                                <h4 className='skills-text'>Skills <i class="fa fa-cogs" aria-hidden="true"></i></h4>
                                <hr/>
                                {courseInfo.skills.map(skill => {
                                return <>
                                        <h4>{skill}</h4>
                                        <hr/>
                                    </>
                                })}
                            </div>
                        </div>
                </div>
            
            <div class="md-form feedback-container">
            <p>Give us feedback:</p>
            <div class="md-form amber-textarea active-amber-textarea">
                <i class="fas fa-pencil-alt prefix"></i>
                <textarea id="form22" class="md-textarea form-control" rows="3"
                    value={feedback.comment} onChange={e => {
                        setFeedback({...feedback, comment:e.target.value})
                    }}>
                </textarea>
                <label for="form22">Leave a comment ...</label>
            </div>
                <select class="mdb-select md-form" onChange={e => setFeedback({...feedback, rating: e.target.value})}>
                    <option value="" disabled selected>Course Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button type="submit" class="btn btn-deep-orange" onClick={()=> {
                    console.log(feedback)
                    setFeedback({comment:'', rating:''})
                    submitFeedback()
                }}>Submit feedback</button>
            </div>
            
            Comments:
            <hr/>
            {courseInfo.feedback.map(feedback =>{
                return <CommentCard user={feedback.user} comment={feedback.comment} rating={feedback.rating} />
            })}
        </div>
        </>
    )
}

export default CourseContent
