import React from 'react'
import '../ui/CourseCard.css'

const CourseCard = (props) => {
    return (
        <div className='course-card'>
            <h5>{props.course.department}</h5>
            <h1>{props.course.coursename}</h1>
        </div>
    )
}

export default CourseCard
