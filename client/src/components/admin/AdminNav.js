import React from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import '../../ui/Navbar.css'

const AdminNav = () => {
    const email = JSON.parse(localStorage.getItem("email"))
    const location = useLocation()


    return (
        <>
            <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color nav-container">
                <Link className='nav-logo-container nav-item' to={`/admin`}>
                    <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                    <strong>Adtelligent</strong>
                </Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent-4"
                    aria-controls="navbarSupportedContent-4" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent-4">
                    <ul class="navbar-nav ml-auto" style={{}}>
                        <li class="nav-item">
                            <Link className={location.pathname===`/admin` ? 'active-link nav-link' : 'nav-link'} to={'/admin'}>Dashboard</Link>
                        </li>
                        <li class="nav-item">
                            <Link className={location.pathname===`/admin/new-user` ? 'active-link nav-link' : 'nav-link'} to={'/admin/new-user'}>New User</Link>
                        </li>
                        <li class="nav-item">
                            <Link className={location.pathname===`/admin/new-course` ? 'active-link nav-link' : 'nav-link'} to={'/admin/new-course'}>New Course</Link>
                        </li>
                        <li class="nav-item">
                            <Link className={location.pathname===`/admin/departments` ? 'active-link nav-link' : 'nav-link'} to={'/admin/departments'}>Departments</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-4" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i style={{ position:'relative'}} class="fas fa-user"></i> {email} 
                            </a>
                            <div class="dropdown-menu dropdown-menu-right dropdown-info" aria-labelledby="navbarDropdownMenuLink-4">
                                <Link class="dropdown-item" to={'/'} onClick={()=> localStorage.clear()}>Logout</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AdminNav
