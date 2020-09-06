import React from 'react'
import '../ui/CommentCard.css'

const CommentCard = (props) => {
    return (
        <div className='comment-card'>
            <span>By User: {props.user}</span>
            <h5>{props.comment}</h5>
            <h6>Rating: {props.rating}/5</h6>
        </div>
    )
}

export default CommentCard
