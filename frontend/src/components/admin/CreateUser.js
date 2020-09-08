import React, { useState } from 'react'
import axios from 'axios'
import AdminNav from './AdminNav'

const CreateUser = () => {
    const token = localStorage.getItem("token")
    const [newUser, setNewUser] = useState({
        email: '',
        password:'',
        userType: '',
    })

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    const submitUser = () =>{
        axios.post(`http://localhost:5000/admin/new-user`,{
            email: newUser.email,
            password: newUser.password,
            userType: newUser.userType
        })
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
                 top:'50px',
                 padding: '30px',
                 borderRadius: '7px'}}>

                    <p class="h4 mb-4">New User</p>

                    <p>As Admin, only you have the ability to create a new user. That user may be an employee or a new admin</p>

                    {/* <!-- Email --> */}
                    <input type="email" id="defaultSubscriptionFormEmail" class="form-control mb-4" placeholder="E-mail" 
                        value={newUser.email}
                        onChange={e => setNewUser({...newUser, email: e.target.value})}
                    />

                    {/* Password */}
                    <input type="password" id="defaultLoginFormPassword" class="form-control mb-4" placeholder="Password"
                        value={newUser.password}
                        onChange={e => setNewUser({...newUser, password: e.target.value})}
                    />

                    <select placeholder='Select User Type' class="browser-default custom-select"
                        onChange={e => setNewUser({...newUser, userType: e.target.value})}
                        style={{marginBottom: '3rem'}}>
                            <option value='Employee'>Employee</option>
                            <option value="Admin">Admin</option>
                    </select>

                    {/* <!-- Create user button --> */}
                    <button class="btn btn-info btn-block" type="submit" style={{marginLeft:'5px'}} onClick={()=>submitUser()}>Create User</button>


                </form>
        </>
    )
}

export default CreateUser
