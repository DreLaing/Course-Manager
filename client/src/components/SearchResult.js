import React, { useEffect, useState} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import CourseCard from './CourseCard'
import UserNav from './user/UserNav'
import AdminNav from './admin/AdminNav'
import SearchBar from './SearchBar'

const SearchResult = () => {
    const userType= JSON.parse(localStorage.getItem("userType"))
    const token = localStorage.getItem("token")
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const { searchValue } = useParams()
    const [searchResults, setSearchResults] = useState([])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`/${userType}/find/${searchValue}`)
        .then(res => {
            setSearchResults(res.data)
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <>
        {userType === 'user' ? <div>
            <UserNav />
            <SearchBar userType={userType}/>
            <h4 style={{position: 'relative', left: '5%'}} className='container'>Results for <span style={{fontWeight:'bold'}}>"{searchValue}"</span></h4>
            <div className='dashboard-content container'>
                {searchResults.length===0 ? <h3>No Results Found </h3> : searchResults.map((course, index) => {
                    return <Link key={index} onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                    <CourseCard course={course}/>
                </Link>
                })}
            </div>
        </div>
        :
        <div>
            <AdminNav />
            <SearchBar userType={userType}/>
            <div className='dashboard-content container'>
                {searchResults.length===0 ? <h3>No Results Found </h3> : searchResults.map((course, index) => <Link key={index} onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/admin/${course._id}`}>
                        <CourseCard course={course}/> </Link>)}
            </div>
        </div>}
        </>
    )
}

export default SearchResult
