import React, { useRef, useState } from 'react'
import LoginForm from './LoginForm'
import '../ui/Login.css'

const Login = () => {
    const modal = useRef(null)
    const[buttonClicked, setButtonClicked] = useState()

    return (
        <>
            <div className='login-container'>
                <div className='login-text-container'>

                    <div className = 'logo-container'>
                        <img className='adtelligent-logo' src={require('../images/adtelligent-logo.png')}/>
                        <strong>Adtelligent</strong>
                    </div>

                    <h1>Course Manager</h1>
                    <p> is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since 
                        the 1500s, when an unknown printer took a galley of type and
                        led it to make a type specimen book. It has survived not only five 
                        centuries, but also the leap into electronic typesetting, remaining 
                        essentially unchanged. It was popularised in the 1960s with the release 
                        of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                        desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <div className='login-button-container'>
                        <button type="button" class="btn btn-deep-orange" onClick={() =>{ 
                            modal.current.classList.add('active');
                            setButtonClicked('Sign In')
                        }}>Login</button>

                    </div>
                </div>
                <img className='login-study-image' src={require('../images/study-image.png')}/>                    
            </div>

            <div ref={modal} className='modal-bg'>
                <LoginForm clicked={buttonClicked} reference={modal}/>
            </div>

        </>
    )
}

export default Login
