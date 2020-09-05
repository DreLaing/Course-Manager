import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import Usernav from './UserNav'
import CourseCard from '../CourseCard'

const AllCourses = () => {
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const [coursesInfo, setCoursesInfo] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/get-courses`)
        .then(courses => {
            setCoursesInfo(courses.data)
            console.log(courses.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        <Usernav />
        <div className='container'>
            <div className='all-courses-container'>
                {coursesInfo.map(course => <Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                        <CourseCard course={course}/> </Link>)}
            </div>
        </div>
        
        </>
    )
}

export default AllCourses
