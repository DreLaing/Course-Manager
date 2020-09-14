import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import UserNav from './UserNav'
import CourseCard from '../CourseCard'
import SearchBar from '../SearchBar'

const CompletedCourses = () => {
    const userType = JSON.parse(localStorage.getItem("userType"))
    const token = localStorage.getItem("token")
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const[courses, setCourses] = useState([{
        coursename: '',
        department: ''
    }])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`/user/completed/${userID}`)
        .then(courses =>{
            setCourses(courses.data)
            console.log(courses.data)
        })
        .catch(err => history.push('/'))
    },[])
    return (
        <>
        <UserNav />
        <SearchBar userType={userType}/>
        <div className='dashboard-content container'>
        {courses.map(course =><Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                    <CourseCard course={course}/>
                </Link>)}
        </div>
        </>
    )
}

export default CompletedCourses
