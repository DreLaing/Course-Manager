import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios'
import '../ui/LoginForm.css'
import decode from 'jwt-decode'
import CloseIcon from '@material-ui/icons/Close'


const LoginForm = (props) => {
    const history = useHistory()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [invalidEmail, setInvalidEmail] = useState(false)
    const [ invalidPassword, setInvalidPassword ] = useState(false)

    const handleSubmit = (e) =>{
        e.preventDefault()
        const source = axios.CancelToken.source()
        if(props.clicked==='Sign In'){
            axios.post('https://adtelligent-course-manager.herokuapp.com/login/',{
            email,
            password
        }, {cancelToken: source.token} )
        .then(response =>{
            const decoded = decode(response.data)
            console.log(response)
            if(response.status === 200){
                console.log(decoded.userType)
                localStorage.setItem("token", response.data)
                localStorage.setItem("email", JSON.stringify(decoded.email))

                if(decoded.userType==='Employee'){
                    localStorage.setItem("user", JSON.stringify(decoded._id))
                    localStorage.setItem("userType", JSON.stringify("user"))
                    
                    history.push(`/user/${decoded._id}`)
                }
                else if(decoded.userType==='Admin'){
                    history.push(`/admin`)

                    localStorage.setItem("userType", JSON.stringify("admin"))
                }
            }
            // ----NOT WORKING AS IT SHOULD SINCE ADDING JWT----
            // else if(response.status === 203){
            //     console.log('Wrong password')
            //     setInvalidPassword(true)
            // }   
        })
               
        .catch(err => {
            setInvalidEmail(true)
            setInvalidPassword(true)
            console.log(err)
        })
        }

        return () =>{
            source.cancel('Component Unmounted')
        }
    }

    return (
        <div class='login-form modal'>
            <form class="" action="#!">
                <CloseIcon className='close-icon' onClick={() =>{props.reference.current.classList.remove('active');
                                                                    setEmail('');
                                                                    setPassword('')}}/>

                <p class="h4 mb-4 text-center">Sign in</p>

                <div class="md-form">
                    <i className={invalidEmail===true ? 'fas fa-user prefix invalid' : 'fas fa-user prefix'}></i>
                    <input type="email" id="inputValidationEx1" class="form-control"
                        value={email} 
                        onChange={e => setEmail(e.target.value)}
                        onClick={() => setInvalidEmail(false)}                       
                    />
                    <label for="inputValidationEx1" data-error="wrong" data-success="right">Email</label>
                </div>  

                <div class="md-form">
                    <i className={invalidPassword===true ? 'fas fa-lock prefix invalid' : 'fas fa-lock prefix'}></i>
                    <input type="password" id="inputValidationEx2" class="form-control"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                        onClick={() => setInvalidPassword(false)}
                        
                    />
                    <label for="inputValidationEx2" data-error="wrong" data-success="right">Type your password</label>
                </div>

                <button class="btn btn-info btn-block my-4" type="submit" onClick={(e) => handleSubmit(e)} >{props.clicked}</button>
            </form>
        </div>
    )
}

export default LoginForm
