import React from 'react'
import '../../ui/CommentCard.css'

const CommentCard = (props) => {
    return (
        <div className='comment-card'>
            <h5>By User: {props.user}</h5>
            <p>{props.comment}</p>
            <p>Rating: {props.rating}/5</p>
        </div>
    )
}

export default CommentCard
