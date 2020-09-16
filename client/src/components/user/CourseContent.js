import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import '../../ui/CourseContent.css'
import CommentCard from '../CommentCard'
import UserNav from './UserNav'
import CheckIcon from '@material-ui/icons/Check';
import LinkIcon from '@material-ui/icons/Link';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SearchBar from '../SearchBar'
import MarkAsCompleted from './MarkAsCompleted'

const CourseContent = () => {
    const modal = useRef(null)
    const userType = JSON.parse(localStorage.getItem("userType"))
    const email = JSON.parse(localStorage.getItem("email"))
    const token = localStorage.getItem("token")
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const courseID = JSON.parse(localStorage.getItem("course"))
    const [disabled, setDisabled] = useState(true)
    const [feedback, setFeedback] = useState({
        comment: '',
        rating: ''
    })

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const enable = () =>{
        if(feedback.comment.length >= 2){
            setDisabled(false)
            console.log(feedback.comment.length)
        }
        else if(feedback.comment.length < 2){
            setDisabled(true)
            console.log(feedback.comment.length)
        }
    }

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
            axios.post(`https://adtelligent-course-manager.herokuapp.com/user/feedback/${userID}/${courseID}`,{
            user: email,
            comment: feedback.comment,
            rating: feedback.rating
        })
        .then(res => setCourseInfo({...courseInfo, feedback: res.data.feedback}))
        .catch(err => console.log(err))
        }
    }

    useEffect(()=>{
        axios.get(`https://adtelligent-course-manager.herokuapp.com/user/get-course/${userID}/${courseID}`)
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
        axios.post(`https://adtelligent-course-manager.herokuapp.com/user/add-course/${userID}/${courseID}`,{})
        .then(setCourseInfo({...courseInfo, registered:'yes'}))
        .catch(err => console.log(err))
    }

    
    
    return (
        <>
            <UserNav />
            <SearchBar userType={userType}/>
            <div className='container'>
                <div className='course-content-container'>
                    
                    {courseInfo.completed === 'yes' 
                    ? 
                        <div className='button-container'>
                            <div style={{display:'flex', justifyContent:'space-between', fontSize:'20px', fontWeight:'bold'}}>
                                <p>Completed</p>
                                <CheckCircleIcon style={{color: 'green', fontSize:'30px'}}/>
                            </div> 
                            <div>
                                <p style={{fontWeight:'bold'}}>Duration: {courseInfo.duration}</p>
                            </div>
                        </div> 
                    
                    : 
                        (<>{courseInfo.registered==='no' 
                            ? 
                                <button 
                                    type="button" 
                                    class="btn btn-indigo button-container"
                                    onClick={()=> registerForCourse()}>
                                    Register for course
                                </button> 
                                : 
                                    <button 
                                        type="button" 
                                        class="btn btn-blue-grey button-container"
                                        onClick={()=> modal.current.classList.add('active')}
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
                                        </div>
                                    })}
                        </div>
                    </div>
                    <div className='content-course-header-container'>
                        <h3>Course Content</h3>
                        <div className='content-container'>
                            {courseInfo.content.map((link, index) => {
                                return <div key={index}>
                                    <LinkIcon />
                                    <h5><a href={link.link} target="_blank">{link.resource}</a></h5>
                                </div>
                            })}
                        </div>
                    </div>
                </div>
                
                <p>Give us feedback:</p>
                <div class="md-form feedback-container">
                    <div class="md-form amber-textarea active-amber-textarea" style={{borderBottom:'2px black solid'}}>
                        <i class="fas fa-pencil-alt prefix"></i>
                        <textarea id="form22" class="form-control" style={{border:'none'}} rows="3"
                            value={feedback.comment} onChange={e => {
                                setFeedback({...feedback, comment:e.target.value})
                                enable()
                            }}>
                        </textarea>
                        <label for="form22">Leave a comment ...</label>
                    </div>
                    
                        <select class="mdb-select md-form" style={{borderRadius:'5px'}} onChange={e => setFeedback({...feedback, rating: e.target.value})}>
                            <option value="" disabled selected>Course Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button type="submit" class="btn btn-deep-orange" disabled={disabled} onClick={()=> {
                            console.log(feedback)
                            setFeedback({comment:'', rating:''})
                            submitFeedback()
                        }}>Submit feedback</button>
                </div>
                <hr/>

                <h4 style={{fontWeight:'bold'}}>Student Feedback</h4>
                <div className='comment-section'>
                    {courseInfo.feedback.map((feedback, index) =>{
                        return <CommentCard key={index} user={feedback.user} comment={feedback.comment} rating={feedback.rating} />
                    })}
                </div>
            </div>
            
            <div ref={modal} className='modal-bg'>
                <MarkAsCompleted reference={modal} token={token} userID={userID} courseID={courseID} courseInfo={courseInfo} setCourseInfo={setCourseInfo}/>
            </div>
        </>
    )
}

export default CourseContent
