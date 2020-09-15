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
        <>
            {/* <nav class="navbar navbar-dark justify-content-between nav-container">
                <div class='nav-links'>
                    <div>                   
                        <Link className='nav-logo-container nav-item' to={`/user/${userID}`}>
                            <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                            <strong>Adtelligent</strong>
                        </Link>
                    </div>               
                
                <div className='user-menu'>
                    <Link className={location.pathname===`/user/${userID}` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`}>My courses</Link>
                    <Link className={location.pathname===`/user/all-courses/${userID}` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`} to={`/user/all-courses/${userID}`}>All courses</Link>    
                    <Link className={location.pathname===`/user/${userID}/completed-courses` ? 'active-link nav-item' : 'nav-item'} to={`/user/${userID}`} to={`/user/${userID}/completed-courses`}>Completed Courses</Link>   

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
                
                </div>
                <div className='responsive-menu'>
                    <input style={{display:'none'}} type='checkbox' id='check'/>
                    <label htmlFor='check' className='checkbtn'>
                            <i className='fas fa-bars'></i>
                        </label>
                </div>
                
                </div>
            </nav> */}


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
                    <i style={{ position:'relative'}} class="fas fa-user"></i> {email} </a>
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
