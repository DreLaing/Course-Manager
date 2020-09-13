const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
// require('dotenv').config()
// const path = require('path');
const checkAuth = require('./middleware/check-auth')
const checkAdminAuth = require('./middleware/check-admin-auth')

if (process.env.NODE_ENV !== 'production'){ 
    require('dotenv').config()
 }

const app = express()
const port = process.env.PORT || 5000;
const uri = process.env.DATABASE_URI;

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// ----PARSE REQUEST BODY INTO JSON----
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(cors())

// ----ROUTES----

const user = require('./routes/user')
app.use('/user', checkAuth, user)
const admin = require('./routes/admin')
app.use('/admin', checkAdminAuth, admin)
const login = require('./routes/login')
app.use('/login', login)

// PRODUCTION
if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
}


// ----DATABASE CONNECTION----
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,})
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log(`CONNECTED TO DATABASE`)
})

// ----START SERVER----
app.listen(port, () =>{
    console.log(`SERVER RUNNING ON PORT ${port}`)
})