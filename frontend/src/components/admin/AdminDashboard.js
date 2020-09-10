import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import './ui/AdminDashboard.css'
import axios from 'axios'
import Navbar from '../Navbar'
import CourseCard from '../CourseCard'
import AdminNav from './AdminNav'

const AdminDashboard = () => {
    const history = useHistory()
    const [coursesInfo, setCoursesInfo] = useState([{
        coursename: '',
        department: ''
    }])
    const token = localStorage.getItem("token")


    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`http://localhost:5000/admin/get-courses`)
        .then(courses => {
            console.log(courses.data)
            setCoursesInfo(courses.data)

        })
        .catch(err => history.push('/'))
    }, [])
    return (
        <>
        <AdminNav />
            <div className='dashboard-content container'>
                {coursesInfo.map((course, index) => <Link key={index} onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/admin/${course._id}`}>
                        <CourseCard course={course}/> </Link>)}
            </div>
        
        </>
    )
}

export default AdminDashboard
