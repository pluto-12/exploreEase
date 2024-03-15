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
            // name: {
            //     type: String,
            //     required: true
            // },
            date: {
                type: Date,
                required: true
            },
            district: {
                type: String
            },
            placesId: {
                type: [String]
            },
            guide: {
                guideId: {
                    type: String
                },
                paymentCompleted: {
                    type: Boolean
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