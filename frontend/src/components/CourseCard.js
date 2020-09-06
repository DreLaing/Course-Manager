import React from 'react'
import '../ui/CourseCard.css'
import ImportContactsIcon from '@material-ui/icons/ImportContacts';

const CourseCard = (props) => {
    return (
        <div className='course-card'>
            <div className='course-card-top'>
                <ImportContactsIcon />
            </div>
            <div className='course-card-title'>
                <h6>Course</h6>
                <h4>{props.course.coursename}</h4>
            </div>
            <h5>{props.course.department}</h5> 
        </div>
    )
}

export default CourseCard
