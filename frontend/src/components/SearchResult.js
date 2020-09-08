import React, { useEffect, useState} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import CourseCard from './CourseCard'
import Navbar from './Navbar'
import UserNav from './user/UserNav'

const SearchResult = () => {
    const token = localStorage.getItem("token")
    const history = useHistory()
    const userID = JSON.parse(localStorage.getItem("user"))
    const { searchValue } = useParams()
    const [searchResults, setSearchResults] = useState([])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`http://localhost:5000/user/find/${searchValue}`)
        .then(res => {
            setSearchResults(res.data)
            console.log(res.data)
        })
        .catch(err => history.push('/'))
    }, [])

    return (
        <div>
            <UserNav />
            <div className='dashboard-content container'>
                {searchResults.length===0 ? <h3>No Results Found </h3> : searchResults.map(course => <Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                        <CourseCard course={course}/>
                    </Link>)}
            </div>
        </div>
    )
}

export default SearchResult
