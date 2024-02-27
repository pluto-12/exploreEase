const mongoose = require('mongoose')

const guideSchema = new mongoose.Schema({
    guideEmail: {
        type: String,
        required: true
    },
    guideName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    location: {
        placeName: {
            type: String,
            required: true
        },
        district: {
            type: String,
        },
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    idCard: {
        type: String,
        default: null
    },
    isActive: {
        type: Boolean,
        default: false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    guidePassword: {
        type: String,
        default: ""
    },
    passwordFlag: {
        type: Boolean,
        default: false
    }
})

const guideCollection = new mongoose.model('guidedetails', guideSchema)
module.exports = guideCollection