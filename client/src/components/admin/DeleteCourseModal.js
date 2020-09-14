import React from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'

const DeleteCourseModal = (props) => {
    const history = useHistory()
    const courseID = JSON.parse(localStorage.getItem("course"))

    axios.defaults.headers.common = {'Authorization': `Bearer ${props.token}`}

    const deleteCourse = () =>{
        axios.delete(`/admin/delete-course/${courseID}`)
        .then(course =>{
            console.log(course)
            history.push('/admin')
        })
        .catch(err => console.log(err))
    }
    return (
        <div className='login-form modal'>
            <form className='text-center'>
            <CloseIcon className='close-icon' onClick={() =>{props.reference.current.classList.remove('active');}}/>
                <p style={{marginTop:'2rem'}} class="h4 mb-4">Are you sure you want to delete this course?</p>
                <button type="button" class="btn btn-danger" onClick={()=> deleteCourse()}>Delete course</button>
            </form>
        </div>
    )
}

export default DeleteCourseModal
