import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import Usernav from './UserNav'
import CourseCard from '../CourseCard'
import SearchBar from '../SearchBar'

const AllCourses = () => {
    const userType = JSON.parse(localStorage.getItem("userType"))
    const token = localStorage.getItem("token")
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const [coursesInfo, setCoursesInfo] = useState([])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
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
            <SearchBar userType={userType}/>
            <div className='container dashboard-content'>
                    {coursesInfo.map((course, index) => <Link key={index} onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                            <CourseCard course={course}/> </Link>)}
            </div>
        
        </>
    )
}

export default AllCourses
