import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import '../../ui/AdminDashboard.css'
import axios from 'axios'
import Navbar from '../Navbar'
import CourseCard from '../CourseCard'
import AdminNav from './AdminNav'

const AdminDashboard = () => {
    const history = useHistory()
    const [coursesInfo, setCoursesInfo] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/get-courses`)
        .then(courses => {
            setCoursesInfo(courses.data)
            console.log(courses.data)
        })
        .catch(err => console.log(err))
    }, [])
    return (
        <>
        <AdminNav />
        <div className='container'>
            <button type="button" class="btn btn-deep-orange" onClick={()=>history.push('/admin/new-course')}>Create new course <i class="fa fa-plus" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-indigo" onClick={()=>history.push('/admin/new-user')}>Create new User <i class="fa fa-plus" aria-hidden="true"></i></button>
            <div className='all-courses-container'>
                {coursesInfo.map(course => <Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/admin/${course._id}`}>
                        <CourseCard course={course}/> </Link>)}
            </div>
        </div>
        
        </>
    )
}

export default AdminDashboard
