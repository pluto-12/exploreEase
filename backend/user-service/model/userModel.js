const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userNumber: {
        type: String,
        required: true
    },
    isNumberVerified: {
        type: Boolean,
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    itenaries: [
        {
            name: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true
            },
            places: [{
                placeId: {
                    type: String
                }
            }],
            guide: {
                guideId: {
                    type: String
                },
                guideApproved: {
                    type: Boolean,
                    default: false
                },
                paymentCompleted: {
                    type: Boolean,
                    default: false
                }
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
})

const userCollection = new mongoose.model('userDetails', userSchema)
module.exports = userCollection