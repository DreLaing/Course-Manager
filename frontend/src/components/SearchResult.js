import React, { useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import CourseCard from './CourseCard'
import Navbar from './Navbar'
import Usernav from './user/UserNav'
import UserNav from './user/UserNav'

const SearchResult = () => {
    const userID = JSON.parse(localStorage.getItem("user"))
    const { searchValue } = useParams()
    const [searchResults, setSearchResults] = useState([{coursename: 'No results found'}])

    useEffect(()=>{
        axios.get(`http://localhost:5000/user/find/${searchValue}`)
        .then(res => {
            if(res.data.length!==0){
                setSearchResults(res.data)
            }
        })
        .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <UserNav />
            {searchResults.map(course => <Link onClick={()=> localStorage.setItem('course', JSON.stringify(course._id))} to={`/user/${userID}/${course._id}`}>
                    <CourseCard course={course}/>
                </Link>)}
        </div>
    )
}

export default SearchResult
