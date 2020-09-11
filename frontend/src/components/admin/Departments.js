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
        axios.get(`http://localhost:5000/admin/get-departments`)
        .then(departments => {
            console.log(departments.data)
            setDepartments(departments.data)
        })
        .catch(err => history.push('/'))
    }, [])

    return (
        <>
        <AdminNav />
        <div className='container text-center' style={{
            width: '500px',
            position: 'relative',
            left:'35%',
            top: '50px',
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '7px',
            marginBottom: '6rem'
        }}>
        <button type="button" class="btn btn-indigo"
            onClick={() =>{ 
                modal.current.classList.add('active');}}>
            Create new Department <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
            {departments.map((department,index) => <h1 key={index}>{department.department}</h1>)}
        </div>
        <div ref={modal} className='modal-bg'>
            <AddDepartmentModal reference={modal} token={token}/>
        </div>
        </>
    )
}

export default Departments
