import React from 'react'
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close'

const MarkAsCompleted = ({ setCourseInfo, courseID, userID, courseInfo, reference, token }) => {
    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

    const markAsCompleted = () =>{
        axios.post(`/user/completed/${userID}/${courseID}`,{})
        .then(()=>{
            setCourseInfo({...courseInfo, registered:'no'})
            window.location.reload()
        })
        .catch(err => console.log(err))
    }
    return (
        <div class='login-form modal'>
            <form class="text-center" action="#!">
                <CloseIcon className='close-icon' onClick={() =>{reference.current.classList.remove('active');}}/>

                <p class="h4 mb-4">Mark course as completed?</p>

                <button class="btn btn-indigo" type="submit" onClick={()=>markAsCompleted()}>Complete</button>
            </form>
        </div>
    )
}

export default MarkAsCompleted
