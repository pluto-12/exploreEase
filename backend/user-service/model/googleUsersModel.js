const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userNumber: {
        type: String,
    },
    isNumberVerfied: {
        type: Boolean,
        default: false
    }
})

const googleUserCollection = new mongoose.model('googleusers', googleUserSchema)
module.exports = googleUserCollection