import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './ui/CourseForm.css'
import AdminNav from './AdminNav'

const CourseForm = () => {
    const history = useHistory()
    const token = localStorage.getItem("token")
    const [disabled, setDisabled] = useState(true)
    const [coursename, setCoursename] = useState('')
    const [department, setDepartment] = useState('')
    const [departments, setDepartments] = useState([{
        _id: '',
        department: ''
    }])
    const [skills, setSkills] = useState([''])
    const [content, setContent] = useState([
        {resource: '', link: ''}
    ])

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    useEffect(()=>{
        axios.get(`https://adtelligent-course-manager.herokuapp.com/admin/get-departments`)
        .then(departments => {
            console.log(departments.data)
            setDepartments(departments.data)
            setDepartment(departments.data[0]._id)
        })
        .catch(err => history.push('/'))
    }, [])

    const submitCourse = () =>{
        axios.post(`https://adtelligent-course-manager.herokuapp.com/admin/create-course`, {
            coursename,
            department,
            skills,
            content
        })
        .then(course => {
            setSkills([''])
            setDepartment('')
            setContent([{resource: '', link: ''}])
            setCoursename('')
            history.push('/admin')
        })
        .catch(err => history.push('/'))
    }

    const enable = () =>{
        if(coursename.length > 2){
            if(department.length > 2){
                setDisabled(false)
            }
        }
        else{
            setDisabled(true)
        }
    }

    const handleResourceChange = (e, index) =>{
        const values = [...content]
        values[index][e.target.name] = e.target.value
        setContent(values)
    }

    const addResourceFields = () =>{
        setContent([...content, { resource: '', link: ''}])
    }

    const removeResourceField = (index) =>{
        if(index>0){
            const values = [...content]
            values.splice(index, 1)
            setContent(values)
        }
    } 
    
    const handleSkillChange = (e, index) =>{
        const values = [...skills]
        values[index] = e.target.value
        setSkills(values)
    }

    const addSkillFields = () =>{
        setSkills([...skills, ''])
    }

    const removeSkillField = (index) =>{
        if(index>0){
            const values = [...skills]
            values.splice(index, 1)
            setSkills(values)
        }
    }

    return (
        <div>
            <AdminNav />
            <form className='form-container container'>
                <h1 style={{fontWeight:'500'}}>Create Course</h1>

                {/* ----COURSE TITLE---- */}
                <div class="md-form form-lg form-course-title">
                    <input type="text" id="inputLGEx" class="form-control form-control-lg"
                        value={coursename}
                        onChange={e =>{
                            setCoursename(e.target.value)
                            enable()
                        }}
                    />
                    <label htmlFor="inputLGEx">Course Title</label>
                </div>

                {/* ----SELECT DEPARTMENT---- */}
                <select defaultValue={departments[0]._id} class="browser-default custom-select" onChange={e => {
                    setDepartment(e.target.value)
                    enable()
                }}>
                <option>Select Department</option>
                    {departments.map((department, index) =>{
                        return <option key={index} value={department._id}>{department.department}</option>
                    })}
                </select>


                <div className='resource-skill-container'>

                    {/* ----COURSE RESOURCES---- */}
                    <div className='resource-column'>
                        {content.map((content, index)=>{
                            return <div key={index} className='resource-container' key={index}>                   
                                <div>
                                    <div class="md-form input-container">
                                        
                                        <input type="text" id="inputMDEx" class="form-control" placeholder='Resource name' name='resource' value={content.resource} onChange={e => handleResourceChange(e, index)}/>
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
                    <div className='skill-column'>
                        {skills.map((skill, index)=>{
                            return <div key={index} className='skills-container'>
                                <div>

                                    <div class="md-form input-container">
                                        <i class="fa fa-cogs" aria-hidden="true"></i>
                                        <input type="text" id="inputMDEx" class="form-control" placeholder='Skill' name='skill' value={skill} onChange={e => handleSkillChange(e, index)}/>
                                        {/* <label for="inputMDEx">Name of resource</label> */}
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
                <button type="button" disabled={disabled} class="btn btn-indigo" onClick={()=>submitCourse()}>Submit course information</button>
                
            </form>
            
        </div>
    )
}

export default CourseForm
