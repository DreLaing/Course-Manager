import React, { useState } from 'react'
import { useHistory, Link, useLocation } from 'react-router-dom'
import '../../ui/Navbar.css'

const UserNav = () => {
    const location = useLocation()
    const email = JSON.parse(localStorage.getItem("email"))
    const userID = JSON.parse(localStorage.getItem("user"))
    const [search, setSearch] = useState()
    const history = useHistory()

    return (
        <div>
            <nav class="navbar navbar-dark justify-content-between nav-container">

                <div class='nav-links'>
                    <Link className='nav-logo-container nav-item' to={`/user/${userID}`}>
                        <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                        <strong>Adtelligent</strong>
                    </Link>
                                
                    <Link className={location.pathname===`/user/${userID}` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`}>My courses</Link>
                    <Link className={location.pathname===`/user/all-courses/${userID}` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`} to={`/user/all-courses/${userID}`}>All courses</Link>    
                    <Link className={location.pathname===`/user/${userID}/completed-courses` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`} to={`/user/${userID}/completed-courses`}>Completed Courses</Link>   
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

export default UserNav
