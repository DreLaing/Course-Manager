import React, { useState } from 'react'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'

const AddDepartmentModal = (props) => {
    const [disabled, setDisabled] = useState(true)
    const [department, setDepartment] = useState('')
    
    axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}
    const addDepartment = () =>{
        axios.post(`http://localhost:5000/admin/new-department`, {
            department
        })
        .then(()=>{
            props.reference.current.classList.remove('active')
            window.location.reload()
        })
        .catch(err => console.log(err))
    }

    const enable = () =>{
        if(department.length < 2){
            setDisabled(true)
        }
        else{
            setDisabled(false)
        }
    }

    return (
        <div class='login-form modal'>
            <form class="text-center" action="#!">
                <CloseIcon className='close-icon' onClick={() =>{props.reference.current.classList.remove('active');}}/>

                <p class="h4 mb-4">New Department</p>

                 <div class="md-form">
                    <input type="email" id="inputValidationEx1" class="form-control"
                        value={department} 
                        onChange={e => {
                            setDepartment(e.target.value)
                            enable()
                        }}                     
                    />
                    <label htmlFor="inputValidationEx1" data-error="wrong" data-success="right">Department Name</label>
                </div>  

                <button class="btn btn-indigo" disabled={disabled} type="submit" onClick={()=>addDepartment()}>Add Department</button>
            </form>
  </div>
    )
}

export default AddDepartmentModal
