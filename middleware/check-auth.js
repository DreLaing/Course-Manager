const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
    try{
        const token = req.body.authorization
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userData = decoded
    }
    catch(error){
        res.status(401).json('Auth failed')
        console.log(req.body)
    }
    next()
}