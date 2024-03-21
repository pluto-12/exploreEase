const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    placeName: {
        type: String, 
        required: true
    }, 
    placeDescription: {
        type: String, 
        required: true
    },
    district: {
        type: String,
        required: true
    },
    location: {
        lattitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },
    placeImage: [{
        type: String,
        required: true
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    reviews: [{
        userId: {
            type: String
        },
        review: {
            type: String
        },
        rating: {
            type: Number
        }
    }]
})

const placeCollection = new mongoose.model('placedetails', placeSchema)
module.exports = placeCollection