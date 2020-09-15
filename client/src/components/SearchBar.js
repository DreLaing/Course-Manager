import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SearchBar = (props) => {
    const history = useHistory()
    const [search, setSearch] = useState()

    const handleSearch = () =>{
        history.push(`/${props.userType}/search/${search}`)
        setSearch('') 
    }

    return (
        <form className='container' onSubmit={handleSearch} style={{position:'relative', width: '60%', display:'flex'}}>
            <span class="fa fa-search" aria-hidden="true" style={{position:'absolute', top:'45%', left:'30px', color:'gray'}}></span>
            <input class="form-control" id="inputEmail3" placeholder="Search Courses and Skills..." style={{
                margin: '2rem 0rem 2rem 0rem',
                height: '50px',
                textIndent: '30px',
                borderRadius:'10px'
                }}
                value={search}
                onChange={e => setSearch(e.target.value)}>
            </input>
        </form>
    )
}

export default SearchBar
