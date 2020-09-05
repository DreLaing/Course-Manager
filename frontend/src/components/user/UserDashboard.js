import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import '../../ui/UserDashboard.css'
import CourseCard from '../CourseCard'
import Navbar from '../Navbar'
import UserNav from './UserNav'

const UserDashboard = () => {
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({
        email: '',
        courses: []
    })
    useEffect(()=>{
        axios.get(`http://localhost:5000/user/${JSON.parse(localStorage.getItem("user"))}`)
        .then(res => {
            console.log(res.data[0])
            setUserInfo({
                email: res.data[0].email,
                courses: res.data[0].courses
            })
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        <UserNav />
        <div className='user-dashboard-container container'>
            {userInfo.email}
            <div className='user-dashboard-content'>
                {userInfo.courses.map(course =><Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${id}/${course._id}`}>
                    <CourseCard course={course}/>
                </Link>)}
            </div>
        </div>
        </>
    )
}

export default UserDashboard
