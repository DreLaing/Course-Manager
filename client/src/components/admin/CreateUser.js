import React, { useState } from 'react'
import axios from 'axios'
import AdminNav from './AdminNav'

const CreateUser = () => {
    const token = localStorage.getItem("token")
    const [disabled, setDisabled] = useState(true)
    const [newUser, setNewUser] = useState({
        email: '',
        password:'',
        userType: '',
    })

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    const submitUser = () =>{
        axios.post(`/admin/new-user`,{
            email: newUser.email,
            password: newUser.password,
            userType: newUser.userType
        })
    }

    const emailRegex = /\S+@\S+\.\S+/

    const enable = () =>{
        if(emailRegex.test(newUser.email)===false || newUser.password.length < 5){
            setDisabled(true)
            console.log(emailRegex.test(newUser.email))
            console.log(newUser.password.length)
        }
        else{
            setDisabled(false)
            console.log(emailRegex.test(newUser.email))
            console.log(newUser.password.length)
        }
    }

    return (
        <>
            <AdminNav />
            <form class="text-center container" action="#!" style={
                {
                    width: '500px',
                    backgroundColor:'white', 
                    position: 'relative', 
                    left: '35%',
                    top:'30px',
                    padding: '30px',
                    borderRadius: '7px',
                    marginBottom:'5rem'
                }}>

                <p class="h4 mb-4">New User</p>

                <p>As Admin, only you have the ability to create a new user. That user may be an employee or a new admin</p>

                {/* <!-- Email --> */}
                <input type="email" id="defaultSubscriptionFormEmail" class="form-control mb-4" placeholder="E-mail" 
                    value={newUser.email}
                    onChange={e => {
                        setNewUser({...newUser, email: e.target.value})
                        enable()
                    }}
                />

                {/* Password */}
                <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password must be atleast 6 characters"
                    value={newUser.password}
                    onChange={e => {
                        setNewUser({...newUser, password: e.target.value})
                        enable()
                    }}
                />

                <select placeholder='Select User Type' class="browser-default custom-select"
                    onChange={e => setNewUser({...newUser, userType: e.target.value})}
                    style={{marginBottom: '3rem'}}>
                        <option value='Employee'>Employee</option>
                        <option value="Admin">Admin</option>
                </select>

                {/* <!-- Create user button --> */}
                <button class="btn btn-indigo" disabled={disabled} type="submit" style={{marginLeft:'5px'}} onClick={()=>submitUser()}>Create User</button>


            </form>
        </>
    )
}

export default CreateUser
