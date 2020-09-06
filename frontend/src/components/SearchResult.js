import React, { useEffect, useState} from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import CourseCard from './CourseCard'
import Navbar from './Navbar'
import Usernav from './user/UserNav'
import UserNav from './user/UserNav'

const SearchResult = () => {
    const token = localStorage.getItem("token")
    const history = useHistory
    const userID = JSON.parse(localStorage.getItem("user"))
    const { searchValue } = useParams()
    const [searchResults, setSearchResults] = useState([{coursename: 'No results found'}])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`http://localhost:5000/user/find/${searchValue}`)
        .then(res => {
            if(res.data.length!==0){
                setSearchResults(res.data)
            }
        })
        .catch(err => history.push('/unauthorized'))
    }, [])

    return (
        <div>
            <UserNav />
            <div className='dashboard-content container'>
                {searchResults.map(course => <Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                        <CourseCard course={course}/>
                    </Link>)}
            </div>
        </div>
    )
}

export default SearchResult
