const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    department: String
})

const Department = mongoose.model('Department', departmentSchema)
module.exports = Department