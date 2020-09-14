import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import './ui/AdminCourseContent.css'
import axios from 'axios'
import AdminNav from './AdminNav'
import CommentCard from '../CommentCard'
import DeleteCourseModal from './DeleteCourseModal'
import SearchBar from '../SearchBar'


const AdminCourseContent = () => {
    const modal = useRef(null)
    const userType = JSON.parse(localStorage.getItem("userType"))
    const token = localStorage.getItem("token")
    const history = useHistory()
    const [departments, setDepartments] = useState([{
        _id: '',
        department: ''
    }])
    const [editMode, setEditMode] = useState(false)
    const courseID = JSON.parse(localStorage.getItem("course"))
    const [courseInfo, setCourseInfo] = useState({
        coursename: '',
        department: '',
        departmentID: '',
        content: [''],
        feedback: [],
        skills: ['']
    })

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    
    useEffect(()=>{
        axios.get(`/admin/get-course/${courseID}`)
        .then(course => {
            setCourseInfo({
                coursename: course.data.coursename,
                department: course.data?.department.department,
                feedback: course.data.feedback,
                skills: course.data.skills,
                content: course.data.content
            })
        })
        .catch(err => {
            // history.push('/')
            console.log(err)
        })

        axios.get(`/admin/get-departments`)
        .then(departments => {
            console.log(departments.data)
            setDepartments(departments.data)
            setCourseInfo({...courseInfo, departmentID: departments.data[0]._id})
        })
        .catch(err => history.push('/'))
    }, [])

    const handleResourceChange = (e, index) =>{
        const values = {...courseInfo}
        values.content[index][e.target.name] = e.target.value
        setCourseInfo(values)
    }

    const addResourceFields = () =>{
        const values = {...courseInfo}
        values.content.push({resource: '', link:''})
        setCourseInfo(values)
        console.log(courseInfo)
    }

    const removeResourceField = (index) =>{
        if(index>0){
            const values = [...courseInfo.content]
            values.splice(index, 1)
            setCourseInfo({...courseInfo, content: values})
        }
    } 
    
    const handleSkillChange = (e, index) =>{
        const values = [...courseInfo.skills]
        values[index] = e.target.value
        setCourseInfo({...courseInfo, skills: values})
    }

    const addSkillFields = () =>{
        const values = {...courseInfo}
        values.skills.push('')
        setCourseInfo(values)
    }

    const removeSkillField = (index) =>{
        if(index>0){
            const values = [...courseInfo.skills]
            values.splice(index, 1)
            setCourseInfo({...courseInfo, skills: values})
        }
    }

    const makeUpdate = () =>{
        axios.post(`/admin/edit-course/${courseID}`,{
            coursename: courseInfo.coursename,
            skills: courseInfo.skills,
            content: courseInfo.content
        })
        .then(course => {
            console.log(courseInfo.departmentID)
        })
        .catch(err => console.log(err))
        setEditMode(false)
        console.log(courseInfo.department)
        window.location.reload()
    }


    const renderEditMode = () =>{
      return <form className='edit-mode' onSubmit={()=>makeUpdate()}>
       
        <div class="md-form form-lg form-course-title">
        Coursename:<input className='edit-mode-coursename' type='text' 
                        defaultValue={courseInfo.coursename} 
                        onChange={e => setCourseInfo({...courseInfo, coursename:e.target.value})}
                    />
                </div>
        {/* ----SELECT DEPARTMENT---- */}
        {/* <select defaultValue={departments[0]._id} class="custom-select" onChange={e => setCourseInfo({...courseInfo, department:e.target.value, departmentID: e.target.value})} required='required'>
            <option value={departments[0]._id}>{departments[0].department}</option>
           {departments.map((department,index) =>{
                return index > 0 && <option value={department._id}>{department.department}</option>
            })}
        </select> */}

        <div className='resource-skill-container'>

                    {/* ----COURSE RESOURCES---- */}
                    <div className='resource-column edit-mode-resource-column'>
                        Resources:
                        {courseInfo.content.map((content, index)=>{
                            return <div className='resource-container' key={index}>                   
                                <div>
                                    <div class="md-form input-container">
                                        
                                        Resource name: <input type="text" id="inputMDEx" class="form-control" placeholder='Resource name' name='resource' value={content.resource} onChange={e => handleResourceChange(e, index)}/>
                                        {/* <label for="inputMDEx">Name of resource</label> */}
                                    </div>
                                    <div class="md-form form-sm input-container">
                                        <i class="fa fa-link" aria-hidden="true"></i>
                                        <input type="text" id="inputSMEx" class="form-control form-control-sm" placeholder='Link to resource' name='link' value={content.link} onChange={e => handleResourceChange(e, index)}/>
                                        {/* <label for="inputSMEx">Link to resource</label> */}
                                    </div>
                                </div>
                                <div>
                                    <i class="fa fa-plus form-plus-icon" aria-hidden="true" onClick={()=> addResourceFields()}></i>
                                    <i class="fa fa-minus form-minus-icon" aria-hidden="true" onClick={()=> removeResourceField(index)} ></i>
                                </div>
                            </div>
                        })}
                    </div>
                    

                    {/* COURSE SKILLS */}
                    <div className='skill-column edit-mode-skill-column'>
                        <h5>Skills <i class="fa fa-cogs" aria-hidden="true"></i></h5>
                        {courseInfo.skills.map((skill, index)=>{
                            return <div key={index} className='skills-container'>
                                <div>

                                    <div class="md-form input-container">
                                        <input type="text" id="inputMDEx" class="form-control" placeholder='Skill' name='skill' value={skill} onChange={e => handleSkillChange(e, index)}/>
                                    </div>
                                </div>
                                <div>
                                    <i class="fa fa-plus form-plus-icon" aria-hidden="true" onClick={()=> addSkillFields()}></i>
                                    <i class="fa fa-minus form-minus-icon" aria-hidden="true" onClick={()=> removeSkillField(index)} ></i>
                                </div>
                            </div> 
                        })}
                    </div>
                </div>
                <button type="submit" class="btn btn-indigo">Update Course</button>
                <button type="button" class="btn btn-outline-danger waves-effect" onClick={()=> {
                    setEditMode(false)
                    window.location.reload()
                }}>Cancel</button>
      </form>
    }

    return (
        <div>
            <AdminNav />
            <SearchBar userType={userType}/>
            <div className='container course-content-container'>
            {editMode===true ? renderEditMode()
             : <div>
                    <div className='button-container'>
                        <button type="button" class="btn btn-light" style={{border:'black 1px solid'}} onClick={()=> setEditMode(true)}>Edit Course</button>
                        <button type="button" class="btn btn-danger" onClick={()=>modal.current.classList.add('active')}>Delete Course</button>
                    </div>
                    <h1 className='course-content-title'>{courseInfo.coursename}</h1>
                    <span className='course-content-department'>{courseInfo?.department}</span>
                        <div className='content-resource-skill-container'>
                            <div>
                                {courseInfo.content.map((link, index) => {
                                    return <div key={index}>
                                        <h3 className='resource-text'> Resource: {link.resource} </h3>
                                        <h5><a href={link.link} target="_blank">Link to resource</a></h5>
                                        <hr/>
                                    </div>
                                })}
                            </div>
                            <div>
                                <h4 className='skills-text'>Skills <i class="fa fa-cogs" aria-hidden="true"></i></h4>
                                <hr/>
                                {courseInfo.skills.map((skill,index) => {
                                return <div key={index}>
                                        <h4>{skill}</h4>
                                        <hr/>
                                    </div>
                                })}
                            </div>
                        </div>
                </div>}
                
                <hr/>
                <h4 style={{fontWeight:'bold'}}>Student Feedback</h4>
                <div className='comment-section'>
                {courseInfo.feedback.map((feedback, index) =>{
                    return <CommentCard key={index} user={feedback.user} comment={feedback.comment} rating={feedback.rating} />
                })}
            </div>
        </div>
        
            <div className='modal-bg'ref={modal}>
                <DeleteCourseModal  reference={modal} token={token}/> 
            </div>   
    </div>
    )
}

export default AdminCourseContent
