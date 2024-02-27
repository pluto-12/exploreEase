const express = require('express')
const userRouter =  express()
const userController = require('../../controller/user/userController')

userRouter.post('/adduser', userController.addUser)
userRouter.get('/verifymail', userController.verifyEmail)
userRouter.post('/googlesignin', userController.googleSignin)
userRouter.post('/verifylogin', userController.verifylogin)
userRouter.get('/getallusers', userController.getAllUsers)

module.exports = userRouter