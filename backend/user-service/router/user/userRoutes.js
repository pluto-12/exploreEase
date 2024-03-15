const express = require('express')
const userRouter =  express()
const userController = require('../../controller/user/userController')

userRouter.post('/adduser', userController.addUser)
userRouter.get('/verifymail', userController.verifyEmail)
userRouter.post('/googlesignin', userController.googleSignin)
userRouter.post('/verifylogin', userController.verifylogin)
userRouter.get('/getallusers', userController.getAllUsers)
userRouter.post('/saveitenary', userController.saveitenary)
userRouter.get('/getitenary', userController.getItenaryByUserId)
userRouter.post('/addguidetoitenary', userController.addGuideToItenary)
userRouter.post('/payment', userController.razorpayPayment)

module.exports = userRouter