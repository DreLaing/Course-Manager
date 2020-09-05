import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import '../../ui/CourseForm.css'
import Navbar from '.././Navbar'

const CourseForm = () => {
    const history = useHistory()
    const [coursename, setCoursename] = useState()
    const [department, setDepartment] = useState()
    const [skills, setSkills] = useState([''])
    const [content, setContent] = useState([
        {resource: '', link: ''}
    ])

    const submitCourse = () =>{
        axios.post(`http://localhost:5000/admin/create-course`, {
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
        .catch(err => console.log(err))
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
            <Navbar />
            <div className='form-container container'>
                <h1>Create Course</h1>

                {/* ----COURSE TITLE---- */}
                <div class="md-form form-lg form-course-title">
                    <input type="text" id="inputLGEx" class="form-control form-control-lg"
                        value={coursename}
                        onChange={e => setCoursename(e.target.value)}
                    />
                    <label for="inputLGEx">Course Title</label>
                </div>

                {/* ----SELECT DEPARTMENT---- */}
                <select class="browser-default custom-select" onChange={e => setDepartment(e.target.value)}>
                    <option selected>Select Department</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Video Production">Video Production</option>
                    <option value="Digital Advertising">Digital Advertising</option>
                </select>


                <div className='resource-skill-container'>

                    {/* ----COURSE RESOURCES---- */}
                    <div className='resource-column'>
                        {content.map((content, index)=>{
                            return <div className='resource-container' key={index}>                   
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
                            return <div className='skills-container'>
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
                <button type="button" class="btn btn-indigo" onClick={()=>submitCourse()}>Submit course information</button>
                
            </div>
            
        </div>
    )
}

export default CourseForm
