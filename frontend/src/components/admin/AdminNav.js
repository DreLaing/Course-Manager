import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import '../../ui/Navbar.css'

const AdminNav = () => {
    const userID = JSON.parse(localStorage.getItem("user"))
    const [search, setSearch] = useState()
    const history = useHistory()

    const handleClick = () =>{
        history.push(`/user/search/${search}`)
        setSearch('')
    }

    return (
        <div>
        <nav class="navbar navbar-dark justify-content-between nav-container">
            {/* <!-- Navbar brand --> */}
                <Link className='nav-logo-container' to={`/admin`}>
                    <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                    <strong>Adtelligent</strong>
                </Link>
                <Link to={'/admin/new-course'}>New Course</Link>
                <Link to={'/admin/departments'}>Departments</Link>
                <Link to={'/admin/new-user'}>New User</Link>
        </nav>
    </div>
    )
}

export default AdminNav
