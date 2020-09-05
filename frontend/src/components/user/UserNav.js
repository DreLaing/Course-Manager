import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import '../../ui/Navbar.css'

const UserNav = () => {
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
            <div class='nav-links'>
                <Link className='nav-logo-container' to={`/user/${userID}`}>
                    <img className='nav-adtelligent-logo' src={require('../../images/adtelligent-logo.png')}/>
                    <strong>Adtelligent</strong>
                </Link>
            
                <div class="navbar-nav mr-auto nav-links">                    
                    <Link className='nav-item' to={`/user/${userID}`}>My courses</Link>
                    <Link className='nav-item' to={`/user/all-courses/${userID}`}>All courses</Link>                   
                </div>
            </div>
            
                <form class="form-inline my-1">
                <div class="md-form form-sm my-0">
                <input class="form-control form-control-sm mr-sm-2 mb-0" type="text" placeholder="Search"
                    aria-label="Search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                </div>
                <button class="btn btn-outline-white btn-sm my-0" type="submit" onClick={handleClick}>Search</button>
            </form>
        </nav>
    </div>
    )
}

export default UserNav
