const jwt = require('jsonwebtoken')

module.exports = checkAdminAuth = (req,res,next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_ADMIN_KEY)
        req.adminData = decoded
    }
    catch(error){
        return res.status(401).json('Auth failed')
    }
    next()
}