import React from 'react'
import '../ui/CommentCard.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const CommentCard = (props) => {

    let stars = []
    const renderStars = () =>{
        for(let i = 0; i<props.rating; i++){
            stars.push(<i style={{color:'#ff9f19'}} class="fa fa-star" aria-hidden="true"></i>)
        }
    }
    
    renderStars()

    return (
        <div className='comment-card'>
            <AccountCircleIcon style={{fontSize: '30px'}}/>
            <div style={{position: 'relative', left:'5%', marginTop:'-30px'}}>
                <span style={{fontWeight:'500'}}>{props.user}</span>
                <div className='comment-rating-container'>
                    {stars.map((star, index)=>{
                        return <h6 key={index}>{star}</h6>
                    })}
                </div>
                <h5 style={{width: '80%', fontWeight:'400'}}>{props.comment}</h5>
            </div>
        </div>
    )
}

export default CommentCard
