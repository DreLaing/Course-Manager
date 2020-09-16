import React from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import '../../ui/Navbar.css'

const UserNav = () => {
    const location = useLocation()
    const email = JSON.parse(localStorage.getItem("email"))
    const userID = JSON.parse(localStorage.getItem("user"))

    return (
        <>
            <nav class="mb-1 navbar navbar-expand-lg navbar-dark info-color nav-container">
                <Link className='nav-logo-container nav-item' to={`/user/${userID}`}>
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
                            <Link className={location.pathname===`/user/${userID}` ? 'active-link nav-link' : 'nav-link'} to={`/user/${userID}`}>My courses</Link>
                        </li>
                        <li class="nav-item">
                            <Link className={location.pathname===`/user/all-courses/${userID}` ? 'active-link nav-link' : 'nav-link'} to={`/user/${userID}`} to={`/user/all-courses/${userID}`}>All courses</Link>    
                        </li>
                        <li class="nav-item">
                            <Link className={location.pathname===`/user/${userID}/completed-courses` ? 'active-link nav-link' : 'nav-link'} to={`/user/${userID}`} to={`/user/${userID}/completed-courses`}>Completed Courses</Link>   
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

export default UserNav
