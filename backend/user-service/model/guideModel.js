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
    },
    jobs: [{
        date: {
            type: Date,
            required: true
        },
        customerId: {
            type: String
        },
        placesId: {
            type: [String]
        },
        isApproved: {
            type: Boolean,
            default: false
        },
        paymentStatus: {
            type: Boolean,
            default: false
        }
    }],
    review: [{
        rating: {
            type: Number
        },
        reviewDescription: {
            type: String
        }
    }]
})

const guideCollection = new mongoose.model('guidedetails', guideSchema)
module.exports = guideCollection