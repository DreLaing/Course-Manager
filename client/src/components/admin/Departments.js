import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import AdminNav from './AdminNav'
import AddDepartmentModal from './AddDepartmentModal'
// import '../../ui/LoginForm.css'

const Departments = () => {
    const modal = useRef(null)
    const history = useHistory()
    const token =  localStorage.getItem("token")
    const [departments, setDepartments] = useState([{
        _id: '',
        department: ''
    }])

    useEffect(()=>{
        axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
        axios.get(`https://adtelligent-course-manager.herokuapp.com/admin/get-departments`)
        .then(departments => {
            console.log(departments.data)
            setDepartments(departments.data)
        })
        .catch(err => history.push('/'))
    }, [])

    return (
        <>
            <AdminNav />
            <div className='container'>
                <h1 style={{fontWeight:'500', marginTop:'20px'}}>List of Departments</h1>
                <hr style={{borderTop: '1px solid rgb(233, 111, 41)'}}/>
                <button type="button" class="btn btn-deep-orange"
                    onClick={() =>{ 
                        modal.current.classList.add('active');}}>
                    Create new Department <i class="fa fa-plus" aria-hidden="true"></i>
                </button>
                <div style={{
                    display:'grid',
                    gridTemplateColumns: '50% 50%',
                    marginBottom: '4rem'
                }}>
                    {departments.map((department,index) => <h1 style={{
                        fontWeight:'600', margin:'2rem', 
                        whiteSpace:'nowrap',
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius:'5px',
                        color:' rgb(0, 46, 65)'
                        }} key={index}>{department.department}</h1>)}
                </div>
            </div>
            <div ref={modal} className='modal-bg'>
                <AddDepartmentModal reference={modal} token={token}/>
            </div>
        </>
    )
}

export default Departments
