const mongoose = require('mongoose')

const cordinatorSchema = new mongoose.Schema({
    cordinatorEmail: {
        type: String,
        required: true
    },
    cordinatorName: {
        type: String,
        required: true
    },
    cordinatorPassword: {
        type: String,
        required: true
    },
    cordinatorNumber: {
        type: String,
        required: true
    },
    location: {
        type: String
    }
})

const cordinatorCollection = new mongoose.model('cordinatordetails', cordinatorSchema)
module.exports = cordinatorCollection