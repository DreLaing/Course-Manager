import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams, useHistory } from 'react-router-dom'
import './ui/UserDashboard.css'
import CourseCard from '../CourseCard'
import UserNav from './UserNav'
import SearchBar from '../SearchBar'

const UserDashboard = () => {
    const userType = JSON.parse(localStorage.getItem("userType"))
    const history = useHistory()
    const token = localStorage.getItem("token")
    const { id } = useParams()
    const [userInfo, setUserInfo] = useState({
        email: '',
        courses: []
    })
    // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    useEffect(()=>{
        // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`/user/${JSON.parse(localStorage.getItem("user"))}`, {
            authorization: token
        })
        .then(res => {
            console.log(res.data)
            setUserInfo({
                email: res.data[0].email,
                courses: res.data[0].courses
            })
        })
        .catch(err => history.push('/'))
    }, [])

    return (
        <>
            <UserNav />
            <SearchBar userType={userType}/>
            <div className='dashboard-content container'>
                {userInfo.courses.map((course, index) =><Link key={index} onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${id}/${course._id}`}>
                    <CourseCard course={course}/>
                </Link>)}
            </div>
        </>
    )
}

export default UserDashboard
