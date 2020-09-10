import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
// import CourseCard from '../CourseCard'
import axios from 'axios'
import '../../ui/CourseContent.css'
import CommentCard from '../CommentCard'
import UserNav from './UserNav'
import CheckIcon from '@material-ui/icons/Check';
import LinkIcon from '@material-ui/icons/Link';
import StarRateIcon from '@material-ui/icons/StarRate';

const CourseContent = (props) => {
    const token = localStorage.getItem("token")
    const history = useHistory()
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
        registered: '',
        completed:'',
        duration: ''
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
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`http://localhost:5000/user/get-course/${userID}/${courseID}`)
        .then(course => {
            console.log(course.data)
            setCourseInfo({
                coursename: course.data.coursename,
                department: course.data.department,
                feedback: course.data.feedback,
                skills: course.data.skills,
                content: course.data.content,
                registered: course.data.registered,
                completed: course.data.completed,
                duration: course.data?.duration
            })
        })
        .catch(err => history.push('/'))
    }, [])

    const registerForCourse = () =>{
        axios.post(`http://localhost:5000/user/add-course/${userID}/${courseID}`,{})
        .then(setCourseInfo({...courseInfo, registered:'yes'}))
        .catch(err => console.log(err))
    }

    const markAsCompleted = () =>{
        axios.post(`http://localhost:5000/user/completed/${userID}/${courseID}`,{})
        .then(()=>{
            setCourseInfo({...courseInfo, registered:'no'})
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
        <UserNav />
        <div className='container'>
            <div className='course-content-container'>
                
            {courseInfo.completed === 'yes' ? <h2 className='button-container'>Completed in {courseInfo.duration}</h2> : (<>{courseInfo.registered==='no' ? <button 
                type="button" 
                class="btn btn-indigo button-container"
                onClick={()=> registerForCourse()}
                >
                    Register for course
                    </button> 
                    : 
                    <button 
                    type="button" 
                    class="btn btn-blue-grey button-container"
                    onClick={()=> markAsCompleted()}
                    >
                        Mark as completed
                        </button>}</>)}

                    <h1 className='course-content-title'>{courseInfo.coursename}</h1>
                    <span className='course-content-department'>{courseInfo.department}</span>
                        <div className='content-skills-header-container'>
                            <h3>What you'll learn</h3>
                            <div className='content-skills-container'>
                                {courseInfo.skills.map((skill, index) => {
                                        return <div key={index} className='content-skills-icon-container'>
                                                <CheckIcon />
                                                <span>{skill}</span>
                                                {/* <hr/> */}
                                            </div>
                                        })}
                            </div>
                        </div>
                            <div className='content-course-header-container'>
                                <h3>Course Content</h3>
                                <div className='content-container'>
                                {courseInfo.content.map((link, index) => {
                                    return <div key={index}>
                                        {/* <h3 className='resource-text'> Resource: {link.resource} </h3> */}
                                        <LinkIcon />
                                        <h5><a href={link.link} target="_blank">{link.resource}</a></h5>
                                    </div>
                                })}
                            </div>
                            </div>
                </div>
            
            <p>Give us feedback:</p>
            <div class="md-form feedback-container">
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
            <div className='comment-section'>
                {courseInfo.feedback.map((feedback, index) =>{
                    return <CommentCard key={index} user={feedback.user} comment={feedback.comment} rating={feedback.rating} />
                })}
            </div>
        </div>
        </>
    )
}

export default CourseContent
