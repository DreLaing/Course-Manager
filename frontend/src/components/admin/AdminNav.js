import React, { useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import '../../ui/Navbar.css'

const AdminNav = () => {
    const email = JSON.parse(localStorage.getItem("email"))
    const location = useLocation()
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
                <div className='admin-nav-links'>
                    <Link className='nav-logo-container nav-item' to={`/admin`}>
                        <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                        <strong>Adtelligent</strong>
                    </Link>
                    <Link className={location.pathname===`/admin` ? 'active-link nav-item' : 'nav-item'} to={'/admin'}>Dashboard</Link>
                    <Link className={location.pathname===`/admin/new-user` ? 'active-link nav-item' : 'nav-item'} to={'/admin/new-user'}>New User</Link>
                    <Link className={location.pathname===`/admin/new-course` ? 'active-link nav-item' : 'nav-item'} to={'/admin/new-course'}>New Course</Link>
                    <Link className={location.pathname===`/admin/departments` ? 'active-link nav-item' : 'nav-item'} to={'/admin/departments'}>Departments</Link>
                </div>
                <div className='user-email-container'>
            <p>{email}</p>
            <li class="nav-item dropdown list-item">
                <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-user"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-default"
                    aria-labelledby="navbarDropdownMenuLink-333">
                        <Link class="dropdown-item" to={'/'} onClick={()=> localStorage.clear()}>Logout</Link>
                    </div>
            </li>
            </div>
        </nav>
    </div>
    )
}

export default AdminNav
