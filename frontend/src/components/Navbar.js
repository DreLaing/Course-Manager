import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../ui/Navbar.css'
import axios from 'axios'

const Navbar = (props) => {
    const [search, setSearch] = useState()
    const history = useHistory()

    const handleClick = () =>{
        history.push(`/user/search/${search}`)
        setSearch('')
    }
    return (
        <nav class="navbar navbar-dark justify-content-between nav-container">
            <div className='nav-logo-container'>
                <img className='nav-adtelligent-logo' src={require('../images/adtelligent-logo.png')}/>
                <strong>Adtelligent</strong>
            </div>
            {/* {props.links.map(link => <>{link}</>)} */}
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
    )
}

export default Navbar
